import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Pagination } from "./pagination";
import ClinicProfileDisplay from "./ClinicProfileDisplay";
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
    practice_type: yup.string().required("Please Select a Type")
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
                <h2 className="form_title">
                  Are You a General or <br />
                  Specialist Practice?
                </h2>

              <div className="idel_form">
                  <div class="InputGroup">
										<input type="radio" 
										name="size"
										id="size_1"
										value="General" 
										{...register("practice_type")} 
										/>
                    <label for="size_1">General</label>

                    <input
                      type="radio"
                      name="size"
                      id="size_2"
											value="Specialist"
											{...register("practice_type")}
                    />
                    <label for="size_2">Specialist</label>
                  </div>
                  </div>
                  <p style={{color: 'red'}} > {errors.practice_type ? "Please select anyone option" : ""} </p>
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
           <div className="slider_in_percent" style={{width: "36%"}}></div>
         </div>
          </div>
        </div>
        <ClinicProfileDisplay data={user}
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
