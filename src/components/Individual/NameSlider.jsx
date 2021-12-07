import React from 'react';
import ProfileDisplay from "./ProfileDisplay";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Pagination } from "./pagination";

function NameSlider({
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
    firstname: yup.string().required("Please enter first name"),
    lastname: yup.string().required("Please enter last name"),
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
     ...user,
    },
  });


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
              <h2 className="form_title">What's Your Name?</h2>
              <div className="f_group">
                <input
                  className="f_control"
                  type="text"
                  placeholder="First Name"
                  {...register("firstname")}
                />
              </div>
              <p style={{color: 'red'}} > {errors.firstname ? errors.firstname.message : ""} </p>
              <div className="f_group">
                <input
                  className="f_control"
                  type="text"
                  placeholder="Last Name"
                  {...register("lastname")}
                />
              </div>
              <p style={{color: 'red'}} > {errors.lastname ? errors.lastname.message : ""} </p>
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
           <div className="slider_in_percent" style={{width: "8.33%"}}></div>
         </div>

        </div>
         
        

      </div>
      <ProfileDisplay
        data={user}
        workSituatuonValue = {workSituatuonValue}
        availabilityValue = {availabilityValue}
        skillValue = {skillValue}
        officeTypeValue = {officeTypeValue}
        designationsValue = {designationsValue}
      />
    </div>
  </div>
  );
}

export default NameSlider;