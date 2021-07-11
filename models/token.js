const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  tokenId: {
    type: String,
    required: true,
  },
  userId: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  }
});

module.exports = mongoose.model('Token', tokenSchema);
