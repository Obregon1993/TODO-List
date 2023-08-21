const request = require('supertest');
const express = require('express');
const chai = require('chai');
const app = express();
const taskRoutes = require('../routes/tasks.router');

const expect = chai.expect;

app.use(express.json());
app.use('/tasks', taskRoutes); // register routes

describe('Task Routes', () => {
  //GET
  it('Should get all tasks', (done) => {
    request(app)
      .get('/tasks')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
  //GET one
  it('Should get a task by ID', (done) => {
    const taskId = 'taskID'; // replace with a real ID or a mocked one
    request(app)
      .get(`/tasks/${taskId}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(taskId);
        done();
      });
  });

  // POST
  it('Should create a task', (done) => {
    const newTask = {
      title: 'Test Task',
      userId: 'ADD valid user ID',
    };

    request(app)
      .post('/tasks')
      .send(newTask)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.title).to.equal(newTask.title);
        done();
      });
  });

  // PATCH
  it('Should update a task by ID', (done) => {
    const taskId = 'taskID'; //replace with a real ID or a mocked one
    const updatedData = {
      title: 'Updated Task',
    };

    request(app)
      .patch(`/tasks/${taskId}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.title).to.equal(updatedData.title);
        done();
      });
  });

  // DELETE
  it('Should delete a task by ID', (done) => {
    const taskId = 'taskID'; // replace with a real ID or a mocked one

    request(app)
      .delete(`/tasks/${taskId}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(taskId);
        done();
      });
  });
});
