const express = require('express');
const router = express.Router();
const {
  createLine,
  getLines,
  addStationToLine,
  getStationsByLine,
  deleteLine // ✅ Add this
} = require('../controllers/lineController');


// Line management
router.post('/', createLine);
router.get('/', getLines);
router.delete('/:lineId', deleteLine);
// ✅ NEW route to add station to a line
router.post('/:lineId/stations', addStationToLine);

module.exports = router;
