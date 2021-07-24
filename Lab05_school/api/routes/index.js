const express = require("express");
const controllerStudents = require("../controller/students.controller");

const router = express.Router();

router
  .route("/students")
  .get(controllerStudents.getAllStudents)
  .post(controllerStudents.addStudent);

router
  .route("/students/:studentId")
  .get(controllerStudents.getOneStudents)
  .put(controllerStudents.updateStudent)
  .patch(controllerStudents.partialUpdateStudent)
  .delete(controllerStudents.deleteStudent);

router.route("/students/:studentId/courses").get(controllerStudents.getCourses);

router
  .route("/students/:studentId/courses/:courseId")
  .get(controllerStudents.getOneCourse);

module.exports = router;
