const express = require('express');
const router = express.Router();
const {
  createStation,
  getStations,
  getStationById,
  connectStations
} = require('../controllers/stationController');

router.post('/', createStation);
router.get('/', getStations);
router.get('/:id', getStationById);
router.post('/connect', connectStations);

module.exports = router;
