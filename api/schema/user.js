const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  picture: String,
  location: String,
  followers: [],
  updated_at: Date,
  created_at: Date
})

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