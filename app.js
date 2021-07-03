const express = require('express');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/financedb';

const app = express();

mongoose.connect(url, { useUnifiedTopology: true, useFindAndModify: false, useNewUrlParser: true })
  .then(() => console.log('Mongo DB connected.'))
  .catch(error => console.log(error));

app.listen(3000, () => console.log('haha'));
