import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const CreateTaskForm = ({ onTaskAdd }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('work');
  const [duration, setDuration] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      name,
      type,
      duration,
      dueDate,
      priority
    };
    onTaskAdd(task);
    // reset form
    setName('');
    setType('work');
    setDuration('');
    setDueDate('');
    setPriority('Medium');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <h5>Add Task</h5>
      <Form.Group className="mb-2">
        <Form.Label>Task Name</Form.Label>
        <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Task Type</Form.Label>
        <Form.Select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Estimated Duration (hours)</Form.Label>
        <Form.Control
          type="number"
          min="0.25"
          step="0.25"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Priority</Form.Label>
        <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Task
      </Button>
    </Form>
  );
};

export default CreateTaskForm;
