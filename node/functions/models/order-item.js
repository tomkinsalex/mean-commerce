const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
  _id: Schema.Types.ObjectId,
  item     : { type: Schema.Types.ObjectId, ref: 'Item'},
  order    : { type: Schema.Types.ObjectId, ref: 'Order'},
  price      : { type : Number, required: true, trim: true },
  quantity      : { type : Number, required: true, trim: true }
});

module.exports = mongoose.model('OrderItem', OrderItemSchema, 'order_items');
