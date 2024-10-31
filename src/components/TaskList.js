import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../actions/taskAction'; 
import '../style/TaskList.css';
import Task from './Task';
import TaskForm from './TaskForm';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleEditTaskModal = (task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  const handleUpdateTask = (updatedTask) => {
    setShowEditModal(false);
    setEditingTask(null);
  };

  const handleCancel = () => {
    setShowEditModal(false);
    setEditingTask(null);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredTasks =
    filterStatus === 'all'
      ? tasks
      : filterStatus === 'completed'
      ? tasks.filter((task) => task.completed)
      : tasks.filter((task) => !task.completed);

  const sortedTasks = sortBy
    ? filteredTasks.slice().sort((a, b) => {
        if (sortBy === 'priority') {
          const priorityOrder = ['high', 'medium', 'low'];
          return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
        } else if (sortBy === 'dueDate') {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        return 0;
      })
    : filteredTasks;

  return (
    <div className="task-list-container">
      <h2 className="task-list-header">Task List</h2>
      <div className="filter-sort-container">
        <div>
          <label htmlFor="filter-status">Filter by status:</label>
          <select id="filter-status" value={filterStatus} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort-by">Sort by:</label>
          <select id="sort-by" value={sortBy} onChange={handleSortChange}>
            <option value="">None</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
      </div>
      {sortedTasks.length === 0 ? (
        <p className="no-tasks-message">No tasks found.</p>
      ) : (
        <ul>
          {sortedTasks.map((task) => (
            <Task key={task._id || `temp-${task.title}`} task={task} onEditTask={handleEditTaskModal} />
          ))}
        </ul>
      )}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCancel}>
              &times;
            </span>
            <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
            <TaskForm editingTask={editingTask} onSubmit={handleUpdateTask} onCancel={handleCancel} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
