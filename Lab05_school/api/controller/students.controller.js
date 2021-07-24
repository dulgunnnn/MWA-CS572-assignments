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

module.exports.addStudent = function (req, res) {
  const newStudent = {
    name: req.body.name,
    gpa: parseFloat(req.body.gpa),
    courses: [],
  };

  Students.create(newStudent, function (err, student) {
    const response = {
      status: 201,
      message: student,
    };

    if (err) {
      response.status = 500;
      response.message = "Internal error";
      console.log("err: ", err);
    }

    res.status(response.status).json(response.message);
  });
};

module.exports.updateStudent = function (req, res) {
  Students.findById(req.params.studentId).exec(function (err, student) {
    student.name = req.body.name;

    student.gpa = req.body.gpa ? parseFloat(req.body.gpa) : null;

    student.save(function (err, stud) {
      const response = {
        status: 201,
        message: stud,
      };

      if (err) {
        console.log("err: ", err);
        response.status = 500;
        response.message = "Cannot update";
      }

      res.status(response.status).json(response.message);
    });
  });
};

module.exports.partialUpdateStudent = function (req, res) {
  Students.findById(req.params.studentId).exec(function (err, student) {
    if (req.body.name) student.name = req.body.name;

    if (req.body.gpa) student.gpa = parseFloat(req.body.gpa);

    student.save(function (err, stud) {
      const response = {
        status: 201,
        message: stud,
      };

      if (err) {
        console.log("err: ", err);
        response.status = 500;
        response.message = "Cannot update";
      }

      res.status(response.status).json(response.message);
    });
  });
};

module.exports.deleteStudent = function (req, res) {
  Students.findByIdAndRemove(req.params.studentId).exec(function (
    err,
    deletedStudent
  ) {
    const response = {
      status: 204,
      message: deletedStudent,
    };

    if (err) {
      console.log("err", err);
      response.status = 500;
      response.message = "Cannout delete";
    } else if (!deletedStudent) {
      response.status = 404;
      response.message = "Student not found";
    }

    res.status(response.status).json(response.message);
  });
};
