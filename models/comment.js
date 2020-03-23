const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  _idUser: mongoose.Schema.Types.ObjectId,
  _idLesson: mongoose.Schema.Types.ObjectId,
  content: {
    type: String,
    require: true
  },
  createdDate: {
    type: Date,
    require: true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('comment', commentSchema);
