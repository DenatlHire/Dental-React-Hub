import React, { useEffect, useState } from "react";
import { Link, Redirect,useParams } from "react-router-dom";
import nl2br from "react-newline-to-break";
import axios from "axios";

import profile_pic from "./../../images/clinic_profile.png";
import background_pic from "./../../images/profile_banner.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getDesignation,
  getavailability,
  getWorkSituation,
  getTypes,
  deleteImages
} from "../Service";

export default function ClinicProfileDetails(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState();
  const [designations, setDesignations] = useState([]);
  const [skill, setSkill] = useState([]);
  const [skillSelected, setSkillSelected] = useState([]);
  const [workSituatuon, setWorkSituatuon] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [officeType, setOfficeType] = useState([]);
  const [profile_file, setprofile_file] = useState();
  const [selectedOption, setselectedOption] = useState(0);
  const [banner_file, setbanner_file] = useState();
  const [activePopup, setAtivePopup] = useState();
  const [userSelectedSkill, setUserSelectedSkill] = useState([]);
  const { id } = useParams()
  const df_profile_photo = profile_pic;
  const df_banner_photo = background_pic;
  useEffect(() => {
    getDesignation().then(res => {
      setDesignations(res);
    });
      getSkills();
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


  // get skills
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
  const getSkills = () => {
    axios
    .get("/skillset-types",{params: {
      designation_id: selectedOption
      }}).then(response => {
        console.log("res", response);
        setSkill(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };
  // validations start

  const validationSchema = yup
    .object()
    .shape({})
    .when((values, schema) => {
      if (activePopup == 1) {
        return schema.shape({
          clinicname: yup.string().required("Please enter clinic name"),
          practice_type: yup.string().required("Please Select a Type"),
          officetype: yup
            .array()
            .of(yup.string())
            .min(1)
            .required("Please select anyone option")
        });
      }
      if (activePopup == 3) {
        return schema.shape({
          skillset_type_id: yup.array().min(1),
          designation_id: yup.string().required("Please select anyone role"),
          clinical_experience: yup
            .number()
            .typeError("Please enter a valid year")
            .min(0, "Please enter a valid year"),
          contract_type_id: yup
            .array()
            .required("Select atleast one option of your interest")
            .min(1),
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
    watch
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...data
    }
  });

  console.log("temp", errors);

  // validations end

  const [selectSkill, setSelectSkill] = useState(
    data?.skillset_type_id ? data?.skillset_type_id : []
  );

  const [selectedworkSituatuon, setSelectedworkSituatuon] = useState(
    data?.contract_type_id ? data?.contract_type_id : []
  );

  
  
  useEffect(() => {
    axios
      .get("user-informations", {
        params: {
          user_id: Buffer.from(id, 'base64').toString('ascii')
        }
      })
      .then(response => {
        // console.log("data", response.data);
        let userInfo = response.data[0];
        // localStorage.setItem("user-info", JSON.stringify(userInfo));
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
          setUserSelectedSkill(userInfo.skillset_type_id)
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
        userInfo.id = userInfo.id;
        userInfo.clinic_photos = userInfo.clinic_photos;
        userInfo.facebook_link = userInfo.facebook_link;
        userInfo.twitter_link = userInfo.twitter_link;
        userInfo.linkedin_link = userInfo.linkedin_link;
        setselectedOption(userInfo?.designation_id?.id);

        console.log("userInfo", userInfo.practice_type);
        setprofile_file(
          userInfo.profile_photo
            ? window.baseURL + userInfo.profile_photo.url
            : df_profile_photo
        );
        setbanner_file(
          userInfo.banner_photo
            ? window.baseURL + userInfo.banner_photo.url
            : df_banner_photo
        );
        setSelectedworkSituatuon(contract_type_id);
        setData(userInfo);
        // setUsetInfo(userInfo);
        setValue("practice_type", userInfo.practice_type);
        setValue("designation_id", userInfo.designation_id.id);
        setSelectSkill(skillset_type_id);
        setSelectedOfficeType(office_type_id);
        setSelectedhourTime(hours_time);
        setValue("skillset_type_id", userInfo.skillset_type_id);
        setValue("hours_time", userInfo.hours_time);
        setValue("officetype", userInfo.office_type_id);
        setValue("contract_type_id", contract_type_id);
      })
      .catch(error => {
        console.log("data", error);
      });
  }, []);



 



  const [selectedOfficeType, setSelectedOfficeType] = useState(
    data?.office_type_id ? data?.office_type_id : []
  );

  const [selectedhourTime, setSelectedhourTime] = useState(
    data?.hours_time ? data?.hours_time : []
  );

  

 
  return (
    <>
      {data && (
        <div className="in_user_wrap cli_profile_wrap">
          <div className="container">
            <div className="in_user_box">
              <div
                className="in_user_top"
                style={{ backgroundImage: `url("${banner_file}")` }}
              >
              <a class="msg-btn" href="#" title="Message"><i class="fa fa-comment" aria-hidden="true"></i> Message</a>
                {/* <div class="saved_icon">  </div> */}
                

                {/* <div className="thumbnail-container">
                  <div className="thumbnail">
                    <img
                      src={banner_file}
                    />
                  </div>
                </div> */}
              </div>
              <div className="user_bottom_sec">
                <div className="edit_in_dta">
                  
                </div>

                <div className="user_left_sec">
                  <div className="use_image">
                    <div className="prof_in_dta">
                      
                    </div>

                    <div className="thumbnail-container">
                      <div className="thumbnail">
                        <img src={profile_file} alt="" />
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
                  <h2 className="us_name">{data?.user_id.clinicname}</h2>
                  <ul className="user_role">
                    <li>
                      <span>Type:</span>
                      {data.practice_type}
                    </li>
                    <li>
                      <span>Location:</span>
                      {data.address}
                    </li>
                  </ul>
                  <div className="us_desc">
                    <p>{data.about}</p>
                  </div>
                  <div className="user_btn">
                    <ul>
                      {console.log(
                        "{data?.office_type_id",
                        data?.office_type_id
                      )}
                      {data?.office_type_id &&
                        data?.office_type_id.map(dataOffice => (
                          <li>
                            <p>{dataOffice}</p>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* part onr start */}
            
            {/* part one end */}
            <div className="exp_box_wrap">
              <div className="row">
                <div className="col-md-12 ind-col">
                  <div className="ex_box ex_ph_box">
                    <div className="ex_box_title">
                      <h2 className="ex_title">Photos</h2>
                    </div>

                    <div className="ex_photos">
                      <div className="ex_photos_wrap">
                        
                        {data.clinic_photos && data.clinic_photos.length > 0 ? (
                          data.clinic_photos.map(iamges => (
                            <div className="ex_photos_in">
                              <div className="thumbnail-container">
                                <div className="thumbnail">
                                  <img
                                    src={window.baseURL + iamges.url}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="ex_photos_in">
                           No photo available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* image popup start */}

                

                {/* image popup end */}

                <div className="col-12">
                  <h2 className="ex_title">Active Postings</h2>
                </div>

                <div className="col-md-6 ind-col">
                  <div className="ex_box">
                    
                    {(data?.skillset_type_id &&
                      data?.skillset_type_id.length > 0) ||
                    (data?.hours_time && data?.hours_time.length > 0) ? (
                      <>
                        <div className="ex_box_title">
                          <h2 className="ex_title">
                            {data?.designation_id?.name}
                          </h2>
                          <div className="box_right_data">
                            <span>{data.clinical_experience} Years</span>
                            <span className="ex_ttl">Experience Required</span>
                          </div>
                        </div>

                        {data?.skillset_type_id &&
                          data?.skillset_type_id.length > 0 && (
                            <div className="box_list_info">
                              <div className="skill_dta">
                                <h2 className="sk_tit">Skills Required</h2>
                                <ul>
                                  {/* <Link to="/#">{data.skillset_type_id}</Link> */}
                                  {data?.skillset_type_id &&
                                  data?.skillset_type_id.length > 0
                                    ? data?.skillset_type_id.map(
                                        (element, i) => {
                                          return (
                                            element,
                                            skillSelected.map(val =>
                                              val.id ==
                                              data?.skillset_type_id[i] ? (
                                                <li>
                                                  {" "}
                                                  <p>
                                                    {val.title}
                                                  </p>{" "}
                                                </li>
                                              ) : (
                                                ""
                                              )
                                            )
                                          );
                                        }
                                      )
                                    : "No record found"}
                                </ul>
                              </div>
                            </div>
                          )}
                        {data?.hours_time && data?.hours_time.length > 0 && (
                          <div className="box_list_info border-0 pt-0">
                            <div className="box_list_right_data">
                              <ul>
                                <li className="b_name_data">
                                  Availability Requirements
                                </li>
                                <li className="b_name">
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
                                </li>
                                <li className="b_name">
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
                          </div>
                        )}
                      </>
                    ) : (
                      "No record found"
                    )}
                  </div>
                  {/* here */}
                  
                  {/* end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
