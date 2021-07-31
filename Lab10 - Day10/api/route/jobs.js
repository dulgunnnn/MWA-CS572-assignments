const express = require("express");
const router = express.Router();

const jobController = require("../controller/job.controller");

router
  .route("/jobs")
  .get(jobController.getAllJobs)
  .post(jobController.addOneJob);

router
  .route("/jobs/:jobId")
  .get(jobController.getOneJob)
  .put(jobController.updateOneJob)
  .patch(jobController.partialUpdateOneJob)
  .delete(jobController.deleteOneJob);

module.exports = router;
