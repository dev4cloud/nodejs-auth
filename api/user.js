/**
 * api/user.js
 * Defines the User model and exports a mongoose Schema
 */

const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}

}, 
{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema, 'users');