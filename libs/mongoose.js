const mongoose = require('mongoose');

const MONGO_USERNAME = 'root';
const MONGO_PASSWORD = 'example';
const MONGO_HOSTNAME = 'localhost';
const MONGO_PORT = '27017';
const MONGO_DB = 'my_list'; // El nombre de tu base de datos

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

function getMongoConection() {
  try {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('connected', () => {
      console.log('Mongoose is connected!!!!!!');
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

// mongoose
//   .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected successfully to server');
//   })
//   .catch((err) =>
//     console.error('An error occurred connecting to MongoDB: ', err)
//   );

module.exports = getMongoConection;
