const { default: mongoose } = require('mongoose');

const comentSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  comment: {
    required: true,
    type: String,
  },
  createdAt: {
    required: true,
    type: Date,
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
  },
});

module.exports = mongoose.model('Comment', comentSchema);
