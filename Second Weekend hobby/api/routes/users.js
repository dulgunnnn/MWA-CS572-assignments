const express = require("express");
const controllerUser = require("../controller/users.controller");

const router = express.Router();

router.route("/register").post(controllerUser.register);

router.route("/login").post(controllerUser.login);

module.exports = router;
