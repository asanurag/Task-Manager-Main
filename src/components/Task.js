import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTaskComplete, deleteTask } from '../actions/taskAction';
import '../style/Task.css'

const Task = ({ task, onEditTask }) => {
  const dispatch = useDispatch();

  const handleToggleComplete = () => {
    dispatch(toggleTaskComplete(task._id));
  };  

  const handleDeleteTask = () => {
    dispatch(deleteTask(task._id));
  };
  

  const handleEditTask = () => {
    onEditTask(task);
  };

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <div className="task-details">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>
          Priority: <span className={`priority priority-${task.priority}`}>{task.priority}</span>
        </p>
        <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
      </div>
      <div className="task-actions">
        <button onClick={handleToggleComplete}>
          {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
        <button onClick={handleEditTask}>Edit</button>
        <button onClick={handleDeleteTask}>Delete</button>
      </div>
    </div>
  );
};

export default Task;