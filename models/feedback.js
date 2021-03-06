const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  _idInvoice: mongoose.Schema.Types.ObjectId,
  _idUser: mongoose.Schema.Types.ObjectId,
  _idCourse: mongoose.Schema.Types.ObjectId,
  content: {
    type: String,
    require: true
  },
  rate: {
    type: Number,
    require: true
  },
  isDelete: {
    type: Boolean,
    require: true
  }
}, {
  timestamps: true,
});

feedbackSchema.index({'content': 'text' });

module.exports = mongoose.model('feedback', feedbackSchema);
