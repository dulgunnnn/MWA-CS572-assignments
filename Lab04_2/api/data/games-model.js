const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  code: String,
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gpa: Number,
  studentId: Number,
  courses: [courseSchema],
});

mongoose.model("Students", studentSchema, "Students");
