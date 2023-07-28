// middleware/authMiddleware.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const userData = jwt.verify(token, secretKey);
    req.user = userData; // Simpan data pengguna ke objek request
    next();
  } catch (error) {
    res.status(403).json({ error: 'Forbidden' });
  }
};

module.exports = {
  authenticateToken,
};
