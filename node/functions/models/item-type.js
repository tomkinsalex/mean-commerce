const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const ItemTypeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  parent_type     : { type: Schema.Types.ObjectId, ref: 'ItemType'},
  name           : { type : String , required: true},
  description : { type : String , required: true },
});

module.exports = mongoose.model('ItemType', ItemTypeSchema, 'item_types');
