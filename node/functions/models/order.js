const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Customer = require('./customer');

const OrderSchema = new Schema({
  _id: Schema.Types.ObjectId,
  customer    : { type: Schema.Types.ObjectId, ref: 'Customer'},
  status      : { type : String, required: true, trim: true },
  notes       : { type : String },
  date_placed : { type : Date, default: Date.now },
  sub_total      : { type : Number, required: true, trim: true },
  shipping_cost      : { type : Number, required: true, trim: true },
  total      : { type : Number, required: true, trim: true },
  invoice_number      : { type : Number, required: true}
});

module.exports = mongoose.model('Order', OrderSchema, 'orders');
