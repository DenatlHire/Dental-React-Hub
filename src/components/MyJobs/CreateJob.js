import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-google-places-autocomplete";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getDesignation,
  getavailability,
  getSkills,
  getWorkSituation,
  setAddJob
} from "../Service";
import moment from "moment";
import { clinicJob } from "../FilterService"

export default function CreateJob() {

  const [data, setData] = useState();
  const [designations, setDesignations] = useState();
  const [selectedOption, setselectedOption] = useState();
  const [availability, setAvailability] = useState([]);
  const [skill, setSkill] = useState([]);
  const [workSituatuon, setWorkSituatuon] = useState([]);
  const [usetInfo, setUsetInfo] = useState([]);
  const [selectSkill, setSelectSkill] = useState([]);
  const [selectedworkSituatuon, setSelectedworkSituatuon] = useState([]);
  const [selectedhourTime, setSelectedhourTime] = useState([]);
  const [user, setUser] = useState([]);
  const [dateLimit, setDateLimit] = useState()
  const history = useHistory();
  const storegUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getDesignation().then(res => {
      setDesignations(res);
    });
    getavailability().then(res => {
      setAvailability(res);
    });
    // getSkills().then(res => {
    //   setSkill(res);
    // });
    getWorkSituation().then(res => {
      setWorkSituatuon(res);
    });
  }, []);

  useEffect(() => {
    getdesSkills()
  }, [selectedOption])

  const getdesSkills = () => {
    axios
      .get("/skillset-types", {
        params: {
          designation_id: selectedOption
        }
      })
      .then(response => {
        console.log("res", response);
        setSkill(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  // yup validations

  const validationSchema = yup.object().shape({
    designation_id: yup.string().required("Please select anyone role"),
    skillset_type_id: yup.array().min(1),
    clinical_experience: yup
      .number()
      .typeError("Please enter a valid year")
      .min(0, "Please enter a valid year"),
    hours_time: yup
      .array()
      .required("Select atleast one option of your interest")
      .min(1),
    address: yup.string().required("Please select a valid address."),
    job_title: yup.string().required("Please enter a job title."),
    start_date: yup.string().required("Please select a date"),
    // description: yup.string().required("Please enter description."), 
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
      //  ...data,
    }
  });

  console.log("temp", errors);

  // Data set

  const onSiteChanged = e => {
    setUsetInfo({ ...usetInfo, designation_id: e.currentTarget.value });
    setselectedOption(e.currentTarget.value);
    setValue("designation_id", e.currentTarget.value);
    console.log("designation_id", e.currentTarget.value);
  };

  const handleSelectSkill = e => {
    let selectedValue = selectSkill;
    console.log("event.target.checked;", selectedValue);
    console.log("event.target.value", e.target.value);
    if (e.target.checked) {
      selectedValue.push(e.target.value);
      console.log("selectSkill", selectedValue);
      setSelectSkill([...selectedValue]);
      setValue("skillset_type_id", selectedValue);
    } else {
      const index = selectedValue.indexOf(e.target.value);
      if (index > -1) {
        selectedValue.splice(index, 1);
        console.log("event.target.value", selectedValue.splice(index, 1));
        setSelectSkill([...selectedValue]);
        setValue("skillset_type_id", selectedValue);
      }
    }
  };

  const locationChange = data => {
    console.log(data);
    if (data) {
      setValue('address', data.label)
      geocodeByAddress(data.label)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          // setData({ ...data, latitude: lat, longitude: lng })
          setValue("latitude", lat)
          setValue("longitude", lng)
        });
    } else {
      setValue('address', '')
      setValue("latitude", '')
      setValue("longitude", '')
    }
  };

  const handleUserInput = e => {
    console.log("data", e.target.name, e.target.value);

    const name = e.target.name;
    const value = e.target.value;
    setUsetInfo({ ...usetInfo, [name]: value });
    console.log(
      "e.target.name = e.target.value",
      e.target.name,
      e.target.value
    );

    if (e.target.name == "practice_type") {
      setValue("practice_type", e.target.value);
    }
  };

  const handleSelectSituation = e => {
    let selectedValue = selectedworkSituatuon;
    console.log("event.target.checked;", e.target.checked);
    console.log("event.target.value", e.target.value);
    if (e.target.checked) {
      selectedValue.push(e.target.value);
      setSelectedworkSituatuon([...selectedValue]);
      setValue("contract_type_id", selectedValue);
    } else {
      const index = selectedValue.indexOf(e.target.value);

      if (index > -1) {
        console.log("index", index);
        selectedValue.splice(index, 1);
        console.log("event.target.value.selectedValue", selectedValue);
        setSelectedworkSituatuon([...selectedValue]);
        console.log("selectedValueppppp", selectedValue);
        setValue("contract_type_id", selectedValue);
      }
    }
  };

  const handleSelectTime = e => {
    let selectedValue = selectedhourTime;
    console.log("event.target.checked;", e.target.checked);
    console.log("event.target.value", e.target.value);
    if (e.target.checked) {
      selectedValue.push(e.target.value);
      setSelectedhourTime([...selectedValue]);
      setValue("hours_time", selectedValue);
      console.log("selectedValue_hour", selectedValue);
    } else {
      const index = selectedValue.indexOf(e.target.value);
      if (index > -1) {
        selectedValue.splice(index, 1);
        setSelectedhourTime([...selectedValue]);
        setValue("hours_time", selectedValue);
        console.log("selectedValue_hour", selectedValue);
      }
    }
  };

  // setting end date
  const handleStartDate = (e) => {
    console.log("e.target.value =>", e.target.value);

    // let startDates = [...dateLimit]
    // startDates[i] = e.target.value
    setDateLimit(e.target.value)
  }

  // Data Submit

  const handleSubmitForm = getdata => {
    setUser(getdata);
    console.log("user", getdata);
    setAddJob({
      job_title: getdata.job_title,
      roles: getdata.designation_id,
      experience: getdata.clinical_experience,
      latitude: getdata.latitude.toString(),
      longitude: getdata.longitude.toString(),
      address: getdata.address,
      skills: getdata.skillset_type_id.toString(),
      skillset_type_id: getdata.skillset_type_id,
      user_id: storegUser.id,
      availability: getdata.hours_time.toString(),
      start_date: getdata.start_date,
      description: getdata.description
    })
      .then(async (data) => {
        console.log("success");
        console.log('--->')
        await clinicJob(getdata.hours_time.toString(), getdata.designation_id, getdata.skillset_type_id.toString(), getdata.clinical_experience.toString()).then(res => {
          console.log('--->')
          history.push("/myjobs");
        }).catch(err => {
          history.push("/myjobs");
        })
      })
      .catch(errors => {
        console.log("error", errors);
      });
  };

  return (
    <div className="in_user_wrap create_job_listing">
      <div className="container">

        <div class="baner-search-box banner-search-job p-6"><div class="row align-items-center">
          <div class="col-sm-12">
            <h2 class="serch_title">Create Job</h2>
          </div>
        </div>
        </div>

        <div className="item_main">
          <div className="card-body p-0 main_overlay_info_data main_overlay_info_data_page">
            <div className="main_over_poup">
              <div className="item_main">
                <div className="item_in_info">
                  <div className="item_left_info" style={{ width: "100%" }}>

                    <div className="item_form">

                      <div class="search_result_wrap">
                        <div class="container">

                          <div class="in_result_box">

                            <div class="result_bottom_sec">

                              <form
                                style={{ mexHeight: "unset" }}
                                onSubmit={handleSubmit(handleSubmitForm)}
                              >

                                <div className="f_group p_relative">

                                </div>

                                <div className="row">


                                  <div className="col-md-6">
                                    <div className="f_group p_relative">
                                      <h2 className="form_title mt-5">
                                        Job Title
                                      </h2>
                                      <input
                                        className="f_control"
                                        type="text"
                                        placeholder="Job Title"
                                        {...register("job_title")}
                                      />
                                      {errors && errors.job_title && <p style={{ color: 'red' }} > {errors?.job_title ? errors?.job_title.message : ""} </p>}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                        <div className="f_group p_relative">
                                          <h2 className="form_title mt-5" style={{ fontSize: "16px" }}>
                                            Start Date
                                          </h2>
                                          <input
                                            className="f_control"
                                            type="date"
                                            placeholder="mm/yyyy"
                                            // name={"start_date"}
                                            onChange={(e) => {
                                              setValue(
                                                `start_date`,
                                                moment(e.target.value).toISOString()
                                              );
                                              handleStartDate(e)
                                            }}
                                            defaultValue={
                                              moment(new Date("start_date")).toISOString()
                                            }
                                          />
                                          {errors && errors.start_date && <p style={{ color: 'red' }} > {errors?.start_date ? errors?.start_date.message : ""} </p>}
                                        </div>
                                  </div>
                                 
                                </div>







                                <h2 className="form_title mt-4">What is Your Role?</h2>
                                <div className="role_box_wrap">
                                  {console.log("check ==>", selectedOption)}
                                  {designations?.map((role, i) => (
                                    <div
                                      className={`role_box_list ${selectedOption == role.id ? "active" : ""
                                        }`}
                                    >
                                      <label className="role_box_list_data">
                                        <input
                                          type="radio"
                                          name="role"
                                          hidden
                                          {...register("designation_id")}
                                          value={role.id}
                                          onChange={onSiteChanged}
                                        />
                                        <img
                                          src={
                                            axios.defaults.baseURL + role.image.url
                                          }
                                          alt={role.alternativeText}
                                        />
                                        <span className="role_name">{role.name}</span>
                                      </label>
                                    </div>
                                  ))}
                                  <p style={{ color: "red", "margin-left": "10px" }}>
                                    {" "}
                                    {errors.designation_id
                                      ? "Please select anyone role"
                                      : ""}{" "}
                                  </p>
                                </div>

                                <h2 className="form_title mt-5">
                                  What Skills are You Looking For?
                                </h2>

                                <input
                                  type="hidden"
                                  id="userinfoid"
                                  name="userinfoid"
                                />

                                <div className="row">
                                  <div className="skill_wrap col-12">
                                    <ul className="skill_dta">
                                      {selectedOption ?

                                        skill?.map((skill, i) => (
                                          <li
                                            className={`${selectSkill &&
                                                selectSkill.find(
                                                  element => element == skill.id
                                                )
                                                ? "active"
                                                : ""
                                              }`}
                                          >
                                            <label>
                                              <input
                                                type="checkbox"
                                                hidden
                                                value={skill.id}
                                                {...register("skillset_type_id")}
                                                onChange={e => {
                                                  handleSelectSkill(e);
                                                }}
                                                checked={
                                                  selectSkill &&
                                                    selectSkill.find(
                                                      element => element == skill.id
                                                    )
                                                    ? true
                                                    : false
                                                }
                                              />
                                              {skill.title}
                                            </label>
                                          </li>
                                        )) : <li class="rolefirst">Please Select Role First</li>}
                                    </ul>
                                    <p style={{ color: "red" }}>
                                      {" "}
                                      {errors.skillset_type_id
                                        ? "Select atleast one option of your interest"
                                        : ""}{" "}
                                    </p>
                                  </div>
                                </div>
                                <div className="f_group p_relative">
                                  <h2 className="form_title mt-5" style={{ fontSize: "16px" }}>
                                    Description
                                  </h2>
                                  <textarea
                                    className="f_control"
                                    type="text"
                                    placeholder="Description"
                                    {...register("description")}
                                  />
                                  {errors && errors.description && <p style={{ color: 'red' }} > {errors?.description ? errors?.description.message : ""} </p>}
                                </div>
                                <div className="row">
                                  <div className="item_form_wrap col-12">
                                    <h2 className="form_title">
                                      Where are You Located?
                                    </h2>
                                    {/* <div className="f_group p_relative m_relative">
                                <GooglePlacesAutocomplete
                                  placeholder="Enter a Location"
                                  apiKey={
                                    "AIzaSyC_jsl4AwbLyzmnmKAh5puxKPqVlh9eN7I"
                                  }
                                  // defaultValue={data.address}
                                  selectProps={{
                                    Location,
                                    onChange: locationChange
                                  }}
                                />
                                <i className="fa fa-map-marker"></i>
                                <p style={{color: 'red'}} > {errors.address ? errors.address.message : ""} </p>
                              </div> */}
                                    <div className="f_group p_relative marker-location">
                                      <GooglePlacesAutocomplete
                                        apiKey={
                                          "AIzaSyC_jsl4AwbLyzmnmKAh5puxKPqVlh9eN7I"
                                        }
                                        selectProps={{
                                          Location,
                                          onChange: locationChange,
                                          isClearable: true,
                                        }}
                                        error={!!errors.address}
                                      />
                                      <i className="fa fa-map-marker marker-location-icon"></i>
                                    </div>
                                    <p style={{ color: "red" }}>
                                      {" "}
                                      {errors.address
                                        ? errors.address.message
                                        : ""}{" "}
                                    </p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="item_form_wrap col-12">
                                    <h2 className="form_title">
                                      Years of Experience Required:
                                    </h2>
                                    <label>Enter a specific amount or a range.</label>

                                    <div className="f_group km_group">
                                      <input
                                        className="f_control"
                                        type="number"
                                        {...register("clinical_experience")}
                                        onChange={e => handleUserInput(e)}
                                        name="clinical_experience"
                                        min="0"
                                      />
                                      <label>Years</label>
                                    </div>
                                    <p style={{ color: "red" }}>
                                      {" "}
                                      {errors.clinical_experience
                                        ? errors.clinical_experience.message
                                        : ""}{" "}
                                    </p>
                                  </div>
                                </div>
                                <div className="item_form_wrap">
                                  <div className="skill_wrap">
                                    <label>Candidate Availability:</label>
                                    <ul>
                                      {availability?.map((ave, i) => (
                                        <li
                                          className={`${selectedhourTime &&
                                              selectedhourTime.find(
                                                element => element == ave.id
                                              )
                                              ? "active"
                                              : ""
                                            }`}
                                        >
                                          <label>
                                            <input
                                              type="checkbox"
                                              {...register("hours_time")}
                                              onChange={e => {
                                                handleSelectTime(e);
                                              }}
                                              hidden
                                              value={ave.id}
                                              checked={
                                                selectedhourTime &&
                                                  selectedhourTime.find(
                                                    element => element == ave.id
                                                  )
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {ave.title}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                    <p style={{ color: "red" }}>
                                      {" "}
                                      {errors.hours_time
                                        ? "Select atleast one option of your interest"
                                        : ""}{" "}
                                    </p>
                                  </div>
                                  <div className="row">
                                    <div className="col-12 d-flex justify-content-center">
                                      <button
                                        className="theme_btn_default"
                                        type="submit"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>

                            </div></div></div></div>


                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
