import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskInput = ({ addTask }) => {
  const [taskText, setTaskText] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'text') {
      setTaskText(e.target.value);
    } else if (e.target.name === 'description') {
      setTaskDescription(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskText.trim() || !taskDescription.trim()) {
      toast.warn('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: taskText, description: taskDescription })
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      addTask(data);
      setTaskText('');
      setTaskDescription('');
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to add task!');
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-3">
          <input type="text" name="text" value={taskText} onChange={handleChange} placeholder="Add a new task..." className="form-control" />
        </div>
        <div className="mb-3">
          <input type="text" name="description" value={taskDescription} onChange={handleChange} placeholder="Add a description..." className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
    </>
  );
};

export default TaskInput;