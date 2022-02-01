import React,{useState} from "react";
import ClinicProfileDisplay from "./ClinicProfileDisplay";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Pagination } from "./pagination";
import axios from "axios";

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
     phone: yup.string().required("Please enter valid number.").min(14,"Please enter valid number.").max(16,"Please enter valid number.")
    // phone: yup.string().required("Please enter valid number.")
  })
  
  const handlePhoneChange = (e) => {
		const value = e.target.value
			.replace(/-/g, "")
			.split("")
			.filter((x) => new RegExp(/[0-9]/g).test(x))
			.slice(0, 10);
		let output = "";
		for (var i = 0; i < value.length; i++) {

      if(i === 0 ){
        output += "(";
      }

      if(i === 3 ){
        output += ")";
      }

			if (i === 3 || i == 6) {
				output += "-";
			}
			output += value[i];
		}

		setValue("phone", output, { shouldTouch: true, shouldValidate: true });
	};
  const [emailError,setEmailError] = useState("")
  const [nextDisable,setnextDisable] = useState(false)

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

  const onEmailChaneg = (e) => {
    setValue('email',e.target.value)
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (filter.test(e.target.value)) {
          axios
          .get("/users",{params: {
            email: e.target.value
            }}).then(response => {
              console.log("res", response.data.length);
              // setSkill(response.data);
              if(response.data.length > 0){
              console.log("res", response.data.length);
              console.log("ininin");
                setEmailError("Email already exists, please try another one.")
                setnextDisable(true)
              }else{
                setEmailError(" ")
                setnextDisable(false)
              }
            })
            .catch(function(error) {
              // handle error
              console.log(error);
            });
            return false;
        }else{
          setEmailError("Invalid email format")
          setnextDisable(false)

        }
  
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
                <h2 className="form_title">Your Contact Information:</h2>
                <div className="f_group">
                  <input
                    className="f_control"
                    type="text"
                    placeholder="Email Address"
                    {...register("email")}
                    onChange={(e)=> onEmailChaneg(e)}
                  />
                  {emailError == false && errors?.email?.message !== "Invalid email format"  ? 
                       <p style={{color: 'red'}} > {errors.email ? errors.email.message : ""} </p> :  ""}
                  <p style={{color: 'red'}} > {emailError ? emailError : ""} </p>
                </div>
                <div className="f_group">
                  <input
                    className="f_control"
                    type="text"
                    autoComplete="off"
                    placeholder="Phone Number"
                    {...register("phone")}
                    onChange={handlePhoneChange}
                  />
                  <p style={{color: 'red'}} > {errors.phone ? errors.phone.message : ""} </p>
                </div>
                <div className="f_group">
                  <input
                    className="f_control"
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                  />
                  <p style={{color: 'red'}} > {errors.password ? errors.password.message : ""} </p>
                </div>
                <div className="f_group">
                  <input
                    className="f_control"
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmpassword")}
                  />
                   <p style={{color: 'red'}} > {errors.confirmpassword ? errors.confirmpassword.message : ""} </p>
                </div>
              </div>
              <Pagination
                nextDisable={nextDisable}
                activeStep={activeStep}
                steps={steps}
                handleReset={handleReset}
                handleSkip={handleSkip}
                handleBack={handleBack}
              />
            </form>
            <div className="slider_range">
           <div className="slider_in_percent" style={{width: "18%"}}></div>
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

export default ContactInfoSlider;
