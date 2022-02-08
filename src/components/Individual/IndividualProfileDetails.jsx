import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import nl2br from "react-newline-to-break";
import axios from "axios";
import { format } from "date-fns";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-google-places-autocomplete";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import profile_pic from "./../../images/avatar.jpeg";
import background_pic from "./../../images/profile_banner.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import {updateExp} from '../FilterService';

import {
  getDesignation,
  getavailability,
  getSkills,
  getWorkSituation,
  getTypes,
  getWorkHistory,
  getEduHistory
} from "../Service";

function IndividualProfileDetails(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState();
  const [designations, setDesignations] = useState([]);
  const [skill, setSkill] = useState([]);
  const [skillSelected, setSkillSelected] = useState([]);
  const [workSituatuon, setWorkSituatuon] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [officeType, setOfficeType] = useState([]);
  const [educationDisplay, setEducationDisplay] = useState([]);
  const [educationData, setEducationData] = useState([
    { degree: "", institution: "", year_graduation: format(new Date(),"yyyy-MM-dd"), user_id: user.id }
  ]);
  // let workHistDisp = []
  const [workHistDisp, setWorkHistDisply] = useState([]);
  const [workHistData, setWorkHistData] = useState([
    {
      job_title: "",
      place_work: "",
      start_date: format(new Date(),"yyyy-MM-dd"),
      end_date: format(new Date(),"yyyy-MM-dd"),
      user_id: user.id
    }
  ]);
  const [usetInfo, setUsetInfo] = useState([]);
  const [totalExp, setTotalExp] = useState();
  const [activePopup, setAtivePopup] = useState();

  const [profile_file, setprofile_file] = useState();
  const [banner_file, setbanner_file] = useState();
  const [dateLimit, setDateLimit] = useState([]);
  const [selectedOption, setselectedOption] = useState(0);
  const df_profile_photo = profile_pic;
  const df_banner_photo = background_pic;
  const { urlid } = useParams()

  useEffect(() => {
    getDesignation().then(res => {
      setDesignations(res);
    });
    getSkillsSelected();
    getWorkSituation().then(res => {
      setWorkSituatuon(res);
    });
    getavailability().then(res => {
      setAvailability(res);
    });
    getTypes().then(res => {
      setOfficeType(res);
    });
    
  }, [selectedOption]);
  useEffect(() => {
    getWorkHist();
    getEducation();
    getWorkHistory(Buffer.from(urlid, 'base64').toString('ascii')).then(workResponse=>{setWorkHistDisply(workResponse);})
    getEduHistory(Buffer.from(urlid, 'base64').toString('ascii')).then(eduResponse=>{setEducationDisplay(eduResponse);})
  }, [])

  const getSkills = (id) => {
    axios
    .get("/skillset-types",{params: {
      designation_id: id
      }}).then(response => {
        console.log("res", response);
        setSkill(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };
  const getSkillsSelected = () => {
    axios
    .get("/skillset-types").then(response => {
        console.log("res", response);
        setSkillSelected(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  // validation start


  const validationSchema = yup
    .object()
    .shape({})
    .when((values, schema) => {
      if (activePopup == 1) {
        return schema.shape({
          firstname: yup.string().required("Please enter first name"),
          lastname: yup.string().required("Please enter last name"),
          designation_id: yup.string().required("Please select anyone role"),
          
        });
      }
      if (activePopup == 2) {
        return schema.shape({
          workHistData: yup.array().of(
            yup.object().shape({
              job_title: yup.string().required("Job title is required"),
              place_work: yup.string().required("Work place required"),
              start_date: yup.string("Please select a date").required("Please select a date"),
              end_date: yup.string("Please select a date").required("Please select a date")
            })
          )
        });
      }
      if (activePopup == 3) {
        return schema.shape({
          educationData: yup.array().of(
            yup.object().shape({
              degree: yup.string().required("Degree required"),
              institution: yup.string().required("Institute required"),
              year_graduation: yup.string("Please select a date").required("Please select a date")
            })
          )
        });
      }
      if (activePopup == 4) {
        return schema.shape({
          skillset_type_id: yup.array().min(1)
        });
      }
      if (activePopup == 5) {
        return schema.shape({
          contract_type_id: yup
            .array()
            .required("Select atleast one option of your interest")
            .min(1),
          officetype: yup.array().of(yup.string()).min(1).required("Please select anyone option"),
          hours_time: yup
            .array()
            .required("Select atleast one option of your interest")
            .min(1)
        });
      }
    });

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    register,
    control,
    watch,
    getValues
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...user
    }
  });
 
  console.log("temp", errors);

  // validation ends

  useEffect(() => {
    axios
      .get("user-informations", {
        params: {
          user_id: Buffer.from(urlid, 'base64').toString('ascii')
        }
      })
      .then(response => {
        console.log("data", response.data);
        let userInfo = response.data[0];
        

        let office_type_id = userInfo.office_type_id
          ? userInfo.office_type_id.split(/\s*,\s*/)
          : [];
        userInfo.office_type_id = userInfo.office_type_id
          ? userInfo.office_type_id.split(/\s*,\s*/)
          : [];
        let skillset_type_id = userInfo.skillset_type_id
          ? userInfo.skillset_type_id.split(/\s*,\s*/)
          : [];
        userInfo.skillset_type_id = userInfo.skillset_type_id
          ? userInfo.skillset_type_id.split(/\s*,\s*/)
          : [];
        let contract_type_id = userInfo.contract_type_id
          ? userInfo.contract_type_id.split(/\s*,\s*/)
          : [];
        userInfo.contract_type_id = userInfo.contract_type_id
          ? userInfo.contract_type_id.split(/\s*,\s*/)
          : [];
        let hours_time = userInfo.hours_time
          ? userInfo.hours_time.split(/\s*,\s*/)
          : [];
        userInfo.hours_time = userInfo.hours_time
          ? userInfo.hours_time.split(/\s*,\s*/)
          : [];
        userInfo.id = userInfo?.id;
        userInfo.longitude = userInfo?.longitude;
        userInfo.latitude = userInfo?.latitude;
        userInfo.latitude = userInfo?.latitude;
        userInfo.address = userInfo?.address;
        getSkills(userInfo.designation_id.id);
        setData(userInfo);
        setSelectedOfficeType(office_type_id);
        
        setSelectedworkSituatuon(contract_type_id);
        setUsetInfo(userInfo.user_id);
        setUsetInfo({ ...usetInfo, designation_id: userInfo.designation_id });
        setSelectedhourTime(hours_time);
        setSelectSkill(skillset_type_id);
        setselectedOption(userInfo.designation_id.id);
        setprofile_file(
          userInfo.profile_photo
            ? window.baseURL + userInfo.profile_photo.url
            : df_profile_photo
        );
        setValue("contract_type_id", userInfo.contract_type_id);
        setValue("skillset_type_id", userInfo.skillset_type_id);
        setValue("hours_time", userInfo.hours_time);
        setValue("designation_id", userInfo.designation_id.id);
        setValue('officetype',office_type_id)
        
        setbanner_file(
          userInfo.banner_photo
            ? window.baseURL + userInfo.banner_photo.url
            : df_banner_photo
        );
      })
      .catch(error => {
        console.log("data", error);
      });
  }, []);

  const getWorkHist = () => {
    axios
      .get("/work-histories", {
        params: {
          user_id: Buffer.from(urlid, 'base64').toString('ascii')
        }
      })
      .then(response => {
        console.log("getWorkHist", response.data);
        // setData(userInfo);
        let totalExpCount = 0;
        if (response.data && response.data.length > 0) {
          
          setWorkHistData(response.data);
          setValue("workHistData", response.data);
          response.data.map((work, i) => {
            totalExpCount =
              totalExpCount +
              (format(new Date(work.end_date), "yyyy") -
                format(new Date(work.start_date), "yyyy")) *
                1;
            console.log("total---", totalExpCount);
            console.log(
              "total---",
              (format(new Date(work.end_date), "yyyy") -
                format(new Date(work.start_date), "yyyy")) *
                1
            );
            setTotalExp(totalExpCount);
          });
        }else{
          setValue("workHistData",[{
              job_title: "",
              place_work: "",
              start_date: format(new Date(),"yyyy-MM-dd"),
              end_date: format(new Date(),"yyyy-MM-dd"),
              user_id: user.id
          }]);
        }
      });
  };
  const getEducation = () => {
    axios
      .get("/university-programs", {
        params: {
          user_id: Buffer.from(urlid, 'base64').toString('ascii')
        }
      })
      .then(response => {
        console.log("getEducation", response.data);
        if (response.data.length > 0) {
          setEducationData(response.data);
          setValue("educationData", response.data);
        }else{
          setValue("educationData",[
            { degree: "", institution: "", year_graduation: format(new Date(),"yyyy-MM-dd"), user_id: user.id }
          ])
        }
        // setData(userInfo);
      })
      .catch(error => {
        console.log("data", error);
      });
  };


  const [selectedworkSituatuon, setSelectedworkSituatuon] = useState(
    data?.contract_type_id ? data?.contract_type_id : []
  );

  const [selectedOfficeType, setSelectedOfficeType] = useState(
    data?.office_type_id ? data?.office_type_id : []
  );

  const [selectedhourTime, setSelectedhourTime] = useState(
    data?.hours_time ? data?.hours_time : []
  );

  const [selectSkill, setSelectSkill] = useState(
    data && data.skillset_type_id ? data.skillset_type_id : []
  );



  return (
    <>
      {data && (
        <div className="in_user_wrap ind_user_wrap">
          <div className="container">
            <div className="in_user_box">
              <div
                className="in_user_top"
                style={{ backgroundImage: `url("${banner_file}")` }}
              >
                </div>
                <a class="msg-btn" href={`/messaging/?recipient=${Buffer.from(urlid, 'base64').toString('ascii')}`} title="Message"><i class="fa fa-comment" aria-hidden="true"></i> Message</a>

              <div className="user_bottom_sec">
                
                <div className="user_left_sec">
                  <div className="use_image">
                    <div className="prof_in_dta">
                      
                    </div>
                    <div className="thumbnail-container">
                      <div className="thumbnail">
                        <img src={profile_file} alt="avtar" />
                      </div>
                    </div>
                  </div>
                  <div className="user_social">
                    <ul>
                      {data.user_id.email && (
                        <li>
                          <a
                            target="_blank"
                            href={`mailto:${data.user_id.email}`}
                          >
                            <i className="fa fa-envelope"></i>
                          </a>
                        </li>
                      )}
                      {data.facebook_link && (
                        <li>
                          <a target="_blank" href={data.facebook_link}>
                            <i className="fa fa-facebook"></i>
                          </a>
                        </li>
                      )}
                      {data.twitter_link && (
                        <li>
                          <a target="_blank" href={data.twitter_link}>
                            <i className="fa fa-twitter"></i>
                          </a>
                        </li>
                      )}
                      {data.linkedin_link && (
                        <li>
                          <a target="_blank" href={data.linkedin_link}>
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>
                      )}

                      {data.instagram_link && (
                        <li>
                          <a target="_blank" href={data.instagram_link}>
                            <i className="fa fa-instagram"></i>
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="user_right_sec">
                  <h2 className="us_name">
                    {data?.user_id.firstname}
                    <span>{data?.user_id.lastname}</span>
                  </h2>
                  <ul className="user_role">
                    <li>
                      <span>Role:</span>
                      {data?.designation_id?.name}
                    </li>
                    <li>
                      <span>Location:</span>
                      {data.address}
                    </li>
                  </ul>
                  <div className="us_desc">
                    <p>{data.about}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* about popup */}
          
            {/* about popup end */}
            <div className="exp_box_wrap">
              <div className="row">
                <div className="col-md-6 ind-col">
                  <div className="ex_box">
                    <div className="ex_box_title">
                      <h2 className="ex_title">Work Experience</h2>
                      <div className="box_right_data">
                        {/* <span>8 Years</span> */}
                        {workHistData.length > 0 && workHistData[0].job_title && (
                          <>
                            <span>
                              {totalExp > 1 && totalExp + " Years"}
                              {totalExp <= 1 && totalExp + " Year"}
                            </span>
                            <span className="ex_ttl">TOTAL</span>
                          </>
                        )}
                      </div>
                    </div>
                   
                    {workHistDisp &&
                    workHistDisp.length > 0 &&
                    workHistDisp[0].job_title ? (
                      workHistDisp.map(
                        (work, i) =>
                          work.job_title && (
                            <>
                              <div className="box_list_info">
                                <div className="box_list_left_data">
                                  <ul>
                                    <li className="b_name">{work.job_title}</li>
                                    <li className="b_name_data">
                                      {work.place_work}
                                    </li>
                                  </ul>
                                </div>
                                <div className="box_list_right_data">
                                  <ul>
                                    {/* <li className="b_name">5 Years</li>
                                     */}
                                    <li className="b_name">
                                      {workHistDisp &&
                                        workHistDisp.length > 0 &&
                                        format(
                                          new Date(work.end_date),
                                          "yyyy"
                                        ) -
                                          format(
                                            new Date(work.start_date),
                                            "yyyy"
                                          )}
                                      {workHistDisp &&
                                      workHistDisp.length > 0 &&
                                      format(new Date(work.end_date), "yyyy") -
                                        format(
                                          new Date(work.start_date),
                                          "yyyy"
                                        ) >
                                        1
                                        ? " Years"
                                        : " Year"}
                                    </li>
                                    <li className="b_name_data">
                                      {workHistDisp &&
                                        workHistDisp.length > 0 &&
                                        format(
                                          new Date(work.start_date),
                                          "yyyy"
                                        )}{" "}
                                      -{" "}
                                      {format(new Date(work.end_date), "yyyy")}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </>
                          )
                      )
                    ) : (
                      <div className="box_list_info">No record found</div>
                    )}
                  </div>
                </div>

                {/* work popup start */}
               
                {/* wrok pop end */}

                <div className="col-md-6 ind-col">
                  <div className="ex_box">
                    <div className="ex_box_title">
                      <h2 className="ex_title">Education</h2>
                    </div>
                    {educationDisplay &&
                    educationDisplay.length > 0 &&
                    educationDisplay[0].degree ? (
                      educationDisplay.map((disp, i) =>
                        disp.degree ? (
                          <div className="box_list_info">
                            <div className="box_list_left_data">
                              <ul>
                                <li className="b_name">{disp.degree}</li>
                                <li className="b_name_data">
                                  {disp.institution}
                                </li>
                              </ul>
                            </div>
                            <div className="box_list_right_data">
                              <ul>
                                <li className="b_name text-right">
                                  {format(
                                    new Date(disp.year_graduation),
                                    "yyyy"
                                  )}
                                </li>

                                <li className="b_name_data"></li>
                              </ul>
                            </div>
                          </div>
                        ) : (
                          ""
                        )
                      )
                    ) : (
                      <div className="box_list_info">No record found</div>
                    )}
                  </div>
                </div>

                {/* education popup start */}

                

                {/* education popup end */}
                <div className="col-md-6 ind-col">
                  <div className="ex_box">
                    <div className="ex_box_title">
                      <h2 className="ex_title">Skills</h2>
                    </div>
                   
                    <div className="box_list_info border-0 pt-0">
                      <div className="skill_dta">
                        <ul>
                          {data && data.skillset_type_id.length > 0
                            ? data.skillset_type_id.map((element, i) => {
                                return (
                                  element,
                                  skillSelected.map(val =>
                                    val.id == element ? (
                                      <li>
                                        {" "}
                                        <p>{val.title}</p>{" "}
                                      </li>
                                    ) : (
                                      ""
                                    )
                                  )
                                );
                              })
                            : "No record found"}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Skill popup start */}
                
                {/* skill popup end*/}
                <div className="col-md-6 ind-col">
                  <div className="ex_box pre-box">
                    <div className="ex_box_title">
                      <h2 className="ex_title">Preferences</h2>
                    </div>
                   
                    <div className="box_list_info">
                      {(data?.contract_type_id &&
                        data?.contract_type_id.length > 0) ||
                      (data && data?.office_type_id != "") ||
                      (data?.hours_time && data?.hours_time.length > 0) ? (
                        <>
                          <div className="box_list_left_data">
                            <ul>
                              <li className="b_name">
                                Ideal working situation
                              </li>
                              <li className="b_name_data">
                              {console.log("contract_type_id0",data?.contract_type_id, workSituatuon)
                              }
                                {data?.contract_type_id &&
                                  data?.contract_type_id.length > 0 &&
                                  data?.contract_type_id.map((element, i) => {
                                    return (
                                      element,
                                      workSituatuon.map(val =>
                                        val.id == data?.contract_type_id[i]
                                          ? i > 0
                                            ? ", " + val.title.toString()
                                            : val.title.toString()
                                          : ""
                                      )
                                    );
                                  })}
                              </li>
                            </ul>
                          </div>
                          <div className="box_list_right_data">
                            <ul>
                              <li className="b_name">Ideal work environment</li>
                              {data &&
                                data?.office_type_id.map(dataOffice => (
                                  <li className="b_name_data">
                                    {/* {data.office_type_id.toString()} */}
                                    {dataOffice}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </>
                      ) : (
                        "No record found"
                      )}
                    </div>
                    {data?.hours_time && data?.hours_time.length > 0 && (
                      <div className="box_list_info">
                        <div className="box_list_left_data">
                          <ul>
                            <li className="b_name">Availability</li>
                            <li className="b_name_data">
                              {data?.hours_time &&
                                data?.hours_time.length > 0 &&
                                data?.hours_time.map((element, i) => {
                                  return (
                                    element,
                                    availability.map(val =>
                                      val.id == data?.hours_time[i]
                                        ? i > 0
                                          ? ", " + val.title.toString()
                                          : val.title.toString()
                                        : ""
                                    )
                                  );
                                })}{" "}
                              {/* ,{" "} */}
                            </li>
                          </ul>
                        </div>
                        {/* <div className="box_list_right_data">
                            <ul>
                              <li className="b_name">Ideal commute distance</li>
                              <li className="b_name_data">20 KM or less</li>
                            </ul>
                          </div> */}
                      </div>
                    )}
                  </div>
                </div>
                {/*Preferences popup start  */}
               
                {/* Preferences popup end */}
                
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default IndividualProfileDetails;
