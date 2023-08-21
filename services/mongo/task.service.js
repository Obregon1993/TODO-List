const boom = require('@hapi/boom');
const { Task, User } = require('../../db/models/mongoDB/schemas');

class TaskService {
  constructor() {}

  async create(data) {
    const newTask = new Task(data);
    const savedtask = await newTask.save();
    console.log('check data', data.userId);
    const user = await User.findOne({ _id: data.userId.toString() });
    // // user.tasks.push(newTask);
    user.tasks.push(savedtask._id);
    const userTaks = await user.save();
    return userTaks;
  }

  async find() {
    const allTasks = await Task.find();
    return allTasks;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = TaskService;
