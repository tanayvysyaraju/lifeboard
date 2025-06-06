import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateTaskForm = ({ onTaskAdd }) => {
  const [task, setTask] = useState({
    name: "",
    preferredDay: "",
    type: "",
    duration: "",
    dueDate: "",
    priority: "",
    project: "",
    client: "",
    isMeeting: "",
    deepWork: "",
    activityType: "",
    travel: "",
    energyDemand: "",
    resourceNeeds: "",
    resourceConflict: "",
    riskFactors: "",
    riskMitigated: "",
    workflowSupported: "",
    milestoneCritical: ""
  });



  const handleChange = (e) => {
    setTask(prev => ({ ...prev, [e.target.name]: e.target.value }));
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

      <Form.Group className="mb-2">
        <Form.Label>Task Name</Form.Label>
        <Form.Control name="name" value={task.name} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Preferred Scheduling Day (Optional)</Form.Label>
        <Form.Control
          name="preferredDay"
          type="date"
          value={task.preferredDay}
          onChange={handleChange}
        />
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

          <h6>Optional: Life Science Project Management</h6>

          <Form.Group className="mb-2">
            <Form.Label>What resources (equipment or personnel) are required?</Form.Label>
            <Form.Control name="resourceNeeds" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Do you anticipate resource conflicts?</Form.Label>
            <Form.Select name="resourceConflict" onChange={handleChange}>
              <option value="">Optional</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Are there any risks associated with delay?</Form.Label>
            <Form.Control name="riskFactors" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Have risks been mitigated or flagged?</Form.Label>
            <Form.Select name="riskMitigated" onChange={handleChange}>
              <option value="">Optional</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Which workflows does this task support?</Form.Label>
            <Form.Control name="workflowSupported" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Is this task part of a critical milestone or handoff?</Form.Label>
            <Form.Select name="milestoneCritical" onChange={handleChange}>
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

      <div className="d-flex justify-content-end">
        <Button type="submit" variant="dark">Add Task</Button>
      </div>
    </Form>
  );
};

export default CreateTaskForm;
