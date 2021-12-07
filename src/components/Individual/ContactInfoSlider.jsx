import React from "react";
import ProfileDisplay from "./ProfileDisplay";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Pagination } from "./pagination";

function ContactInfoSlider({
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
  // const validationSchema = yup.object().shape({});
  const validationSchema = yup.object().shape({
		email: yup.string().email("Invalid email format").required("Please enter email address."),
		password: yup
		.string()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			"Password must be 8 characters long with at least one uppercase letter, one special character and one number"
		),
    confirmpassword: yup.string()
     .oneOf([yup.ref('password'), null], "Password and confirm match doesn't match"),
     phone: yup.string().matches(/^\d{10}$/, {message: "Please enter valid number.", excludeEmptyString: false})
	})

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
                <h2 className="form_title">Your Contact Information:</h2>
                <div className="f_group">
                  <input
                    className="f_control"
                    type="text"
                    autoComplete="off"
                    placeholder="Email Address"
                    {...register("email")}
                  />
                  <p style={{color: 'red'}} > {errors.email ? errors.email.message : ""} </p>
                </div>
                <div className="f_group">
                  <input
                    className="f_control"
                    type="text"
                    autoComplete="off"
                    placeholder="Phone Number"
                    {...register("phone")}
                  />
                  <p style={{color: 'red'}} > {errors.phone ? errors.phone.message : ""} </p>
                </div>
                <div className="f_group">
                  <input
                    className="f_control"
                    type="username"
                    placeholder="Username"
                    autoComplete="off"
                    {...register("username")}
                  />
                </div>
                <div className="f_group">
                  <input
                    className="f_control"
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                    {...register("password")}
                  />
                  <p style={{color: 'red'}} > {errors.password ? errors.password.message : ""} </p>
                </div>
                <div className="f_group">
                  <input
                    className="f_control"
                    type="password"
                    placeholder="Confirm Password"
                    autoComplete="off"
                    {...register("confirmpassword")}
                  />
                   <p style={{color: 'red'}} > {errors.confirmpassword ? errors.confirmpassword.message : ""} </p>
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
           <div className="slider_in_percent" style={{width: "16%"}}></div>
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

export default ContactInfoSlider;
