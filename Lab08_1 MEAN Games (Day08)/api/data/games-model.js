const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: String,
  location: {
    coordinates: {
      type: [Number], //store coordinates in longitude(E/W) and latitude(N/S)
      index: "2dsphere",
    },
  },
});

const reviewSchema = new mongoose.Schema({
  name: String,
  review: String,
  date: String,
});

const gameSchema = new mongoose.Schema({
  reviews: [reviewSchema],
  title: {
    type: String,
    required: true,
  },
  year: Number,
  rate: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  },
  price: Number,
  minPlayers: {
    type: Number,
    min: 1,
    max: 10,
  },
  maxPlayers: Number,
  minAge: Number,
  designers: [String],
  publisher: publisherSchema,
});

mongoose.model("Game", gameSchema, "games");
