require("dotenv").config();
const mongoose = require("mongoose");
require("./games-model.js");

const dbURL = process.env.DB_URL + process.env.DB_NAME;

mongoose.connect(dbURL, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
});

mongoose.connection.on("connected", function () {
  console.log("Mongoose connected to", dbURL);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose connection error", err);
});

process.on("SIGINT", function () {
  console.log("Mongoose disconnected by application termination");
  process.exit(0);
});

process.on("SIGUSR2", function () {
  console.log("Mongoose disconnected by application restart");
  process.kill(process.pid, "SIGUSR2");
});
