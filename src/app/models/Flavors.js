const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Flavors = new Schema({
  name: {
    type: String,
    default: '',
    required: true,
  },
  description: {
    type: String,
    default: '',
    required: true,
  },
  img: {
    type: String,
    default: '',
    required: true,
  },
  prices: {
    type: String,
    default: '',
    required: true,
  },
  flavorsDaily: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model('Flavors', Flavors);
