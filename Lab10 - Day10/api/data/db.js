const mongoose = require("mongoose");
require("./jobs-model");

const dbUrl = process.env.DB_URL + process.env.DB_NAME;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", function () {
  console.log(`Mongoose connected to ${dbUrl}`);
});

mongoose.connection.on("disconnected", function () {
  console.log(`Mongoose disconnected from ${dbUrl}`);
});

mongoose.connection.on("error", function () {
  console.log(`Mongoose error ${dbUrl}`);
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by application termination");
    process.exit();
  });
});

process.on("SIGTERM", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by application termination SIGTERM");
    process.exit();
  });
});

process.on("SIGUSR2", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by application restart");
    process.kill(process.pid, "SIGUSR2");
  });
});
