const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  _id: Schema.Types.ObjectId,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  phone_number: { type: String, trim: true },
  address: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  country: { type: String, trim: true },
  zip_code: { type: String, trim: true },
  payment_host_id: { type: String, trim: true },
});

module.exports = mongoose.model('Customer', CustomerSchema, 'customers');
