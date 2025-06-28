const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  station_name: {
    type: String,
    required: true
  },
  line: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Line',
    required: true
  },
  station_number_on_line: {
    type: Number,
    required: true
  },
  is_interchange: {
    type: Boolean,
    default: false
  },
  connections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station'
  }]
});

module.exports = mongoose.model('Station', stationSchema);
