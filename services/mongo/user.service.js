const boom = require('@hapi/boom');
const { User } = require('../../db/models/mongoDB/schemas');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = new User(data);
    const rta = await newUser.save();
    return rta;
  }

  async find() {
    const users = await User.find();
    return users;
  }

  async findOne(id) {
    // const user = await models.User.findByPk(id);
    // if (!user) {
    //   throw boom.notFound('user not found');
    // }
    // return user;
  }

  async update(id, changes) {
    // const user = await this.findOne(id);
    // const rta = await user.update(changes);
    // return rta;
  }

  async delete(id) {
    // const user = await this.findOne(id);
    // await user.destroy();
    // return { id };
  }
}

module.exports = UserService;
