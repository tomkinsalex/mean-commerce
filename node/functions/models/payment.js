const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  order       : { type: Schema.Types.ObjectId, ref: 'Order'},
  host_charge_id : { type : String },
  amount :   { type : Number },
  date       : { type : Date , default: Date.now},
});

module.exports = mongoose.model('Payment', PaymentSchema, 'payments');
