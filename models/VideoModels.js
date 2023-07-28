const { default: mongoose } = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  videoUrl: {
    required: true,
    type: String,
  },
  thumbnailUrl: {
    required: true,
    type: String,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('Video', videoSchema);
