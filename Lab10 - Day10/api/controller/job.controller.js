const mongoose = require("mongoose");
const Jobs = mongoose.model("Jobs");

module.exports.getAllJobs = (req, res) => {
  const count = 10;
  const offset = 0;

  if (req.query && req.query.count) count = parseInt(req.params.count);

  if (req.query && req.query.offset) offset = parseInt(req.params.offset);

  Jobs.find()
    .skip(offset)
    .limit(count)
    .exec((err, jobs) => {
      if (err) {
        res.status(500).json({ message: "Something went wrong" });
        return;
      }
      const test = [];

      if (!jobs) {
        res.status(404).json({ message: "Not found" });
        return;
      }

      res.status(200).json(jobs);
    });
};

module.exports.getOneJob = (req, res) => {
  Jobs.findById(req.params.jobId).exec(function (err, job) {
    if (err) {
      res.status(400).json({ message: err });
      return;
    }

    if (!job) {
      res.status(404).json({ message: "Job with given ID not found" });
      return;
    }

    res.status(200).json(job);
  });
};

module.exports.addOneJob = function (req, res) {
  const newJob = {
    _id: mongoose.Types.ObjectId(),
    skills: req.body.skills ? req.body.skills : [],
    location: req.body.location ? req.body.location : {},
    title: req.body.title,
    salary: parseInt(req.body.salary),
    description: req.body.description,
    experience: req.body.experience,
    postDate: new Date(),
    reviews: [],
  };

  Jobs.create(newJob, (err, job) => {
    if (err) {
      res.status(500).json({ message: "Something went wrong", err: err });
      return;
    }

    res.status(201).json(job);
  });
};

const _updateJob = (req, res, job) => {
  job.save((err, updatedJob) => {
    if (err) {
      res.status(400).json({ message: "Error updating the job", err: err });
      return;
    }

    res.status(202).json(updatedJob);
  });
};

module.exports.updateOneJob = function (req, res) {
  Jobs.findById(req.params.jobId).exec((err, job) => {
    if (err) {
      res.status(500).json({ message: "Something went wrong" });
      return;
    }

    if (!job) {
      res.status(404).json({ message: "Job with given ID not found" });
      return;
    }

    job.skills = req.body.skills;
    job.title = req.body.title;
    job.salary = parseInt(req.body.salary);
    job.description = req.body.description;
    job.experience = req.body.experience;

    if (req.body.reviews) job.reviews = req.body.reviews;
    if (req.body && req.body.postDate) job.postDate = Date(req.body.postDate);
    if (req.body.location) job.location = req.body.location;

    _updateJob(req, res, job);
  });
};

module.exports.partialUpdateOneJob = (req, res) => {
  Jobs.findById(req.params.jobId).exec((err, job) => {
    if (err) {
      res.status(500).json({ message: "Something went wrong" });
      return;
    }

    if (!job) {
      res.status(404).json({ message: "Job with given ID not found" });
      return;
    }

    if (req.body && req.body.skills) job.skills = req.body.skills;
    if (req.body && req.body.title) job.title = req.body.title;
    if (req.body && req.body.salary) job.salary = parseInt(req.body.salary);
    if (req.body && req.body.description)
      job.description = req.body.description;
    if (req.body && req.body.experience) job.experience = req.body.experience;
    if (req.body && req.body.postDate) job.postDate = Date(req.body.postDate);
    if (req.body && req.body.reviews) job.reviews = req.body.reviews;
    if (req.body && req.body.location) job.location = req.body.location;

    _updateJob(req, res, job);
  });
};

module.exports.deleteOneJob = function (req, res) {
  Jobs.findByIdAndDelete(req.params.jobId).exec((err, deletedJob) => {
    if (err) {
      res.status(500).json({ message: "Something went wrong" });
      return;
    }

    if (!deletedJob) {
      res.status(404).json({ message: "Job with given ID not found" });
      return;
    }

    res.status(202).json({ message: "Accepted: delete operation" });
  });
};
