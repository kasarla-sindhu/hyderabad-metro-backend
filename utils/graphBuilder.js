const Station = require("../models/Station");

const buildGraph = async () => {
  const stations = await Station.find().populate("connections");
  const graph = {};

  stations.forEach((station) => {
    const stationName = station.station_name.trim().toLowerCase();
    const connectionNames = station.connections.map(conn => conn.station_name.trim().toLowerCase());
    graph[stationName] = connectionNames;
  });

  return graph;
};

module.exports = buildGraph;
