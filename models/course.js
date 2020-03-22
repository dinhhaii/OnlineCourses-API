const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  startDate: {
    type: Date,
    require: true
  },
  duration: {
    type: String,
    require: true
  },
  languages: {
    type: Array,
    require: true
  },
  difficulty: {
    type: String,
    require: true
  },
  available: {
    type: Number,
    require: true
  },
  status: {
    type: String,
    require: true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('course', userSchema);
