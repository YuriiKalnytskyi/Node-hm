const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const { authRouter, userRouter } = require('./routes');
const { constants, code } = require('./constants');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(_hadleErrors);

app.listen(constants.PORT, () => {
  console.log(`app lissen ${constants.PORT} `);
});

// eslint-disable-next-line no-unused-vars
function _hadleErrors(err, req, res, next) {
  res
    .status(err.status)
    .json({
      message: err.message || constants.UNKNOWN_ERROR,
      customCode: err.code || 0
    });
}

function _notFoundHandler(err, req, res, next) {
  next({
    status: err.status || code.NOT_FOUND,
    message: err.message || constants.ROUTE_NOT_FOND
  });
}

function _mongooseConnector() {
  mongoose.connect('mongodb://localhost:27017/hw', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('hi'))
    .catch((err) => console.log(err));
}
