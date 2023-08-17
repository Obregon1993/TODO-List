const mongoose = require('mongoose');
const uuid = require('uuid');
const Schema = mongoose.Schema;

// Definir el esquema para las tareas
const TaskSchema = new Schema({
  // id_task: {
  //   type: String,
  //   default: uuid.v4(),
  //   unique: true,
  // },
  description: {
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
    // NOTA: En una aplicación real, deberías hashear las contraseñas, nunca guardarlas en texto plano.
    type: String,
    required: true,
  },
  tasks: [TaskSchema], // Esto establece que un usuario tiene un array de tareas.
});

// Crear los modelos a partir de los esquemas
const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);

module.exports = { User, Task };
