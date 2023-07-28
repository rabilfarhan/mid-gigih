const { default: mongoose } = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  image: {
    required: true,
    type: String,
  },
  productUrl: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('Product', productSchema);
