"use strict";
const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: "Please enter the player's name"
  },
  wins: {
    type: Number,
    default: 0
  },
  losses: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Players", playerSchema);
