const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const ShipmentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  order       : { type: Schema.Types.ObjectId, ref: 'Order'},
  tracking_number : { type : String , trim: true },
  courrier_option :   { type : String, required: true},
  date_shipped   : { type : Date },
});

module.exports = mongoose.model('Shipment', ShipmentSchema, 'shipments');