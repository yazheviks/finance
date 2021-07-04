const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');

const authRouter = require('./routes/authRouter');
const jwtPassport = require('./middleware/passport');

const app = express();
const url = 'mongodb+srv://viktoriia:viktoriia12@cluster0.8lcse.mongodb.net/Finance?retryWrites=true&w=majority';

app.use(passport.initialize());
jwtPassport(passport);

app.use(express.json());
app.use('/auth', authRouter);

const startApp = async () => {
  try {
    await mongoose.connect(url, { useUnifiedTopology: true, useFindAndModify: false, useNewUrlParser: true });
    app.listen(5000, () => console.log('Connected to port 5000'));
  } catch (error) {
    console.log(error);
  }
}

startApp();
