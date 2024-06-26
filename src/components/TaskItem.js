import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskItem = ({ task, deleteTask, updateTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [newDescription, setNewDescription] = useState(task.description);
  const [showDescription, setShowDescription] = useState(false);

  // Reset internal state when task prop changes
  useEffect(() => {
    setNewText(task.text);
    setNewDescription(task.description);
  }, [task]);

  const handleDelete = (taskId) => {
    try {
      deleteTask(taskId); // Pass taskId to deleteTask
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Error deleting task.');
    }
  };

  const handleUpdate = () => {
    if (!newText.trim() || !newDescription.trim()) {
      toast.warn('Both title and description are required.');
      return;
    }

    try {
      const updatedTask = { ...task, text: newText, description: newDescription };
      updateTask(updatedTask);
      setShowModal(false);
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error('Error updating task.');
    }
  };

  const toggleDescription = () => setShowDescription(!showDescription);


  return (
    <>
      <div className="list-group-item d-flex flex-column justify-content-between align-items-start bg-light">
        <div className="d-flex justify-content-between align-items-center w-100">
          <span className="text-primary">{task.text}</span>
          <div>
          <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(task.id)}>Delete</button> 
            <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>Edit</button>
          </div>
        </div>
        <button className="btn btn-outline-info btn-sm mt-2" onClick={toggleDescription}>
          {showDescription ? 'Read Less' : 'Read More'}
        </button>
        {showDescription && (
          <div className="mt-2 p-2 w-100 bg-white" style={{ borderRadius: '5px' }}>
            <strong>Description:</strong>
            <p>{task.description}</p>
          </div>
        )}
        {showModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Task</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <input type="text" className="form-control mb-3" value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="Enter new title" />
                  <textarea className="form-control" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Enter new description"></textarea>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskItem;