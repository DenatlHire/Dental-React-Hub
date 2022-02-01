import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import {
  getDesignation,
  getavailability,
  getSkills,
  getWorkSituation,
  deleteJob
} from "../Service";
import Swal from "sweetalert2";
let loginUserInfo = JSON.parse(localStorage.getItem("user"));
let loginUserInfoData = JSON.parse(localStorage.getItem("user-info"));
console.log('loginUserInfoData', loginUserInfoData)
export default function MyJobs() {
  const [listing, setListing] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [skill, setSkill] = useState([]);
  const [workSituatuon, setWorkSituatuon] = useState([]);
  const [designations, setDesignations] = useState();
  let arraySkill
  let arrayAvailability

  useEffect(() => {
    axios
      .get(`/clinic-jobs`, { params: { user_id: loginUserInfo.id } })
      .then(response => {
        console.log("getWorkHist", response.data);
        setListing(response.data);
      });

    getDesignation().then(res => {
      setDesignations(res);
    });

    getavailability().then(res => {
      setAvailability(res);
    });
    getSkills().then(res => {
      setSkill(res);
    });
  }, []);

  const deleteJobfun = (id, i) => {
    if (id != "") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Remove",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#1b2330",
        cancelButtonColor: "#d33",
        reverseButtons: true
      }).then(result => {
        if (result.isConfirmed) {
          deleteJob(id)
            .then(response => {
              console.log("response", response);
              listing.splice(i, 1);

              setListing([...listing])
              Swal.fire("Removed!", "Job removed successfully!!.", "success");
            })
            .catch(errors => {
              console.log("rem res error => ", errors);
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire("Cancelled", "Job is not removed", "error");
        }
      });
    }
  };

  return (
    <div>

      {console.log("listing", listing)}



      <div className="job_list_wrap mt-8">
        <div className="container">
          <div className="row">



            <div className="search_result_wrap col-12">
              <div className="container">

                <div className="search_main_ttl">
                  <h2>My Jobs</h2>


                  <Link
                    className="theme_btn_default"
                    to="/createjob"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Create Job
                  </Link>

                </div>
                {listing?.map((data, i) => (
                  <div className="in_result_box ">
                    <div className="in_search_top">
                      <h2 className="main_s_title">
                        Doctor of {" "} {data?.job_title}
                        {/* {designations && designations?.map((value) => {
                            return (
                              <>{value.id === parseInt(data.job_title) ? value.name : ""}</>
                            )
                          })} */}
                      </h2>
                      <span className="s_designation">{data.address}</span>
                      <div className="user_bottom_sec" style={{ position: "relative" }}>
                        <div className="edit_in_dta">
                          <Link
                            to={`/updatejob/${data.id}`}
                            className="edit-icon icon-plus shadow"
                            data-toggle="modal"
                          >
                            <i className="fe fe-edit-2"></i>

                          </Link>
                        </div>
                        <div className="edit_in_dta">
                          <a
                            href
                            className="edit-icon icon-plus shadow"
                            data-toggle="modal"
                            style={{ right: "60px" }}
                            onClick={() => deleteJobfun(data.id, i)}
                            data-target={"#clinicInfo"}
                          >
                            <i className="fe fe-trash"></i>

                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="result_bottom_sec">

                      <div className="user_left_sec">
                        <div className="use_image">
                          <div className="thumbnail-container">
                            <div className="thumbnail">
                              <img src={loginUserInfoData.profile_photo ? window.baseURL + loginUserInfoData.profile_photo.url : `/assets/img/dental_img.png`} alt="Dental" />
                            </div>
                          </div>
                        </div>

                        <div className="user_info_in">

                          <div className="us_btn">
                            <ul>
                              <li>  <Link to={`/clinicprofile`}>View Profile</Link> </li>
                              <li><a className='msg-btn' href="#" title="Message"><i class="fa fa-comment" aria-hidden="true"></i> Message</a></li>
                            </ul>
                          </div>
                        </div>

                      </div>

                      <div className="user_right_sec">

                        <div class="title_wrap">
                          <h2 class="us_name">Roles<span>  {designations && designations?.map((value) => {
                            return (
                              <>{value.id === parseInt(data.roles.id) ? value.name : ""}</>
                            )
                          })}</span></h2>
                          <h2 class="us_name">{data.experience} Years<span>Working Experience Required</span></h2>
                        </div>




                        <div className="user_his_box">
                          <h2 className="use_his_title">
                            {/* Environment */}
                            Skills
                          </h2>
                          <ul className="user_his_list">
                            {
                              arraySkill = data.skills.split(/\s*,\s*/),
                              data &&
                                arraySkill.length > 0 ?
                                arraySkill?.map((element, i) => {
                                  return (
                                    element,
                                    skill?.map(val =>
                                      val.id == element ? (
                                        <li>{val.title}</li>
                                      ) : (
                                        ""
                                      )
                                    )
                                  );
                                }) : ''}
                            {/* <li><a href="#" title="Busy">Busy</a></li>
                          <li><a href="#" title="Social">Social</a></li>
                          <li><a href="#" title="Large Team">Large Team</a></li> */}
                          </ul>
                        </div>

                        <div className="user_his_box">
                          <h2 className="use_his_title">
                            Clinic Hours
                          </h2>
                          <ul className="user_his_list">
                            {
                              arrayAvailability = data.availability.split(/\s*,\s*/),
                              console.log("arrayAvailability", availability,),

                              arrayAvailability &&
                              arrayAvailability.length > 0 &&
                              arrayAvailability?.map((element, i) => {
                                return (

                                  element,
                                  availability?.map((val) =>
                                    val.id == arrayAvailability[i]
                                      ? <li>{val.title.toString()}</li>
                                      : ""
                                  )
                                );
                              })}
                          </ul>
                        </div>


                      </div>
                    </div>
                  </div>
                ))}


              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
