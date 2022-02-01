import React from "react";
import ProfileDisplay from "./ProfileDisplay";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Pagination } from "./pagination";

function Position({
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
  designationsValue,
  nextDisable
}) {
  const validationSchema = yup.object().shape({
    looking_for: yup.string().required("Please Select an Option")
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
      ...user
    }
  });

  return (
    <div className="item_main">
    {console.log("nextDisablenextDisable",nextDisable)
    }
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
                <h2 className="form_title">Actively Looking For a Position?</h2>
                <div className="role_box_wrap">
                  <div className="idel_form">
                    <div class="InputGroup">
                      <input
                        type="radio"
                        name="actively"
                        id="size_1"
                        value="Yes"
                        {...register("looking_for")}
                      />
                      <label for="size_1">Yes</label>

                      <input
                        type="radio"
                        name="actively"
                        id="size_2"
                        value="No"
                        {...register("looking_for")}
                      />
                      <label for="size_2">No</label>
                    </div>
                    <p style={{ color: "red" }}>
                      {" "}
                      {errors.looking_for
                        ? "Please select atleast one of above"
                        : ""}{" "}
                    </p>
                  </div>
                </div>
              </div>
              <Pagination
                data={user}
                activeStep={activeStep}
                steps={steps}
                handleReset={handleReset}
                handleSkip={handleSkip}
                handleBack={handleBack}
                nextDisable={nextDisable}
              />
            </form>
            <div className="slider_range">
           <div className="slider_in_percent" style={{width: "42%"}}></div>
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

export default Position;
