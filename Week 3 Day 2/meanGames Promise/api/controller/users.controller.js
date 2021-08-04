const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

module.exports.register = (req, res) => {
  bcrypt.genSalt(10, "", (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hashPassword) => {
      const newUser = {
        username: req.body.username,
        password: hashPassword,
        name: req.body.name,
        salt: salt,
      };

      const userCreate = User.create(newUser);

      userCreate
        .then((user) => {
          res.status(201).json({ message: "User created" });
        })
        .catch((err) => {
          res.status(500).json({ message: "Something went wrong", err: err });
        });
    });
  });
};

module.exports.login = (req, res) => {
  const findOne = User.findOne({ username: req.body.username });

  findOne
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "Given username does not exist" });
        return;
      }

      bcrypt.compare(req.body.password, user.password, (err, same) => {
        if (err) {
          res.status(500).json({ message: "Something went wrong" });
          return;
        }

        if (!same) {
          res.status(400).json({ message: "Incorrect password" });
          return;
        }

        const token = jwt.sign(
          { username: user.username },
          process.env.PASS_PHRASE,
          { expiresIn: 3600 }
        );

        res.status(201).json({ success: "Success", token: token });
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
    });
};

module.exports.authenticate = (req, res, next) => {
  const headerExists = req.headers.authorization;

  if (!headerExists) {
    res.status(403).json({ message: "Token is missing" });
    return;
  }

  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.PASS_PHRASE, (err, decodedToken) => {
    if (err) {
      console.log("jwt verify error", err);
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    next();
  });
};
