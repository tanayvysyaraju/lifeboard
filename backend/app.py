from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai
from datetime import datetime, timedelta

# Load environment variables
load_dotenv()

# Flask setup
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173", "methods": ["GET", "POST", "OPTIONS"]}})

# OpenAI setup
openai.api_key = os.getenv("OPENAI_API_KEY")

# In-memory store
user_data = {}
task_queue = []

# Store user info
@app.route('/api/userinfo', methods=['POST'])
def handle_user_info():
    data = request.get_json()
    name = data.get('name')
    sleep_start = data.get('sleepStart')
    sleep_end = data.get('sleepEnd')

    if not name or not sleep_start or not sleep_end:
        return jsonify({"error": "Missing required fields"}), 400

    user_data['name'] = name
    user_data['sleepStart'] = sleep_start
    user_data['sleepEnd'] = sleep_end

    return jsonify({"message": "User info received successfully"}), 200

# Get user info
@app.route('/api/userinfo', methods=['GET'])
def get_user_info():
    if 'name' not in user_data:
        return jsonify({"error": "No user info found"}), 404
    return jsonify(user_data), 200

# Receive tasks from frontend
@app.route('/api/tasks', methods=['POST'])
def receive_tasks():
    data = request.get_json()
    print("Received tasks:", data)  # ADD THIS LINE
    task_queue.clear()
    task_queue.extend(data.get('tasks', []))
    return jsonify({"message": "Tasks received"}), 200


# Store scheduled events globally
scheduled_events = []

@app.route('/api/schedule', methods=['POST'])
def generate_schedule():
    print("✅ Starting full schedule regeneration")
    sleep_start = user_data.get('sleepStart')
    sleep_end = user_data.get('sleepEnd')

    now = datetime.now()
    today = now.date()

    all_tasks = scheduled_events + task_queue
    all_tasks.sort(key=lambda t: t.get('priority', 'medium'))  # Optional: sort

    new_schedule = []
    unscheduled_tasks = []

    def overlaps(start, end):
        for e in new_schedule:
            existing_start = datetime.fromisoformat(e['start'])
            existing_end = datetime.fromisoformat(e['end'])
            if max(start, existing_start) < min(end, existing_end):
                return True
        return False

    def in_sleep_hours(start):
        s_time = datetime.combine(start.date(), datetime.strptime(sleep_start, "%H:%M").time())
        e_time = datetime.combine(start.date(), datetime.strptime(sleep_end, "%H:%M").time())
        if sleep_start > sleep_end:
            # overnight sleep window
            return start >= s_time or start < e_time
        return s_time <= start < e_time

    def is_valid_slot(task_type, start):
        weekday = start.weekday()  # 0 = Monday, 6 = Sunday
        hour = start.hour

        if task_type == 'work':
            return 0 <= weekday <= 4 and 9 <= hour < 17
        elif task_type == 'personal':
            if in_sleep_hours(start):
                return False
            if 0 <= weekday <= 4:
                return hour < 9 or hour >= 17
            else:
                return True
        return False

    for task in all_tasks:
        task_name = task.get("name", "Unnamed")

        try:
            duration_hours = float(task.get("duration", 0))
            if duration_hours <= 0:
                raise ValueError("Duration must be positive")
            due_date = datetime.fromisoformat(task["dueDate"])
        except Exception as err:
            unscheduled_tasks.append({"name": task_name, "reason": str(err)})
            continue

        task_type = task.get("type", "work")
        scheduled = False

        # Try every 30 min from today up to due date
        current = datetime.combine(today, datetime.min.time())
        while current.date() <= due_date.date():
            proposed_end = current + timedelta(hours=duration_hours)
            if (
                is_valid_slot(task_type, current) and
                not overlaps(current, proposed_end) and
                proposed_end.date() <= due_date.date()
            ):
                justification = (
                    f"Placed on {current.strftime('%A %b %d, %I:%M %p')} because "
                    f"it fits the allowed time window for a {task_type} task, "
                    f"respects your sleep ({sleep_start}–{sleep_end}) and avoids conflicts."
                )
                new_schedule.append({
                    "title": task_name,
                    "start": current.isoformat(),
                    "end": proposed_end.isoformat(),
                    "info": justification
                })
                scheduled = True
                break

            current += timedelta(minutes=30)

        if not scheduled:
            unscheduled_tasks.append({
                "name": task_name,
                "reason": "No valid time slot available given due date, type, and constraints"
            })

    scheduled_events.clear()
    scheduled_events.extend(all_tasks)

    return jsonify({
        "events": new_schedule,
        "unscheduled": unscheduled_tasks
    }), 200






# Build GPT-style prompt with optional fields
def build_prompt(tasks, sleep_start, sleep_end):
    prompt = "Create a daily schedule for the following tasks with these constraints:\n"
    prompt += f"User sleeps daily from {sleep_start} to {sleep_end}.\n\n"
    prompt += "Tasks:\n"

    for task in tasks:
        prompt += f"- Name: {task['name']}, Duration: {task['duration']}h, Due: {task['dueDate']}, Priority: {task['priority']}, Type: {task['type']}"

        if task['type'] == 'work':
            if task.get('project'):
                prompt += f", Project: {task['project']}"
            if task.get('client'):
                prompt += f", Client: {task['client']}"
            if task.get('isMeeting'):
                prompt += f", Meeting: {task['isMeeting']}"
            if task.get('deepWork'):
                prompt += f", Deep Work: {task['deepWork']}"

        elif task['type'] == 'personal':
            if task.get('activityType'):
                prompt += f", Activity Type: {task['activityType']}"
            if task.get('travel'):
                prompt += f", Requires Travel: {task['travel']}"
            if task.get('energyDemand'):
                prompt += f", Energy Demand: {task['energyDemand']}"

        prompt += "\n"

    prompt += "\nReturn a JSON array with `title`, `start`, `end`, and a brief explanation for each scheduling decision with NO OVERLAPS IN START AND END TIME IN TASKS. Make sure to try to allot the task at a certain type based on the task name and what time of the day the task would usually be completed."
    return prompt

if __name__ == "__main__":
    app.run(debug=True)
