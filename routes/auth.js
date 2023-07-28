const express = require('express');
const router = express.Router();
const Format = require('response-format');
const { authRegister, authLogin } = require('../controller/UserController');

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .send(
        Format.badRequest('error', 'username, email, password is required')
      );
  }
  try {
    const response = await authRegister({
      username,
      email,
      password,
    });
    res.status(200).send(Format.success('success', response));
  } catch (error) {
    res.status(500).send(Format.internalError('error', error.message));
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send(Format.badRequest('error', 'email, password is required'));
  }
  try {
    const response = await authLogin({
      email,
      password,
    });
    res.status(200).send(Format.success('Login successful', response));
  } catch (error) {
    if (error.status == 404) {
      res.status(404).send(Format.notFound('error', error.message));
    } else if (error.status == 401) {
      res.status(401).send(Format.unAuthorized('error', error.message));
    } else {
      res.status(500).send(Format.internalError('error', error.message));
    }
  }
});

module.exports = router;
