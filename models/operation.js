const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const operationSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  category: {
    ref: 'Category',
    type: Schema.Types.ObjectId,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = mongoose.model('Operation', operationSchema);
