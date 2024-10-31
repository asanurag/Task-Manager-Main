Task Manager
Task Manager is a full-stack application built with a React frontend and a Node.js/Express backend, using Redux for state management and MongoDB for data storage. This application allows users to create, edit, delete, and manage tasks with various features to enhance productivity. Users can filter tasks based on their status and sort them by priority or due date.

Features
Add Tasks: Create new tasks with details like title, description, priority, and due date.
Edit Tasks: Modify task details as needed.
Delete Tasks: Remove tasks from the list.
Mark Completion: Toggle tasks as completed or pending.
Filter Tasks: View tasks by status (all, completed, or pending).
Sort Tasks: Organize tasks by priority or due date for better management.

Technologies Used
Frontend
React UI component-based architecture.
Redux: State management for handling global application state.
React Router: Enables routing between different pages/views.
Redux Toolkit: Simplifies Redux state management and logic.
Axios: This is for API calls to the backend.

Backend
Node.js: JavaScript runtime for the server.
Express Web server framework to handle API routes.
MongoDB Atlas: Cloud-hosted NoSQL database.
Mongoose: MongoDB object modeling for schema definition and data handling.

Testing
Jest: A testing framework for unit and integration tests.
Getting Started

Prerequisites
Node.js and npm are installed on your machine.
MongoDB Atlas account for database access.

### `npm test` // Result of `npm test`

> backend@1.0.0 test
> cross-env NODE_ENV=test jest

  console.log
    MongoDB connected

      at log (server.js:16:23)

 PASS  Test/taskRoutes.test.js (6.565 s)
  Task API
    √ should create a new task (3329 ms)                                                                
    √ should retrieve all tasks (58 ms)                                                                 
    √ should update a task (69 ms)                                                                      
    √ should delete a task (47 ms)                                                                      
                                                                                                        
Test Suites: 1 passed, 1 total                                                                          
Tests:       4 passed, 4 total                                                                          
Snapshots:   0 total
Time:        6.763 s, estimated 9 s
Ran all test suites.




