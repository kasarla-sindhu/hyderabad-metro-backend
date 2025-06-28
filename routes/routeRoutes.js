// routes/routeRoutes.js
const express = require("express");
const router = express.Router();
const { findShortestRoute } = require("../controllers/routeController");

router.post("/find", findShortestRoute);

module.exports = router;
