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


# Generate schedule from tasks and user info
@app.route('/api/schedule', methods=['POST'])
def generate_schedule():
    print("✅ Starting schedule generation")
    sleep_start = user_data.get('sleepStart')
    sleep_end = user_data.get('sleepEnd')
    print(f"🛌 Sleep window: {sleep_start} to {sleep_end}")

    prompt = build_prompt(task_queue, sleep_start, sleep_end)
    print("🧠 Prompt:\n", prompt)

    now = datetime.now()
    work_start = now.replace(hour=9, minute=0, second=0, microsecond=0)
    work_end = now.replace(hour=21, minute=0, second=0, microsecond=0)

    events = []
    unscheduled_tasks = []

    def overlaps(start, end):
        for e in events:
            existing_start = datetime.fromisoformat(e['start'])
            existing_end = datetime.fromisoformat(e['end'])
            if max(start, existing_start) < min(end, existing_end):
                return True
        return False

    for task in task_queue:
        task_name = task.get("name", "Unnamed")
        print(f"➡️ Attempting to schedule: {task_name}")

        # Validate duration
        try:
            duration_hours = float(task.get("duration", 0))
            if duration_hours <= 0:
                raise ValueError("Duration must be a positive number.")
        except Exception as err:
            unscheduled_tasks.append({
                "name": task_name,
                "reason": f"Invalid duration: {err}"
            })
            continue

        # Validate due date
        try:
            due_date = datetime.fromisoformat(task["dueDate"])
        except Exception as err:
            unscheduled_tasks.append({
                "name": task_name,
                "reason": f"Invalid due date: {err}"
            })
            continue

        scheduled = False
        slot = work_start

        # Try to find a valid time window that doesn't overlap and ends before due date
        while slot + timedelta(hours=duration_hours) <= work_end:
            proposed_end = slot + timedelta(hours=duration_hours)
            if not overlaps(slot, proposed_end) and proposed_end.date() <= due_date.date():
                events.append({
                    "title": task_name,
                    "start": slot.isoformat(),
                    "end": proposed_end.isoformat(),
                    "info": f"Auto-scheduled: {task.get('type')} | Priority: {task.get('priority')} | Due: {task.get('dueDate')}"
                })
                scheduled = True
                break
            slot += timedelta(minutes=30)

        if not scheduled:
            unscheduled_tasks.append({
                "name": task_name,
                "reason": "No available time slot before due date"
            })

    print("✅ Finished scheduling")
    return jsonify({"events": events, "unscheduled": unscheduled_tasks}), 200




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

    prompt += "\nReturn a JSON array with `title`, `start`, `end`, and a brief explanation for each scheduling decision with NO OVERLAPS IN START AND END TIME IN TASKS"
    return prompt

if __name__ == "__main__":
    app.run(debug=True)
