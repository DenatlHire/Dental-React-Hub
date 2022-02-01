import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Pagination } from "./pagination";
import ProfileDisplay from "./ProfileDisplay";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Message from "../Clinic/Message";

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
  designationsValue,
  success,
  error,
  nextDisable
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
  const [newImages, setnewImages] = useState([]);
  const [newImagesPreview, setnewImagesPreview] = useState([]);
  const [banner_photo, setbanner_photo] = useState(window.baseURL + df_banner_photo)
  var formData = new FormData();
 

  const handleImages = async (event) => {
    console.log("photo", event.target.files);
    const files = event.target.files;
    let filesValue = newImages;
    // for (let i = 0; i < files.length; i++) {
    //   filesValue.push(files[i])
    //   setnewImages([filesValue])
    //   setValue('profile_photo',filesValue)
    //   const fileReader = new FileReader();
    //   fileReader.readAsDataURL(files[i])
    //   fileReader.onload = () => {
    //     newImagesPreview.push(fileReader.result)
    //     setnewImagesPreview([newImagesPreview]);
    //   }
    //   // setnewImagesPreview(filesValue)
    //   // setValue('clinicPhoto',filesValue)
    // }
    console.log("files",files[0]);
    
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0])
      fileReader.onload = () => {
        // newImagesPreview.push(fileReader.result)
        setnewImagesPreview([fileReader.result]);
        console.log("files",newImagesPreview);
      }
    setValue('profile_photo',files)
  }


  const removePreview = (iamges,i)=>{
    let imagePreviewData = newImagesPreview;
    imagePreviewData.splice(i, 1);
    setnewImagesPreview([...imagePreviewData])
    let imageData = newImages;
    imageData.splice(i, 1);
    setnewImages([...imageData])
    setValue("clinicPhoto", imageData);
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
                <div className="fil_slide_wrap">
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
                <div className="ex_photos">
                      <div className="ex_photos_wrap">
                        {newImagesPreview && newImagesPreview.length > 0 &&
                          newImagesPreview.map((iamges,i) => (
                            <div className="ex_photos_in">
                              <div className="thumbnail-container">
                                <div className="thumbnail">
                                  <img
                                    src={iamges}
                                    alt="photos"
                                  />
                                  <div className="removeImage" onClick={() => { removePreview(iamges, i) }} style={{position:'absolute'}}> <i className="fa fa-remove"></i> </div>

                                </div>
                              </div>
                            </div>
                          ))
                        }

                      </div>
                    </div>
                    </div>
              </div>
              <Pagination
                activeStep={activeStep}
                steps={steps}
                handleReset={handleReset}
                handleSkip={handleSkip}
                handleBack={handleBack}
                nextDisable={nextDisable}
              />
            </form>
            <div className="slider_range">
           <div className="slider_in_percent" style={{width: "100%"}}></div>
         </div>
          </div>
          {success ?    <Message message={"Registered Successfully"} messageType={"success"} /> : ''}
        {/* {error ?  <Message message={"An error occured"} messageType={"error"} /> : ''} */}
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
