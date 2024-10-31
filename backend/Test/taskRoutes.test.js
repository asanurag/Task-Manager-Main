const request = require('supertest');
const app = require('../server'); 
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Task API', () => {
  let taskId;

  test('should create a new task', async () => {
    const response = await request(app).post('/api/tasks').send({
      title: 'Test Task',
      description: 'Test Description',
      dueDate: new Date(),
      priority: 'medium',
    });
    taskId = response.body._id;
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Test Task');
  });

  test('should retrieve all tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('should update a task', async () => {
    const response = await request(app).put(`/api/tasks/${taskId}`).send({
      title: 'Updated Task',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Updated Task');
  });

  test('should delete a task', async () => {
    const response = await request(app).delete(`/api/tasks/${taskId}`);
    expect(response.statusCode).toBe(204);
  });
});
