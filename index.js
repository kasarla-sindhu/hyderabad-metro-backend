const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const lineRoutes = require('./routes/lineRoutes');
const stationRoutes = require('./routes/stationRoutes');


const app = express();
app.use(express.json());
const routeRoutes = require("./routes/routeRoutes");
app.use("/api/route", routeRoutes);



app.use('/api/lines', lineRoutes);
app.use('/api/stations', stationRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => console.log(err));
