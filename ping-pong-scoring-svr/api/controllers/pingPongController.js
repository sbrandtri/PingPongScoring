"use strict";

var mongoose = require("mongoose"),
  Player = mongoose.model("Players");

exports.listPlayers = function(req, res) {
  Player.find({}, function(err, player) {
    if (err) res.send(err);
    res.json(player);
  });
};

exports.createPlayer = function(req, res) {
  var newPlayer = new Player(req.body);
  newPlayer.save(function(err, player) {
    if (err) res.send(err);
    res.json(player);
  });
};

exports.getPlayer = function(req, res) {
  Player.findById(req.params.id, function(err, player) {
    if (err) res.send(err);
    res.json(player);
  });
};

exports.updatePlayer = function(req, res) {
  Player.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    function(err, player) {
      if (err) res.send(err);
      res.json(player);
    }
  );
};

exports.deletePlayer = function(req, res) {
  Player.remove(
    {
      _id: req.params.id
    },
    function(err, task) {
      if (err) res.send(err);
      res.json({ message: "Player successfully deleted" });
    }
  );
};
