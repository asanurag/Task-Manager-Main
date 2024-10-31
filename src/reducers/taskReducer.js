import { ADD_TASK, UPDATE_TASK, DELETE_TASK, TOGGLE_TASK_COMPLETE, FETCH_TASKS } from '../actions/taskAction';

const initialState = {
  tasks: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        tasks: action.payload, 
      };

    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task // Use _id for MongoDB
        ),
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload), // Use _id for MongoDB
      };

    case TOGGLE_TASK_COMPLETE:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    default:
      return state;
  }
};

export default taskReducer;
