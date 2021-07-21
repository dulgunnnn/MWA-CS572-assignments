const express = require("express");
const path = require("path");
const router = require("./api/routes");
require("dotenv").config();

const app = express();

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use(express.static(process.env.PUBLIC_FOLDER));

app.use("/api", router);

//port: 5353
const server = app.listen(process.env.PORT, function () {
  console.log(`Server started on port ${server.address().port}`);
});
