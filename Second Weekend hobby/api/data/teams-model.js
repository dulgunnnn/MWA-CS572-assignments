const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  position: String,
  experience: Number,
  height: String,
  weight: Number,
});

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: Number,
  city: {
    type: String,
    required: true,
  },
  conference: String,
  roster: [playerSchema],
});

mongoose.model("Teams", teamSchema, "teams");
