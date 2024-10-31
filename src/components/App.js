import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/index';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import '../style/App.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className="app-container">
        <h1 className="task-manager">Task Manager</h1>
        <TaskForm />
        <TaskList />
      </div>
    </Provider>
  );
};

export default App;