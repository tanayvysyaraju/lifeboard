# PathPlan: AI-Powered Smart Scheduler for Project Managers

PathPlan is a full-stack intelligent scheduling assistant tailored for project managers in the life sciences industry. It automates the process of prioritizing, allocating, and balancing tasks within strict deadlines and real-world constraints such as sleep windows, personal boundaries, and resource conflicts.

Built using **React** (frontend), **Flask** (backend), **OpenAI API** (scheduling intelligence), **SQLAlchemy** (data persistence), and optionally deployed with **Docker**, PathPlan enables managers to increase productivity while remaining compliant with project timelines.


---

## Project Motivation

Project managers, particularly in regulated industries like life sciences, face recurring challenges:

* **Missed deadlines** due to manual scheduling
* **Unbalanced workloads**
* **Inconsistent visibility** into priority or resource constraints

PathPlan addresses these by:

* Automating the **task-time-fit analysis**
* Ensuring **compliance with work hours**
* Offering **transparent reasoning** for all AI decisions

---

## Features

* **AI Scheduling Engine**: Integrates OpenAI to prioritize tasks based on type, deadline, and priority.
* **Drag-and-Drop Calendar**: Built with React Big Calendar and drag-and-drop support.
* **Smart Constraints**:
  * Enforces realistic work hours (e.g., 9am–5pm on weekdays)
  * Blocks scheduling during sleep windows
  * Personal tasks only allowed outside work hours
* **Justifications**: Hovering over a task reveals the reason it was scheduled at that time.
* **Unscheduled Task Tracking**: Tasks that can’t be scheduled (e.g., too long, invalid, or conflict-prone) are displayed separately with reasons.
* **Life Science PM Extensions**: Optional inputs for resource allocation, risk assessment, workflows, and milestone criticality.
* **Persistent Storage**: Uses SQLAlchemy to store user info and task data.

---

## Tech Stack

| Layer         | Technology       |
| ------------- | ---------------- |
| Frontend      | React + Vite     |
| Backend       | Flask + Python   |
| Intelligence  | OpenAI API       |
| State Storage | SQLAlchemy       |
| Deployment    | Docker + Compose |

---

## Setup Instructions

### Prerequisites

* Node.js >= 18
* Python >= 3.9
* (Optional) Docker & Docker Compose

### Local Development (No Docker)

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

**Backend**

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### With Docker

```bash
docker-compose up --build
```

Visit frontend: [http://localhost:5173](http://localhost:5173)
Visit backend: [http://localhost:5001](http://localhost:5001)
