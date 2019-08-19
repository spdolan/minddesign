const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelSchema = new Schema({
  modelName: { type: String},
  modelOwner: {type: ObjectId },
  svgLink: String,
  stlLink: String,
  gcodeLink: String,
  modelSettings: [],
  modelDescription: String,
  likes: 0,
  favorites: 0,
  published: false,
  updated_at: Date,
  created_at: Date,
});

//updates our individual schema every time
ModelSchema.pre('save', function (next) {
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
// PackageSchema.index({ name: 'text', 'name': 'text' });

module.exports = mongoose.model('Package', PackageSchema);