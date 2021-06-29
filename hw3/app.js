const express = require('express');
const path = require('path');

const { userRouter } = require('./router');

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`App listen ${port}`);
});
