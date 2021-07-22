const express = require("express");
const router = require("./api/routes");
require("dotenv").config();

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/api", router);

const server = app.listen(process.env.PORT, function () {
  console.log(`Server started on port ${server.address().port}`);
});
