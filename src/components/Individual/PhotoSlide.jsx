import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Pagination } from "./pagination";
import ProfileDisplay from "./ProfileDisplay";
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
  const validationSchema = yup.object().shape({});

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

  const df_banner_photo = "/uploads/background.jpg";
  const [banner_file, setbanner_file] = useState(null)
  const [banner_photo, setbanner_photo] = useState(window.baseURL + df_banner_photo)
  var formData = new FormData();
 const handleImages = async (event) => {
        console.log("photo",event.target.files);
        const files = event.target.files;
        let filesValue = []; 
        for (let i = 0; i < files.length; i++) {
            filesValue.push(files[i])
            setValue('profile_photo',filesValue)
        }
              
}
const handleSkipForm = () =>{

}
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
                <h2 className="form_title">Upload a Photos of Yourself.</h2>

                <div class="fileUpload">
                {/* <img className="up_img" src={banner_photo} 
                alt={name}
                 /> */}
                 {console.log("banner",banner_file)
                 }
                        <input
                            className="file-upload"
                            name="bannerimage"
                            id="bannerimage"
                            type="file"
                            accept="image/*"
                            onChange={handleImages}
                        />
                  <span>
                    <i className="fa fa-plus"></i>
                  </span>
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
           <div className="slider_in_percent" style={{width: "100%"}}></div>
         </div>
          </div>
        </div>
        <ProfileDisplay data={user} 
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
