const mongoose = require("mongoose");
const Students = mongoose.model("Students");

module.exports.getAllStudents = function (req, res) {
  Students.find().exec(function (err, students) {
    res.status(200).json(students);
  });
};

module.exports.getOneStudents = function (req, res) {
  Students.findById(req.params.studentId).exec(function (err, student) {
    console.log("Found games", student);
    res.status(200).json(student);
  });
};

module.exports.getCourses = function (req, res) {
  Students.findById(req.params.studentId).exec(function (err, student) {
    res.status(200).json(student.courses);
  });
};

module.exports.getOneCourse = function (req, res) {
  Students.findById(req.params.studentId).exec(function (err, student) {
    const course = student.courses.find(
      (item) => item.code === req.params.courseId
    );
    res.status(200).json(course);
  });
};
