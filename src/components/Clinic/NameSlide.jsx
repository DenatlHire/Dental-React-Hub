import React from "react";
import { Link, Redirect } from "react-router-dom";
import {Pagination} from "./pagination";
import  ClinicProfileDisplay   from "./ClinicProfileDisplay";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

function NameSlide({
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
    clinicname: yup.string().required("Please enter clinic name"),
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
                <h2 className="form_title">What is Your Clinic's Name?</h2>
                <div className="f_group">
                  <input
                    className="f_control"
                    type="text"
                    placeholder="Clinic Name"
                    error={!!errors.clinicname}
                    {...register("clinicname")}
                  />
                  <p style={{color: 'red'}} > {errors.clinicname ? errors.clinicname.message : ""} </p>
                </div>
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
           <div className="slider_in_percent" style={{width: "9%"}}></div>
         </div>
        </div>
      </div>
      <ClinicProfileDisplay
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

export default NameSlide;
