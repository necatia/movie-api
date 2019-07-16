const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/movie-api', { useNewUrlParser: true });

  mongoose.connection.on('open', () => {//ebent tetiklenmesi var
     console.log('MongoDB: Connected');
  });
  mongoose.connection.on('error', (err) => {
    console.log("mongodb error",err);
  });

  mongoose.Promise = global.Promise;
};