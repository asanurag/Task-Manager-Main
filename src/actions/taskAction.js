import axios from 'axios';

export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_TASK_COMPLETE = 'TOGGLE_TASK_COMPLETE';
export const FETCH_TASKS = 'FETCH_TASKS';

const API_URL = 'http://localhost:5000/api/tasks'; 

// Fetch tasks from the backend
export const fetchTasks = () => async (dispatch) => {
  const response = await axios.get(API_URL);
  dispatch({ type: FETCH_TASKS, payload: response.data });
};

// Add a new task
export const addTask = (task) => async (dispatch) => {
  const response = await axios.post(API_URL, task);
  dispatch({ type: ADD_TASK, payload: response.data });
};

// Update a task
export const updateTask = (task) => async (dispatch) => {
  const response = await axios.put(`${API_URL}/${task._id}`, task); // Use task._id here
  dispatch({ type: UPDATE_TASK, payload: response.data });
};


// Delete a task
export const deleteTask = (taskId) => async (dispatch) => {
  await axios.delete(`${API_URL}/${taskId}`);
  dispatch({ type: DELETE_TASK, payload: taskId });
};


export const toggleTaskComplete = (taskId) => async (dispatch) => {
  try {
    await axios.put(`${API_URL}/${taskId}`, { completed: true });
    dispatch({ type: TOGGLE_TASK_COMPLETE, payload: taskId });
  } catch (error) {
    console.error("Error toggling task completion:", error);
  }
};
