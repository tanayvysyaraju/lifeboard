import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateTaskForm = ({ onTaskAdd }) => {
  const [task, setTask] = useState({
    name: "",
    type: "",
    duration: "",
    dueDate: "",
    priority: ""
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onTaskAdd(task);
    setTask({
      name: "",
      type: "",
      duration: "",
      dueDate: "",
      priority: ""
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <h5>Create a Task</h5>

      <Form.Group className="mb-2">
        <Form.Label>Task Name</Form.Label>
        <Form.Control name="name" value={task.name} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Type</Form.Label>
        <Form.Select name="type" value={task.type} onChange={handleChange} required>
          <option value="">Select...</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </Form.Select>
      </Form.Group>

      {task.type === "work" && (
        <>
          <Form.Group className="mb-2">
            <Form.Label>Project Name</Form.Label>
            <Form.Control name="project" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Client</Form.Label>
            <Form.Control name="client" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Is this a meeting?</Form.Label>
            <Form.Select name="isMeeting" onChange={handleChange}>
              <option value="">Optional</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Deep Work Required?</Form.Label>
            <Form.Select name="deepWork" onChange={handleChange}>
              <option value="">Optional</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>
        </>
      )}

      {task.type === "personal" && (
        <>
          <Form.Group className="mb-2">
            <Form.Label>Activity Type</Form.Label>
            <Form.Select name="activityType" onChange={handleChange}>
              <option value="">Optional</option>
              <option value="exercise">Exercise</option>
              <option value="errand">Errand</option>
              <option value="relaxation">Relaxation</option>
              <option value="social">Social</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Requires Travel?</Form.Label>
            <Form.Select name="travel" onChange={handleChange}>
              <option value="">Optional</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Is this energy-consuming?</Form.Label>
            <Form.Select name="energyDemand" onChange={handleChange}>
              <option value="">Optional</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </Form.Select>
          </Form.Group>
        </>
      )}

      <Form.Group className="mb-2">
        <Form.Label>Estimated Duration (hours)</Form.Label>
        <Form.Control name="duration" type="number" value={task.duration} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Due Date</Form.Label>
        <Form.Control name="dueDate" type="date" value={task.dueDate} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Priority</Form.Label>
        <Form.Select name="priority" value={task.priority} onChange={handleChange} required>
          <option value="">Select...</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Form.Select>
      </Form.Group>

      <Button type="submit" variant="primary">Add Task</Button>
    </Form>
  );
};

export default CreateTaskForm;
