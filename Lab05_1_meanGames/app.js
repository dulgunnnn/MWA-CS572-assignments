const express = require("express");
require("dotenv").config();
require("./api/data/db");
const router = require("./api/routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use("/api", router);

const server = app.listen(process.env.PORT, function () {
  console.log(`Server started on port ${server.address().port}`);
});
