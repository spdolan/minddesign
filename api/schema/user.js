const mongoose = require('mongoose')
const { Schema } = mongoose
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

const UserSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  picture: String,
  location: String,
  followers: [],
  hash: String,
  salt: String,
  updated_at: Date,
  created_at: Date
})

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

  return this.hash === hash;
}

UserSchema.pre('save', function (next) {
  // get the current date
  const currentDate = new Date("<mm-dd-YYYY>");
  // change the updated_at field to current date
  this.updated_at = currentDate;
  // if created_at doesn't exist, add to that field
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

module.exports = mongoose.model('user', UserSchema)