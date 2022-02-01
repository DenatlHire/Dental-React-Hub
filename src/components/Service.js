import React from "react";
import axios from "axios";
export const getDesignation = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/designations")
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
        console.log("service ==> ", response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  });
};

export const getavailability = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/working-times")
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
        console.log("service ==> ", response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  });
};

export const getSkills = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/skillset-types")
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
        console.log("service ==> ", response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  });
};

export const getWorkSituation = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/contract-types")
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
        console.log("service ==> ", response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  });
};

export const getTypes = async () => {
  return new Promise((resolve, reject) => {

    axios
      .get("/office-types")
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
        console.log("service ==> ", response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  });
};

export const setAddJob = async (getdata) => {
  console.log("data on submit ==>", getdata);

  return new Promise((resolve, reject) => {
    axios
      .post("/clinic-jobs", {
        job_title: getdata.job_title,
        roles: getdata.roles,
        address: getdata.address,
        latitude: getdata.latitude,
        longitude: getdata.longitude,
        experience: getdata.experience.toString(),
        skills: getdata.skills.toString(),
        user_id: getdata.user_id,
        availability: getdata.availability,
        start_date: getdata.start_date,
        description: getdata.description,


      })
      .then(async response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
      })
      .catch(error => {
        reject(error.response && error.response.data);
      });
  });
};


export const deleteJob = async (id) => {
  console.log("data on submit ==>", id);

  return new Promise((resolve, reject) => {
    axios
      .delete(`/clinic-jobs/${id}`)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
      })
      .catch(error => {
        reject(error.response && error.response.data);
      });
  });
};
export const deleteImages = async (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/upload/files/${id}`)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
      })
      .catch(error => {
        reject(error.response && error.response.data);
      });
  });
};

export const getWorkHistory = async (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get("/work-histories", {
        params: {
          user_id: id
        }
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response && error.response.data);
      });
  });
};
export const getEduHistory = async (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get("/university-programs", {
        params: {
          user_id: id
        }
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response && error.response.data);
      });
  });
};

