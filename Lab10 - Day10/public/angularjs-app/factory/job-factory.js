angular.module("jobApp").factory("JobFactory", JobFactory);

function JobFactory($http) {
  return {
    getAll: getAll,
    getOne: getOne,
    add: add,
    edit: edit,
    deleteOne: deleteOne,
  };

  function getAll() {
    return $http.get("/api/jobs").then(complete).catch(failed);
  }

  function getOne(jobId) {
    return $http.get(`/api/jobs/${jobId}`).then(complete).catch(failed);
  }

  function add(jobBody) {
    return $http.post(`/api/jobs`, jobBody).then(complete).catch(failed);
  }

  function edit(jobId, jobBody) {
    return $http
      .patch(`/api/jobs/${jobId}`, jobBody)
      .then(complete)
      .catch(failed);
  }

  function deleteOne(jobId) {
    return $http.delete(`/api/jobs/${jobId}`).then(complete).catch(failed);
  }

  function complete(response) {
    return response.data;
  }

  function failed(error) {
    return error;
  }
}
