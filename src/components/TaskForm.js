import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../actions/taskAction';
import '../style/TaskForm.css';

const TaskForm = ({ editingTask = null, onCancel }) => {
  const [title, setTitle] = useState(localStorage.getItem('taskFormTitle') || '');
  const [description, setDescription] = useState(localStorage.getItem('taskFormDescription') || '');
  const [dueDate, setDueDate] = useState(localStorage.getItem('taskFormDueDate') || '');
  const [priority, setPriority] = useState(localStorage.getItem('taskFormPriority') || 'low');
  const dispatch = useDispatch();

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDueDate(formatDate(editingTask.dueDate));
      setPriority(editingTask.priority);
    }
  }, [editingTask]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      dueDate: new Date(dueDate).toISOString(),
      priority,
    };

    try {
      if (editingTask) {
        dispatch(updateTask({ ...editingTask, ...formData }));
      } else {
        dispatch(addTask(formData));
      }

      clearLocalStorage();
      onCancel?.();
    } catch (error) {
      console.error('Error while submitting the form: ', error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('taskFormTitle');
    localStorage.removeItem('taskFormDescription');
    localStorage.removeItem('taskFormDueDate');
    localStorage.removeItem('taskFormPriority');
  };

  useEffect(() => {
    localStorage.setItem('taskFormTitle', title);
    localStorage.setItem('taskFormDescription', description);
    localStorage.setItem('taskFormDueDate', dueDate);
    localStorage.setItem('taskFormPriority', priority);
  }, [title, description, dueDate, priority]);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required aria-label="Title" />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required aria-label="Description" />
      </label>
      <br />
      <label>
        Due Date:
        <input
          type="date"
          defaultValue={dueDate || ''}
          onChange={(e) => setDueDate(e.target.value)}
          required
          aria-label="Due Date"
        />
      </label>
      <br />
      <label>
        Priority:
        <select value={priority} onChange={(e) => setPriority(e.target.value)} required aria-label="Priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <br />
      <button type="submit">{editingTask ? 'Update Task' : 'Add New Task'}</button>
      {editingTask && <button type="button" onClick={handleCancel}>Cancel</button>}
    </form>
  );
};

export default TaskForm;