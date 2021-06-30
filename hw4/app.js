const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const { userRouter } = require('./routes');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));

app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(_hadleErrors);

// app.listen(3000, () => {
//   console.log(`App listen ${port}`);
// });
app.listen(5000, () => {
  console.log('app lissen 3000');
});

// eslint-disable-next-line no-unused-vars
function _hadleErrors(err, req, res, next) {
  res
    .status(err.status)
    .json({
      message: err.message || 'Unknown error',
      customCode: err.code || 0
    });
}

function _notFoundHandler(err, req, res, next) {
  next({
    status: err.status || 404,
    message: err.message || 'Rout not fond'
  });
}

function _mongooseConnector() {
  mongoose.connect('mongodb+srv://user:user@delet.dt8x1.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('hi'))
    .catch((err) => console.log(err));
}
