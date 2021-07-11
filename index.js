const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');

const authRouter = require('./routes/authRouter');
const jwtPassport = require('./middleware/passport-jwt');
const refreshPassport = require('./middleware/passport-refresh');
const config = require('./config/app.config');

const app = express();

app.use(passport.initialize());
jwtPassport(passport);
refreshPassport(passport);

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
