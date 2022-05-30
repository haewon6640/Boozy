const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    handle: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    shelf: [{type: Schema.Types.ObjectId, ref: 'ingredients'}]
  }, {
    timestamps: true
  });

module.exports = User = mongoose.model('User', UserSchema)