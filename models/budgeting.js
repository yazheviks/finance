const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetingSchema = new Schema({
  category: {
    ref: 'Category',
    type: Schema.Types.ObjectId,
  },
  user: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  },
  budgetingItemAmount: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Budgeting', budgetingSchema);
