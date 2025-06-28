const Station = require('../models/Station');

// Create a station
const createStation = async (req, res) => {
  try {
    const { station_name, station_number_on_line, is_interchange, line } = req.body;

    const newStation = new Station({
      station_name,
      station_number_on_line,
      is_interchange,
      line
    });

    const saved = await newStation.save();
    res.status(201).json({ message: "Station added successfully", station: saved });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all stations
const getStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one station by ID
const getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Connect two stations
const connectStations = async (req, res) => {
  try {
    const { station1, station2 } = req.body;

    const s1 = await Station.findOne({ station_name: station1 });
    const s2 = await Station.findOne({ station_name: station2 });

    if (!s1 || !s2) {
      return res.status(404).json({ error: "One or both stations not found" });
    }

    if (!s1.connections.includes(s2._id)) {
      s1.connections.push(s2._id);
      await s1.save();
    }

    if (!s2.connections.includes(s1._id)) {
      s2.connections.push(s1._id);
      await s2.save();
    }

    res.json({ message: "Stations connected successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createStation,
  getStations,
  getStationById,
  connectStations
};
