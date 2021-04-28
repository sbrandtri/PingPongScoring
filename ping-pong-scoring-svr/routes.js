"use strict";

const express = require("express");
const router = express.Router();
const pingPong = require("./api/controllers/pingPongController");


// Get all players
router.get("/players", pingPong.listPlayers);

// Create a player
router.post("/players", pingPong.createPlayer);

// Get a specific player
router.get("/player/:id", pingPong.getPlayer);

// Update a specific player
router.put("/player/:id", pingPong.updatePlayer);

// Delete a specific player
router.delete("/player/:id", pingPong.deletePlayer);


module.exports = router;