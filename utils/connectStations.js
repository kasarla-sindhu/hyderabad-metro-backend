// utils/connectStations.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Station = require("../models/Station");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const connectRedLineStations = async () => {
  try {
    const stations = await Station.find({ station_number_on_line: { $exists: true } }).sort("station_number_on_line");

    for (let i = 0; i < stations.length; i++) {
      const connections = [];
      if (i > 0) connections.push(stations[i - 1]._id);
      if (i < stations.length - 1) connections.push(stations[i + 1]._id);

      stations[i].connections = connections;
      await stations[i].save();
    }
    console.log("✅ Red Line station connections updated");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB().then(connectRedLineStations);
