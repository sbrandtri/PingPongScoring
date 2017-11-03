"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  name: {
    type: String,
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

module.exports = mongoose.model("Players", PlayerSchema);
