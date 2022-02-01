import React, { useEffect, useState } from "react";
import ProfileDisplay from "./ProfileDisplay";
import { Link, Redirect } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Pagination } from "./pagination";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import "react-datepicker/dist/react-datepicker.css";
import styled, { css } from "styled-components";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import moment from "moment";
import { format } from "date-fns";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";

function EducationSilder({
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
    education: yup.array().of(
      yup.object().shape({
        degree: yup.string().required("Degree required"),
        institute: yup.string().required("institute required"),
        year_graduation: yup.string("Please select a date").required("Please select a date").default(format(
          new Date(),
          "yyyy-MM-dd"
        ))
      })
    )
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endvalue, setEndValue] = React.useState('select date');


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
  const [eduFields, seteduFields] = useState(
   user.education ? user.education : 
    [{
      degree: "",
      institute: "",
      year_graduation: format(
        new Date(),
        "yyyy-MM-dd"
      )
    }]
  );

  const StyledInput = styled.input.attrs(props => ({
    autoComplete: "off",
    autoFocus: false
    // errors: props.errors
  }))`
    background-clip: padding-box;
    background-color: #fff;
    border: 1px solid #c4cacf;
    border-radius: 0.25rem;
    box-sizing: border-box;
    display: block;
    font-size: 1rem;
    height: 3rem;
    line-height: 1.5;
    padding: 0.5rem 1rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    width: 100%;

    &:focus {
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      color: #9da7af;
      outline: 0;
    }

    ::-webkit-input-placeholder {
      color: #c0c0c0;
    }

    :-ms-input-placeholder {
      color: #c0c0c0;
    }

    :-moz-placeholder {
      color: #c0c0c0;
      opacity: 1;
    }

    ${({ errors }) =>
      Object.keys(errors).length !== 0 &&
      errors &&
      css`
        background: rgb(251, 236, 242);
        border-color: rgb(191, 22, 80) rgb(191, 22, 80) rgb(191, 22, 80)
          rgb(236, 89, 144);
        border-image: initial;
        border-style: solid;
        border-width: 1px 1px 1px 10px;
      `}
  `;
  const [count, setCount] = useState(
    user?.education?.length > 0 ? user.education.length : 1
  );

  // const addEdu = () => {
  //   setCount(count + 1);
  // };

  const addEdu = e => {
    eduFields.push( {
      degree: "",
      institute: "",
      year_graduation: format(
        new Date(),
        "yyyy-MM-dd"
      )
    })
    seteduFields([...eduFields]);
    console.log("edu",eduFields);
    
  };

  const deleteField = i => {
    let formValue = getValues()
    let educationValue = getValues('education');
    eduFields.splice(i, 1);
    educationValue.splice(i, 1);
    console.log(eduFields)
    seteduFields([...eduFields]);
    setValue('education',educationValue);
    console.log(getValues())
  };

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
                <h2 className="form_title">Your Educational History:</h2>
                <div className="educationSection">
                  {eduFields !== null
                    ? eduFields.length > 0 &&
                      eduFields.map((element, i) => (
                        <>
                        {i > 0 && (
                          <div className="divider-line"></div>
                        )}
                        <div key={i}>
                          <div className="f_group">
                            <input
                              className="f_control"
                              type="text"
                              placeholder="Degree/Diploma"
                              {...register(`education[${i}].degree`)}
                            />
                             { errors && errors.education && <p style={{color: 'red'}} > {errors?.education[i]?.degree ? errors?.education[i]?.degree.message : ""} </p>}   
                          </div>

                          <div className="f_group">
                            <input
                              className="f_control"
                              type="text"
                              // name={`education[${i}].institute`}
                              placeholder="Institution"
                              {...register(`education[${i}].institute`)}
                            />
                            { errors && errors.education && <p style={{color: 'red'}} > {errors?.education[i]?.institute ? errors?.education[i]?.institute.message : ""} </p>}
                          </div>

                          <div className="f_group p_relative">
                          <label>Year of Graduation</label>
                             <input
                             label="Year of graduation"
                                className="f_control"
                                type="date"
                                //placeholder="Year of graduation"
                                // name={`education[${i}].year_graduation`}
                                {...register(`education[${i}].year_graduation`)}
                                onChange={(e) => {
                                  console.log('e',e.target.value)
                                  setValue(
                                      `education[${i}].year_graduation`,
                                      e.target.value
                                    );
                                }}
                                // defaultValue ={format(new Date(),"yyyy-MM-dd")}
                                defaultValue ={
                                  user?.education && user?.education[i]?.year_graduation ?
                                  format(new Date(user?.education[i]?.year_graduation),"yyyy-MM-dd"): 
                                  format(new Date(),"yyyy-MM-dd")
                                }
                              />
                            { errors && errors.education && <p style={{color: 'red'}} > {errors?.education[i]?.year_graduation ? errors?.education[i]?.year_graduation.message : ""} </p>}                        
                          </div>
                          {i > 0 &&<p onClick={() => deleteField(i)} className="addedu"> - Remove Field</p>}
                        </div>
                        </>
                      ))
                    : []}
                </div>
                <p className="addedu" onClick={addEdu}> + Add Education</p>
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
           <div className="slider_in_percent" style={{width: "50%"}}></div>
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

export default EducationSilder;
