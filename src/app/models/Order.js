const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Orders = new Schema({
  idCustomer: {
    type: String,
    required: true,
  },
  amountsProductAdded: {
    type: Number,
    default: 0,
  },
  nameProductOrder: {
    type: String,
    default: '',
  },
  idProductOrder: {
    type: String,
    default: '',
  },
  amountsProductOrder: {
    type: String,
    default: '',
  },
  totalPrices: {
    type: String,
    default: '',
  },
});
module.exports = mongoose.model('Orders', Orders);
