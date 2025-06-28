const Station = require('../models/Station');
const buildGraph = require("../utils/graphBuilder");

const findShortestRoute = async (req, res) => {
  const { source, destination } = req.body;

  try {
    const graph = await buildGraph();
    const visited = new Set();
    const queue = [[source.toLowerCase()]];

    while (queue.length > 0) {
      const path = queue.shift();
      const current = path[path.length - 1];

      if (current === destination.toLowerCase()) {
        const totalStations = path.length;
        const estimatedDistance = (totalStations - 1) * 1.1; // 1.1 km per hop
        const estimatedTime = (totalStations - 1) * 2; // 2 mins per hop

        let fare = 10;
        if (totalStations > 5 && totalStations <= 10) fare = 15;
        else if (totalStations > 10 && totalStations <= 20) fare = 25;
        else if (totalStations > 20) fare = 40;

        return res.json({
          route: path,
          totalStations,
          estimatedDistance: `${estimatedDistance.toFixed(1)} km`,
          estimatedTime: `${estimatedTime} minutes`,
          fare: `₹${fare}`
        });
      }

      if (!visited.has(current)) {
        visited.add(current);
        const neighbors = graph[current] || [];

        for (const neighbor of neighbors) {
          queue.push([...path, neighbor]);
        }
      }
    }

    res.status(404).json({ error: 'No route found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { findShortestRoute };
