const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  first_name        : { type : String, trim: true },
  last_name         : { type : String, trim: true },
  email             : { type : String, required: true, trim: true },
  password          : { type : String, trim: true},
  role              : { type : String, trim: true },
});

module.exports = mongoose.model('User', UserSchema, 'users');