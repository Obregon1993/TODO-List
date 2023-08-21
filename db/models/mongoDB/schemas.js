const mongoose = require('mongoose');
const uuid = require('uuid');
const Schema = mongoose.Schema;

// Definir el esquema para las tareas
const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Definir el esquema para los usuarios
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId, // Esto es un array de ObjectIds
      ref: 'Task', // Esta es una referencia al modelo 'Task'
    },
  ],
});

// Crear los modelos a partir de los esquemas
const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);

module.exports = { User, Task };
