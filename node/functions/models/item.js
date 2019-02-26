const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const ItemSchema = new Schema({
  _id: Schema.Types.ObjectId,
  item_type   : { type: Schema.Types.ObjectId, ref: 'ItemType'},
  title       : { type : String, required: true, trim: true },
  name        : { type : String, required: true, trim: true },
  price       : { type : Number, required: true, trim: true },
  description : { type : String, required: true },
  stock       : { type : Number, required: true, trim: true },
});

module.exports = mongoose.model('Item', ItemSchema, 'items');
