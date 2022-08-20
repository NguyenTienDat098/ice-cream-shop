const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Bill = new Schema({
  idCustomer: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  phoneNumber: {
    type: Number,
    default: 0,
    maxLength: 12,
  },
  deliveryMethod: {
    type: String,
    default: '',
  },
  paymentMethod: {
    type: String,
    default: '',
  },
  processDelivery: {
    type: Number,
    default: 0,
  },
  code: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Bill', Bill);
