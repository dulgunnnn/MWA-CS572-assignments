const express = require("express");
const app = express();
require("dotenv").config();
require("./api/data/db");
const path = require("path");
const jobsRoute = require("./api/route/jobs");

app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)));

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use(express.json());
app.use("/resources", express.static(path.join(__dirname, "node_modules")));
app.use("/api", jobsRoute);

const server = app.listen(process.env.PORT, function () {
  console.log(`Server started on port ${server.address().port}`);
});
