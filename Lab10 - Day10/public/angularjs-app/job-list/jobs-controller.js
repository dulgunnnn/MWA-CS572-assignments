angular.module("jobApp").controller("JobsController", JobsController);

function JobsController(JobFactory) {
  const vm = this;

  const fetch = function () {
    JobFactory.getAll().then(function (response) {
      vm.jobs = response;
    });
  };
  fetch();

  const creationModal = new bootstrap.Modal(
    document.getElementById("addModal"),
    {
      keyboard: false,
    }
  );

  const toastElList = [].slice.call(document.querySelectorAll(".toast"));
  const toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl);
  });

  const collapseElementList = [].slice.call(
    document.querySelectorAll(".collapse")
  );
  const collapseList = collapseElementList.map(function (collapseEl) {
    return new bootstrap.Collapse(collapseEl);
  });

  vm.jobForm = {};
  vm.addJob = function () {
    JobFactory.add(vm.jobForm).then(function (response) {
      fetch();
      creationModal.hide();
      document.querySelector("#liveToast strong").innerHTML = "Added!";
      document.querySelector("#liveToast .toast-body").innerHTML =
        "New job has been added.";
      toastList.forEach((toast) => toast.show());
      vm.jobForm = {};
    });
  };

  vm.delete = function (jobId) {
    JobFactory.deleteOne(jobId).then(function (response) {
      document.querySelector("#liveToast strong").innerHTML = "Deleted!";
      document.querySelector("#liveToast .toast-body").innerHTML =
        "The job has been removed.";
      toastList.forEach((toast) => toast.show());
      fetch();
    });
  };

  vm.editForm = {};
  vm.editJob = function (jobId) {
    JobFactory.edit(jobId, vm.editForm).then(function (response) {
      fetch();
      document.querySelector("#liveToast strong").innerHTML = "Updated!";
      document.querySelector("#liveToast .toast-body").innerHTML =
        "The job information updated.";
      toastList.forEach((toast) => toast.show());
      vm.editForm = {};
      document
        .querySelector(".accordion-collapse.collapse.show")
        .classList.remove("show");
    });
  };
}
