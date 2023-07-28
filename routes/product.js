const { Router } = require('express');

const Format = require('response-format');
const {
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
} = require('../controller/ProductController');
const { default: mongoose } = require('mongoose');

const router = Router();

router.get('/', async (req, res) => {
  const response = await getProduct();
  res.status(200).send(Format.success('success', response));
});
router.post('/', async (req, res) => {
  const { name, price, image, productUrl } = req.body;
  try {
    if (!name || !price || !image || !productUrl) {
      return res
        .status(400)
        .send(
          Format.badRequest(
            'error',
            'name, price, image, productUrl is required'
          )
        );
    }
    const data = { name, price, image, productUrl };
    const response = await addProduct(data);
    res.status(200).send(Format.success('success', response));
  } catch (error) {
    if (error instanceof mongoose.MongooseError) {
      const validationErrors = {};
      for (const key in error.errors) {
        validationErrors[key] = error.errors[key].message;
      }
      return res.status(400).send(Format.badRequest('error', validationErrors));
    }
    res.status(500).send(Format.internalError('error', error.message));
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, image, productUrl } = req.body;
  try {
    const response = await editProduct(id, name, price, image, productUrl);
    res.status(200).send(Format.success('success', response));
  } catch (error) {
    if (error instanceof mongoose.MongooseError) {
      const validationErrors = {};
      for (const key in error.errors) {
        validationErrors[key] = error.errors[key].message;
      }
      return res.status(400).send(Format.badRequest('error', validationErrors));
    }
    res.status(500).send(Format.internalError('error', error.message));
  }
});
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteProduct(id);
    res.status(200).send(Format.success('success', response));
  } catch (error) {
    res.status(404).send(Format.notFound('error', error.message));
  }
});

module.exports = router;
