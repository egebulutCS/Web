var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define a schema.
var userLoginSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide an Username!"],
    unique: [true, "Username Exist"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  }
});

// Create a model.
var UserLogin = mongoose.model('UserLogin', userLoginSchema);

module.exports = UserLogin;