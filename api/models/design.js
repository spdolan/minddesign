const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var crypto = require('crypto');

const DesignSchema = new Schema({
  designName: { type: String},
  designOwner: { type: Schema.Types.ObjectId, ref: 'User' },
  svgLink: String,
  stlLink: String,
  gcodeLink: String,
  designSettings: [],
  designDescription: String,
  likes: 0,
  favorites: 0,
  published: false,
  salt: String,
  hash: String,
  updated_at: Date,
  created_at: Date
});

DesignSchema.methods.setName = function (name) {
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(name, this.salt, 1000, 64, 'sha512').toString('hex');
}

DesignSchema.methods.validName = function (name) {
  var hash = crypto.pbkdf2Sync(name, this.salt, 1000, 64, 'sha512').toString('hex');

  return this.hash === hash;
}

//updates our individual schema every time
DesignSchema.pre('save', function (next) {
  // get the current date
  const currentDate = new Date();
  // change the updated_at field to current date
  this.updated_at = currentDate;
  // if created_at doesn't exist, add to that field
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

//this will allow us to create an index for search
// DesignSchema.index({ name: 'text', 'name': 'text' });

module.exports = mongoose.model('design', DesignSchema);