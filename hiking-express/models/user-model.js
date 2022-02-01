 feature/frontend
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: String,
  password: String,
  activated: Boolean,
  role: String,
  readme: String
}, { collection: 'user' });

const User = mongoose.model('user', usersSchema);


const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: String,
  password: String,
  activated: Boolean,
  role: String,
  readme: String
}, { collection: 'user' });

const User = mongoose.model('user', usersSchema);

 main
module.exports = User;