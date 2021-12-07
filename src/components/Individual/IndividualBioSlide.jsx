import React from "react";
import { Link, Redirect } from "react-router-dom";
import {Pagination} from "./pagination";
import  ProfileDisplay   from "./ProfileDisplay";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

function IndividualBioSlide({
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
    // about: yup.string().required("Please Select an Option"),
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
                <h2 className="form_title">Tell Us About Yourself.</h2>
                <div className="f_group">
                  <textarea
                    className="f_control"
                    type="text"
                    placeholder="Write a bio"
                    {...register("about")}
                  />
                </div>
                <p style={{color: 'red'}} > {errors.about ? "Please write something about yourself." : ""} </p>
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
           <div className="slider_in_percent" style={{width: "92%"}}></div>
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

export default IndividualBioSlide;
