const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

mongoose.connect("mongodb://localhost/pingPongDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  const app = express();

  const port = process.env.PORT || 3000;
  app.set('port', port);

  // required when using nginx reverse proxy
  app.set('trust proxy', true);
  
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use("/api", routes);

  app.listen(port, () => {
    console.log("Ping Pong Scoring RESTful API server started on: " + port);
  });
});