import React, { useState } from 'react';
import MyCalendar from '../components/MyCalendar';
import CreateTaskForm from '../components/CreateTaskForm';
import { Button, ListGroup } from 'react-bootstrap';

const CalendarPage = () => {
  const [tasksToSchedule, setTasksToSchedule] = useState([]);
  const [scheduledTasks, setScheduledTasks] = useState([]); // for AI to fill later

  const handleTaskAdd = (task) => {
    setTasksToSchedule(prev => [...prev, task]);
  };

  const handleGenerateSchedule = () => {
    // This is where you'll send tasksToSchedule to Flask backend for scheduling via OpenAI
    console.log("Sending to AI:", tasksToSchedule);
    // Simulate AI response:
    // setScheduledTasks(responseFromAI);
    setTasksToSchedule([]); // clear waiting list after "submission"
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Your Smart Schedule</h3>

      <MyCalendar events={scheduledTasks} />

      <hr />

      <CreateTaskForm onTaskAdd={handleTaskAdd} />

      {tasksToSchedule.length > 0 && (
        <>
          <h5>🕓 Waiting to be added to Calendar:</h5>
          <ListGroup className="mb-3">
            {tasksToSchedule.map((task, idx) => (
              <ListGroup.Item key={idx}>
                <strong>{task.name}</strong> — {task.type} | {task.duration}h | Due: {task.dueDate} | Priority: {task.priority}
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Button variant="success" onClick={handleGenerateSchedule}>
            Generate Schedule
          </Button>
        </>
      )}
    </div>
  );
};

export default CalendarPage;
