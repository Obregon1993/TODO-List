const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');
const { Task } = require('../../db/models/mongoDB/schemas');

class TaskService {
  constructor() {}

  async create(data) {
    return data;
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const [data] = await sequelize.query(query);
    return data;
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
