import React, { useEffect, useState } from "react";
import axios from "axios";
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
  user,
  workSituatuonValue,
  availabilityValue,
  skillValue,
  officeTypeValue,
  designationsValue
}) {
  const validationSchema = yup.object().shape({
    // workSituation: yup.string().required("Please select atleast one from above"),
    // workAvailability: yup.string().required("Please select atleast one from above")
    contract_type_id: yup.array().required('Select atleast one option of your interest'),
    hours_time: yup.array().required('Select atleast one option of your interest')
  });

  const {
    setValue,
    getValues,
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

  const [workSituatuon, setWorkSituatuon] = useState(workSituatuonValue);
  const [availability, setAvailability] = useState(availabilityValue);

  const [selectedWorkSituatuon,setselectedWorkSituatuon] = useState(getValues('contract_type_id') ? getValues('contract_type_id') : []);
  const [selectedWorkSituatuonName,setselectedWorkSituatuonName] = useState(getValues('contract_type_name') ? getValues('contract_type_name') : []);
  const [selectedWorkTime,setselectedWorkTime] = useState(getValues('hours_time') ? getValues('hours_time') : []);
  const [selectedWorkTimeName,setselectedWorkTimeName] = useState(getValues('hours_time_name') ? getValues('hours_time_name') : []);
  
  const handleSelectSkill = (e,selectedName) =>{
    let selectedValue = selectedWorkSituatuon;
    let selectedValueName = selectedWorkSituatuonName;
    if(e.target.checked){
      selectedValue.push(e.target.value)
      setselectedWorkSituatuon([...selectedValue])
      setValue('contract_type_id',selectedValue)

      // name
      selectedValueName.push(selectedName)
      setselectedWorkSituatuonName([...selectedValueName])
      setValue('contract_type_name',selectedValueName)
    }else{
      const index = selectedValue.indexOf(e.target.value);
      const indexName = selectedValueName.indexOf(selectedName);
      if (index > -1) {
        selectedValue.splice(index, 1);
        setselectedWorkSituatuon([...selectedValue])
        setValue('contract_type_id',selectedValue)
      }

      // name
      if (indexName > -1) {
        selectedValueName.splice(indexName, 1);
        setselectedWorkSituatuonName([...selectedValueName])
        setValue('contract_type_name',selectedValueName)
      }
    }
  }
  const handleSelectTime = (e,selectedTimeName) =>{
    let selectedValue = selectedWorkTime;
    let selectedValueName = selectedWorkTimeName;
    if(e.target.checked){
      selectedValue.push(e.target.value)
      setselectedWorkTime([...selectedValue])
      setValue('hours_time',selectedValue)

      // name
      selectedValueName.push(selectedTimeName)
      setselectedWorkTimeName([...selectedValueName])
      setValue('hours_time_name',selectedValueName)
    }else{
      const index = selectedValue.indexOf(e.target.value);
      const indexName = selectedValueName.indexOf(selectedTimeName);
      if (index > -1) {
        selectedValue.splice(index, 1);
        setselectedWorkTime([...selectedValue])
        setValue('hours_time',selectedValue)
      }

      // name
      if (indexName > -1) {
        selectedValueName.splice(indexName, 1);
        setselectedWorkTimeName([...selectedValueName])
        setValue('hours_time_name',selectedValueName)
      }
    }
  }
  // const getWorkSituation = () => {
	// axios
	// .get("/contract-types")
	// .then(response => {
	//   console.log("res", response);
	//   setWorkSituatuon(response.data)
	// })
	// .catch(function(error) {
  //   // handle error
	//   console.log(error);
	// });
  // }

  // const getavailability = () => {
  //   axios
  //   .get("/working-times")
  //   .then(response => {
  //     console.log("res", response);
  //     setAvailability(response.data)
  //   })
  //   .catch(function(error) {
  //     // handle error
  //     console.log(error);
  //   });
  //   }

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
                <h2 className="form_title"> Hours Required for This Position:</h2>

                <div className="skill_wrap">
                  <ul>
                    {workSituatuon.map((situation,i) => (
                    <li className={`${selectedWorkSituatuon.find(element => element == situation.id) ? 'active' : ''}`}>
                    <label>
                      <input
                        type="checkbox"
                        {...register("contract_type_id")}
                        hidden
                        value={situation.id}
                        onChange={(e)=>{handleSelectSkill(e,situation.title)}}
                      />
                      {situation.title}
                    </label>
                  </li>
                    ))}
                  </ul>
                  <p style={{color: 'red'}} > {errors.contract_type_id ? "Select atleast one option of your interest" : ""} </p>
                </div>

                <div className="skill_wrap">
                  <label>Candidate Availability:</label>
                  <ul>

                    {availability.map((ave,i) => (
                    <li className={`${selectedWorkTime.find(element => element == ave.id) ? 'active' : ''}`}>
                    <label>
                      <input
                        type="checkbox"
                        {...register("hours_time")}
                        onChange={(e)=>{handleSelectTime(e,ave.title)}}
                        hidden
                        value={ave.id}
                      />
                        {ave.title}
                    </label>
                  </li>
                    ))}
                  </ul>
                  <p style={{color: 'red'}} > {errors.hours_time ? "Select atleast one option of your interest" : ""} </p>
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
           <div className="slider_in_percent" style={{width: "82%"}}></div>
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
