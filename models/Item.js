const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  _merchant: {type: Schema.Types.ObjectId, ref: 'Merchant' },
  title: String,
  description: String,
  quantity: Number,
  price: Number
});

mongoose.model('items', itemSchema);
