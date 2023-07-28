const ProductModels = require('../models/ProductModels');
const VideoModels = require('../models/VideoModels');

const getProduct = async () => {
  const res = await ProductModels.find();
  return res;
};

const addProduct = async (data) => {
  const res = await ProductModels.create(data);
  return res;
};
const editProduct = async (id, name, price, image, productUrl) => {
  try {
    const res = await ProductModels.findByIdAndUpdate(id, {
      name,
      price,
      image,
      productUrl,
    });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};
const deleteProduct = async (id) => {
  try {
    const getProduct = await ProductModels.findById(id);
    if (getProduct == null) {
      throw new Error('Product not found');
    } else {
      const res = await ProductModels.findByIdAndDelete(id);
      return res;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
};
