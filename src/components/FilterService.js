import React from "react";
import axios from "axios";
const filterAxios = axios.create({
//    baseURL: 'http://localhost:8000/api/v1/search'
    baseURL: 'http://dentalhire.ca:8000/api/v1/search'
 });
 const user = JSON.parse(localStorage.getItem("user"));

export const getClinicFilter = async (availability,designations,skills,filterText,userExperience,lat,lng) => {
  return new Promise((resolve, reject) => {
    filterAxios
      .get("/searchjob",{
          params:{
            role:designations,
            skills:skills,
            availability:availability,
            searchText:filterText,
            experience:userExperience,
            lat:lat,
            lng:lng,
            user_id:user.id
          }
      })
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
        console.log("service ==> ", response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  });
};
export const getProfileFilter = async (availability,designations,skills,filterText,userExperience,lat,lng) => {
  return new Promise((resolve, reject) => {
    filterAxios
      .get("/searchProfile",{
          params:{
            role:designations,
            skills:skills,
            availability:availability,
            searchText:filterText,
            experience:userExperience,
            lat:lat,
            lng:lng,
            user_id:user.id
          }
      })
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
        console.log("service ==> ", response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  });
};
export const updateExp = async (user_id) => {
  return new Promise((resolve, reject) => {
    filterAxios
      .get("/updateWorkExp",{
          params:{
            user_id:user_id
          }
      })
      .then(response => {
        resolve(true);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  });
};
export const getClinicSavedProfile = async () => {
  return new Promise((resolve, reject) => {
    filterAxios
      .get("/clinicSaved",{
          params:{
            user_id:user.id
          }
      })
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
        console.log("service ==> ", response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  });
};
export const getIndividualSavedProfile = async () => {
  return new Promise((resolve, reject) => {
    filterAxios
      .get("/individualSaved",{
          params:{
            user_id:user.id
          }
      })
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
        console.log("service ==> ", response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  });
};
export const individualVisitPage = async (user_id) => {
  return new Promise((resolve, reject) => {
    filterAxios
      .post("/individualVisitPage?user_id="+user.id,{
          individual_id:user_id
          }
      )
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  });
};
export const clinicVisitPage = async (user_id) => {
  return new Promise((resolve, reject) => {
    filterAxios
      .post("/clinicVisitPage?user_id="+user.id,{
          individual_id:user_id
          }
      )
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  });
};
export const clinicSaveProfile = async (user_id) => {
  return new Promise((resolve, reject) => {
    filterAxios
      .post("/clinicSaveProfile?user_id="+user.id,{
          individual_id:user_id
          }
      )
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  });
};
export const individualSaveJob = async (user_id) => {
  return new Promise((resolve, reject) => {
    filterAxios
      .post("/individualSaveJob?user_id="+user.id,{
          individual_id:user_id
          }
      )
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  });
};
export const clinicJob = async (availability,designations,skills,userExperience) => {
  console.log('--->')
  return new Promise((resolve, reject) => {
    filterAxios
      .post("/clinicJob",{
          role:designations,
            skills:skills,
            availability:availability,
            experience:userExperience,
            user_id:user.id
          
      })
      .then(response => {
        if (response.status === 200) {
          resolve(true);
        } else {
          resolve(true);
        }
        console.log("service ==> ", response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  });
};
export const getNotification = async () => {
  console.log('--->',user)
  if(user){
    return new Promise((resolve, reject) => {
      filterAxios
        .get("/getNotification",{params:{
          user_id:user.id
        }})
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            resolve(response.data.error);
          }
          console.log("service ==> ", response);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    });
  }
};
export const markAsRead = async (id) => {
  console.log('--->')
  return new Promise((resolve, reject) => {
    filterAxios
      .post("/markAsRead",{
        id:id
      })
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
        console.log("service ==> ", response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  });
};
export const individualDashboard = async () =>{
  return new Promise((resolve, reject) => {
    filterAxios
      .post("/individualDashboard/"+user.id)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
        console.log("service ==> ", response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  });
}
export const clinicDashboard = async () =>{
  return new Promise((resolve, reject) => {
    filterAxios
      .post("/clinicDashboard/"+user.id)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response.data.error);
        }
        console.log("service ==> ", response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  });
}



