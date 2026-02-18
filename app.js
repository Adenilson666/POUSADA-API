const express = require('express');

const app = express();

const userRouter = require('./routes/userRouter');

const errorMiddleware = require('./middlewares/errorMiddleware');

app.use(express.json());

app.use(userRouter);

app.use(errorMiddleware);

app.listen(3002, () => {
  console.log('Server is running on port http://localhost:3002');
});

module.exports = app;