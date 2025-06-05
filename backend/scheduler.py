from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai
from datetime import datetime, timedelta

load_dotenv()
app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/api/generate-schedule', methods=['POST'])
def generate_schedule():
    tasks = request.json.get('tasks', [])
    sleep_start = request.json.get('sleepStart')
    sleep_end = request.json.get('sleepEnd')

    if not tasks:
        return jsonify({"error": "No tasks provided"}), 400

    # (Optional) Format input for OpenAI prompt
    prompt = build_prompt(tasks, sleep_start, sleep_end)

    # --- Replace this with OpenAI call if needed ---
    # response = openai.ChatCompletion.create(...)
    # For now simulate schedule output:
    events = []
    start_time = datetime.now().replace(hour=9, minute=0, second=0, microsecond=0)

    for task in tasks:
        duration_hours = float(task.get("duration", 1))
        end_time = start_time + timedelta(hours=duration_hours)

        events.append({
            "title": task["name"],
            "start": start_time.isoformat(),
            "end": end_time.isoformat(),
            "info": f"Auto-scheduled: {task.get('type')} | Priority: {task.get('priority', 'normal')}"
        })

        start_time = end_time  # Next task starts after previous one
    # ------------------------------------------------

    return jsonify({"events": events})


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

    prompt += "\nReturn a JSON array with `title`, `start`, `end`, and a brief explanation for each scheduling decision."
    return prompt


if __name__ == '__main__':
    app.run(port=5000, debug=True)
