const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  user: {
    ref: 'User',
    type:Schema.Types.ObjectId,
  }
});

module.exports = mongoose.model('Category', categorySchema);
