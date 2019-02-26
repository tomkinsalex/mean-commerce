const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  _id: Schema.Types.ObjectId,
  first_name       : { type : String, trim: true },
  last_name        : { type : String, trim: true },
  email       : { type : String, required: true, trim: true },
  phone_number : { type : Number, trim: true},
  address       : { type : String, trim: true },
  city       : { type : String, trim: true },
  state       : { type : String, trim: true },
  country       : { type : String, trim: true },
  zip_code  : { type : String, trim: true },
  auth_id     : { type : String, trim: true},
  payment_host_id       : { type : String, trim: true},
});

module.exports = mongoose.model('Customer', CustomerSchema, 'customers');
