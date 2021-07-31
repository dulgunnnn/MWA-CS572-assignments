const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  zipcode: Number,
  address1: String,
  address2: String,
});

const reviewSchema = new mongoose.Schema({
  date: Date,
  review: String,
  nameOfReviewer: String,
});

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  salary: Number,
  location: locationSchema,
  description: String,
  experience: String,
  skills: [String],
  postDate: Date,
  reviews: [reviewSchema],
});

mongoose.model("Jobs", jobSchema);
