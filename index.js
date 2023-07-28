require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const videoRouter = require('./routes/video');
const productRouter = require('./routes/product');
const commentRouter = require('./routes/coments');
const authRouter = require('./routes/auth');

const moment = require('moment');
const port = process.env.PORT || 3000;
const timestampMiddleware = require('./middleware/TimestampMiddleware');

const mongoString = process.env.URL_DATABASE;

mongoose.connect(mongoString);

const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});
database.once('connected', () => {
  console.log('Database connect');
});
// Body Parser
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(timestampMiddleware);

// ROUTES
app.use('/video', videoRouter);
app.use('/product', productRouter);
app.use('/comment', commentRouter);
app.use('/auth', authRouter);

// app.use(express.json());

app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message,
    },
  });
});
app.listen(port, () => {
  console.log(`Server started at port http://localhost:${port}`);
});
