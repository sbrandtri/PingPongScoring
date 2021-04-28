"use strict";

const mongoose = require("mongoose");
require("../models/player");

const Player = mongoose.model("Players");

exports.listPlayers = async (req, res) => {
  const players = await Player.find();
  res.json(players);
};

exports.createPlayer = async (req, res) => {
  console.log("createPlayer:req.body", req.body);
  const newPlayer = new Player(req.body);
  const createdPlayer = await newPlayer.save();
  res.json(createdPlayer);
};

exports.getPlayer = async (req, res) => {
  const player = await Player.findById(req.params.id);
  res.json(player);
};

exports.updatePlayer = async (req, res) => {
  const updatedPlayer = await Player.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true });
  res.json(updatedPlayer);
};

exports.deletePlayer = async (req, res) => {
  await Player.remove(
    {
      _id: req.params.id
    });
  res.json({ message: "Player successfully deleted" });
};
