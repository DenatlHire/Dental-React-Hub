import React, { useEffect, useState } from "react";
import ProfileDisplay from "./ProfileDisplay";
import { Link, Redirect } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Pagination } from "./pagination";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import TextField from '@mui/material/TextField';
import { format } from "date-fns";

import moment from 'moment';

function WorkHistorySilder({
  activeStep,
  steps,
  handleReset,
  handleSkip,
  handleSubmitForm,
  handleBack,
  data,
  user,
  workSituatuonValue,
  availabilityValue,
  skillValue,
  officeTypeValue,
  designationsValue
}) {
  const validationSchema = yup.object().shape({
    job_exp: yup.array().of(
      yup.object().shape({
        job_title: yup.string().required("Job title is required"),
        place_work: yup.string().required("Work place required"),
        start_date: yup.string("Please select a date").required("Please select a date").default(format(new Date(),"yyyy-MM-dd")),
        end_date: yup.string("Please select a date").required("Please select a date").default(format(new Date(),"yyyy-MM-dd")),
      })
    )
  });
  const [endvalue, setEndValue] = React.useState('mm/yyyy');
  const [startvalue, setStartValue] = React.useState('mm/yyyy');
  const [dateLimit, setDateLimit] = useState([])

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    register,
    watch,
    control,
    getValues
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...user,
    },
  });
  console.log("temp", errors);
  const [jobFields, setjobFields] = useState(
    user.job_exp ? user.job_exp :
      [{
        job_title: "",
        place_work: "",
        start_date: format(new Date(),"yyyy-MM-dd"),
        end_date: format(new Date(),"yyyy-MM-dd")
      }]
  );

  const addJob = e => {
    jobFields.push({
      job_title: "",
      place_work: "",
      start_date: format(new Date(),"yyyy-MM-dd"),
      end_date: format(new Date(),"yyyy-MM-dd")
    })
    setjobFields([...jobFields]);
    console.log("edu", jobFields);

  };

  const deleteField = i => {
    let formValue = getValues()
    let educationValue = getValues('job_exp');
    jobFields.splice(i, 1);
    educationValue.splice(i, 1);
    console.log(educationValue)
    setjobFields([...jobFields]);
    setValue('job_exp', educationValue);
    console.log(getValues())
  };

  const handleStartDate = (e,i) => {
    console.log("e.target.value =>",e.target.value);
    
    let startDates = [...dateLimit]
    startDates[i] = e.target.value
    setDateLimit(startDates)
  }

  // const [count, setCount] = useState(user?.job_exp?.length > 0 ? user.job_exp.length : 1);

  return (
    <div className="item_main">
      <div className="item_in_info">
        <div className="item_left_info">
          <div className="item_logo">
            <Link className="navbar-brand" to="/">
              <img
                src="/assets/img/brands/login_logo.png"
                className="navbar-brand-img"
                alt="..."
              />
            </Link>
          </div>

          <div className="item_form">
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <div className="item_form_wrap">
                <h2 className="form_title">Your Work Experience:</h2>

                <div className="educationSection">
                  {jobFields !== null
                    ? jobFields.length > 0 &&
                    jobFields.map((element, i) => (
                      <>
                      {i > 0 && (
                        <div className="divider-line"></div>
                      )}
                      <div key={i}>
                        <div className="row work_row">
                          <div className="col-sm-6">
                            <div className="f_group">
                              <input
                                className="f_control"
                                type="text"
                                placeholder="Job Title (Most Recent)"
                                {...register(`job_exp[${i}].job_title`)}
                              />
                              
                            {errors && errors.job_exp && <p style={{ color: 'red' }} > {errors?.job_exp[i]?.job_title ? errors?.job_exp[i]?.job_title.message : ""} </p>}
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="f_group">
                              <input
                                className="f_control"
                                type="text"
                                placeholder="Place of Work"
                                {...register(`job_exp[${i}].place_work`)}
                              />
                              
                            {errors && errors.job_exp && <p style={{ color: 'red' }} > {errors?.job_exp[i]?.place_work ? errors?.job_exp[i]?.place_work.message : ""} </p>}
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="f_group">
                            <label>Start Date</label>
                              <input
                                className="f_control"
                                type="date"
                                placeholder="mm/yyyy"
                                name="startdate"
                                onChange={(e) => {
                                  setValue(
                                      `job_exp[${i}].start_date`,
                                      e.target.value
                                    );
                                    // setDateLimit()
                                    handleStartDate(e,i)
                                }}
                                defaultValue ={  user?.job_exp && user?.job_exp[i]?.start_date ?
                                 user?.job_exp && format(new Date(user?.job_exp[i]?.start_date),"yyyy-MM-dd") : 
                                 format(new Date(),"yyyy-MM-dd") }
                              />
                            </div>
                            {errors && errors.job_exp && <p style={{ color: 'red' }} > {errors?.job_exp[i]?.start_date ? errors?.job_exp[i]?.start_date.message : ""} </p>}

                          </div>

                          <div className="col-sm-6">
                            <div className="f_group">
                            <label>End Date</label>
                              <input
                                className="f_control"
                                type="date"
                                placeholder="mm/yyyy"
                                name="endvalue"
                                onChange={(e) => {
                                  setValue(
                                      `job_exp[${i}].end_date`,
                                      e.target.value
                                    );
                                }}
                                min={dateLimit[i]}
                                defaultValue ={  user?.job_exp && user?.job_exp[i]?.end_date ?
                                 user?.job_exp && format(new Date(user?.job_exp[i]?.end_date),"yyyy-MM-dd"): 
                                 format(new Date(),"yyyy-MM-dd")}
                              />
                             {errors && errors.job_exp && <p style={{ color: 'red' }} > {errors?.job_exp[i]?.end_date ? errors?.job_exp[i]?.end_date.message : ""} </p>}
                            </div>

                          </div>
                        </div>
                        {i > 0 &&<p onClick={() => deleteField(i)} className="addedu"> - Remove Field</p>}
                      </div>
                      </>
                    ))
                    : []}
                </div>
                <p className="addedu" onClick={addJob}> + Add Experience</p>
                {/* <p onClick={() => setCount(count + 1)}> + Add Experience</p> */}
              </div>
              <Pagination
                activeStep={activeStep}
                steps={steps}
                handleReset={handleReset}
                handleSkip={handleSkip}
                handleBack={handleBack}
              />
            </form>
            <div className="slider_range">
           <div className="slider_in_percent" style={{width: "58%"}}></div>
         </div>
          </div>
        </div>
        <ProfileDisplay
          data={user}
          workSituatuonValue={workSituatuonValue}
          availabilityValue={availabilityValue}
          skillValue={skillValue}
          officeTypeValue={officeTypeValue}
          designationsValue={designationsValue}
        />
      </div>
    </div>
  );
}

export default WorkHistorySilder;
