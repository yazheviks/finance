const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  accountName: {
    type: String,
    default: 'Cash',
  },
  amount: {
    type: Number,
    required: true,
  },
  user: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  }
});

module.exports = mongoose.model('Account', accountSchema);
