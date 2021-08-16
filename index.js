const mongoose = require('mongoose');
const express = require('express');

const authRouter = require('./routes/authRouter');
const config = require('./config/app.config');

const app = express();


app.use(express.json());
app.use('/api/auth', authRouter);

const startApp = async () => {
  try {
    await mongoose.connect(config.mongoUri, { useUnifiedTopology: true, useFindAndModify: false, useNewUrlParser: true });
    app.listen(config.port, () => console.log('Connected to port 5000'));
  } catch (error) {
    console.log(error);
  }
}

startApp();
