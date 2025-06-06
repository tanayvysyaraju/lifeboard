// TaskModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CreateTaskForm from './CreateTaskForm';

const TaskModal = ({ show, handleClose, onTaskAdd }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add a Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateTaskForm onTaskAdd={onTaskAdd} />
      </Modal.Body>
    </Modal>
  );
};

export default TaskModal;
