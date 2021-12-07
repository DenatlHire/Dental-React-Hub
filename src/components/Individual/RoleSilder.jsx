import React, { useEffect, useState } from "react";
import ProfileDisplay from "./ProfileDisplay";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Pagination } from "./pagination";
import axios from "axios";

function RoleSilder({
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
		designation_id: yup.string().required("Please select anyone role"),
  });

  const {
    setValue,
	getValues,
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

  const [designations, setDesignations] = useState(designationsValue);
  const [selectedOption, setselectedOption] = useState(getValues('designation_id') ? getValues('designation_id') : 0);

	useEffect(() => {
		// getDesignation()
	},[]);

	// const getDesignation = () => {
	// 	axios
	// 	.get("/designations")
	// 	.then(response => {
	// 	console.log("res", response);
	// 	setDesignations(response.data)
	// 	})
	// 	.catch(function(error) {
	// 	// handle error
	// 	console.log(error);
	// 	});
	// }
	const onSiteChanged = (e) => {
		setValue('designation_id',e.currentTarget.value)
		setselectedOption(e.currentTarget.value)
	  }
	return (
		<div className="item_main">
		{console.log("designationsValue",designationsValue)
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
							<h2 className="form_title">What is Your Role?</h2>
							<div className="role_box_wrap">
								{designations.map((role,i) => (
										<div className={`role_box_list ${selectedOption == role.id ? "active" : ''}`}>
										<label className="role_box_list_data">
											<input  type="radio" name="role" hidden 
											 {...register("designation_id")}
											value={role.id} onChange={onSiteChanged} />
											<img
													src={axios.defaults.baseURL + role.image.url} 
													alt={role.alternativeText}
												/>
												<span className="role_name">{role.name}</span>
											</label>
										</div>
								))}
								<p style={{color: 'red'}} > {errors.designation_id ? "Please select anyone role" : ""} </p>
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
           <div className="slider_in_percent" style={{width: "25%"}}></div>
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

export default RoleSilder;