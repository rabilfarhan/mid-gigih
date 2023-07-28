const moment = require('moment');

// Middleware untuk menambahkan createdAt dan updatedAt
const timestampMiddleware = (req, res, next) => {
  const now = moment().toISOString();

  // Jika method POST (create), tambahkan createdAt
  if (req.method === 'POST') {
    req.body.createdAt = now;
  }

  // Jika method PUT atau PATCH (update), tambahkan updatedAt
  if (req.method === 'PUT' || req.method === 'PATCH') {
    req.body.updatedAt = now;
  }

  next();
};

module.exports = timestampMiddleware;
