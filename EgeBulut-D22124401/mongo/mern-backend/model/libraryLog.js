var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define a schema.
var LibraryLogSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide an Username!"],
    unique: [true, "Username Exist"],
  },

  books: {
    type: String,
    required: [true, "Please provide a book!"],
    unique: false,
  },

  fee: {
    type: String,
    required: [true, "Please provide a fee!"],
    unique: false,
  }
});

// Create a model.
var LibraryLog = mongoose.model('LibraryLog', LibraryLogSchema);

module.exports = LibraryLog;