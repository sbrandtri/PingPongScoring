"use strict";
module.exports = function(app) {
  var pingPong = require("../controllers/pingPongController");

  // Routes
  app
    .route("/players")
    .get(pingPong.listPlayers)
    .post(pingPong.createPlayer);

  app
    .route("/player/:id")
    .get(pingPong.getPlayer)
    .put(pingPong.updatePlayer)
    .delete(pingPong.deletePlayer);
};
