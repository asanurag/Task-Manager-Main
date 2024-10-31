import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Task from './Task';

const mockStore = configureStore([]);
const task = {
  _id: '1',
  title: 'Test Task',
  description: 'Test Description',
  dueDate: new Date(),
  priority: 'medium',
  completed: false,
};

describe('Task Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test('renders task details', () => {
    render(
      <Provider store={store}>
        <Task task={task} onEditTask={() => {}} />
      </Provider>
    );
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('calls onEditTask when edit button is clicked', () => {
    const onEditTaskMock = jest.fn();
    render(
      <Provider store={store}>
        <Task task={task} onEditTask={onEditTaskMock} />
      </Provider>
    );
    fireEvent.click(screen.getByText('Edit'));
    expect(onEditTaskMock).toHaveBeenCalledWith(task);
  });
});
