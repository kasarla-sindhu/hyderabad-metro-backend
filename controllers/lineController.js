const Line = require('../models/Line');
const Station = require('../models/Station');

// ✅ Create a new metro line
const createLine = async (req, res) => {
  const { name, color } = req.body;

  try {
    const newLine = new Line({ name, color });
    await newLine.save();
    res.status(201).json({ message: 'Line created successfully', line: newLine });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all metro lines
const getLines = async (req, res) => {
  try {
    const lines = await Line.find();
    res.status(200).json(lines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Add a station to a specific line
const addStationToLine = async (req, res) => {
  const { lineId } = req.params;
  const { station_name, distance_from_previous, station_number_on_line, is_interchange } = req.body;

  try {
    const station = new Station({
      station_name,
      distance_from_previous,
      station_number_on_line,
      is_interchange,
      line: lineId
    });

    await station.save();

    res.status(201).json({ message: 'Station added successfully', station });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all stations for a specific line
const getStationsByLine = async (req, res) => {
  const { lineId } = req.params;

  try {
    const stations = await Station.find({ line: lineId }).sort('station_number_on_line');
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete a metro line by ID
const deleteLine = async (req, res) => {
  const { lineId } = req.params;

  try {
    await Line.findByIdAndDelete(lineId);
    res.status(200).json({ message: 'Line deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Export all controller functions
module.exports = {
  createLine,
  getLines,
  addStationToLine,
  getStationsByLine,
  deleteLine
};
