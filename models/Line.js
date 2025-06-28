const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String
  }
});

module.exports = mongoose.model('Line', lineSchema);
