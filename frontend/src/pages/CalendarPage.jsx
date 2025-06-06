import React, { useState, useEffect } from 'react';
import MyCalendar from '../components/MyCalendar';
import CreateTaskForm from '../components/CreateTaskForm';
import { Button, ListGroup } from 'react-bootstrap';

const CalendarPage = () => {
  const [userName, setUserName] = useState('');
  const [sleepStart, setSleepStart] = useState('');
  const [sleepEnd, setSleepEnd] = useState('');
  const [tasksToSchedule, setTasksToSchedule] = useState([]);
  const [scheduledTasks, setScheduledTasks] = useState([]);
  const [unscheduled, setUnscheduled] = useState([]);

  // Fetch user data from Flask when component mounts
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/userinfo")
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.name);
        setSleepStart(data.sleepStart);
        setSleepEnd(data.sleepEnd);
      })
      .catch((err) => console.error("Error fetching user info:", err));
  }, []);

  const handleTaskAdd = (task) => {
    setTasksToSchedule((prev) => [...prev, task]);
  };

  const handleGenerateSchedule = () => {
    fetch("http://127.0.0.1:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasks: tasksToSchedule }),
    })
      .then(res => {
        if (!res.ok) throw new Error("Task submission failed");
        return fetch("http://127.0.0.1:5000/api/schedule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      })
      .then(res => {
        if (!res.ok) throw new Error("Schedule generation failed");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data.events)) {
          const formattedEvents = data.events.map(event => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          }));

          setScheduledTasks(formattedEvents); // Overwrite with regenerated full schedule
          setTasksToSchedule([]); // Clear input queue

          if (Array.isArray(data.unscheduled)) {
            setUnscheduled(data.unscheduled);
          }
        } else {
          console.error("Unexpected response:", data);
        }
      })


      .catch(err => {
        console.error("Schedule error:", err.message);
      });
  };




  return (
    <div className="container mt-4">
      <h3 className="mb-4">{userName ? `${userName}'s Smart Schedule` : 'Your Smart Schedule'}</h3>

      <MyCalendar
        events={scheduledTasks}
        setEvents={setScheduledTasks}
        sleepStart={sleepStart}
        sleepEnd={sleepEnd}
        mode="full"
      />

      <hr />

      {unscheduled.length > 0 && (
        <>
          <h5>❌ Could not schedule the following tasks:</h5>
          <ListGroup className="mb-3">
            {unscheduled.map((task, idx) => (
              <ListGroup.Item key={idx}>
                <strong>{task.name}</strong>: {task.reason}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}



      <CreateTaskForm onTaskAdd={handleTaskAdd} />

      {tasksToSchedule.length > 0 && (
        <>
          <h5>🕓 Waiting to be added to Calendar:</h5>
          <ListGroup className="mb-3">
            {tasksToSchedule.map((task, idx) => (
              <ListGroup.Item key={idx}>
                <strong>{task.name}</strong> — {task.type} | {task.duration}h | Due: {task.dueDate} | Priority: {task.priority}

                {task.type === "work" && (
                  <>
                    {task.project && <div><strong>Project:</strong> {task.project}</div>}
                    {task.client && <div><strong>Client:</strong> {task.client}</div>}
                    {task.isMeeting && <div><strong>Meeting:</strong> {task.isMeeting}</div>}
                    {task.deepWork && <div><strong>Deep Work:</strong> {task.deepWork}</div>}
                  </>
                )}

                {task.type === "personal" && (
                  <>
                    {task.activityType && <div><strong>Activity Type:</strong> {task.activityType}</div>}
                    {task.travel && <div><strong>Travel Required:</strong> {task.travel}</div>}
                    {task.energyDemand && <div><strong>Energy Demand:</strong> {task.energyDemand}</div>}
                  </>
                )}
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
