import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileDisplay from "./ProfileDisplay";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Pagination } from "./pagination";

function WorkingSituationSilder({
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
    contract_type_id: yup.array().required('Select atleast one option of your interest'),
    practice_type:  yup.string().required("Please Select an Option"),
    hours_time: yup.array().required('Select atleast one option of your interest'),
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
  const [selectedWorkTime,setselectedWorkTime] = useState(getValues('hours_time') ? getValues('hours_time') : []);
  
  const handleSelectSkill = (e) =>{
    let selectedValue = selectedWorkSituatuon;
    console.log('event.target.checked;',e.target.checked)
    console.log('event.target.value',e.target.value)
    if(e.target.checked){
      selectedValue.push(e.target.value)
      setselectedWorkSituatuon([...selectedValue])
      setValue('contract_type_id',selectedValue)
    }else{
      const index = selectedValue.indexOf(e.target.value);
      if (index > -1) {
        selectedValue.splice(index, 1);
        setselectedWorkSituatuon([...selectedValue])
        setValue('contract_type_id',selectedValue)

      }
    }
  }
  const handleSelectTime = (e) =>{
    let selectedValue = selectedWorkTime;
    console.log('event.target.checked;',e.target.checked)
    console.log('event.target.value',e.target.value)
    if(e.target.checked){
      selectedValue.push(e.target.value)
      setselectedWorkTime([...selectedValue])
      setValue('hours_time',selectedValue)
    }else{
      const index = selectedValue.indexOf(e.target.value);
      if (index > -1) {
        selectedValue.splice(index, 1);
        setselectedWorkTime([...selectedValue])
        setValue('hours_time',selectedValue)

      }
    }
  }
  // useEffect(() => {
  // getWorkSituation()
  // getavailability()
  // },[]);

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
                <h2 className="form_title">Your Ideal Working Situation:</h2>

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
                          onChange={(e)=>{handleSelectSkill(e)}}
                        />
                        {situation.title}
                      </label>
                    </li>
                    ))}
                  </ul>
                  <p style={{color: 'red'}} > {errors.contract_type_id ? "Select atleast one option of your interest" : ""} </p>
                </div>

                <div className="skill_wrap">
                  <label>Type of Office ?</label>
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
                  <p style={{color: 'red'}} > {errors.practice_type ? "Please select an option" : ""} </p>
                </div>

                <div className="skill_wrap">
                  <label>What's Your Availability?</label>
                  <ul>

                    {availability.map((ave,i) => (
                    <li className={`${selectedWorkTime.find(element => element == ave.id) ? 'active' : ''}`}>
                      <label>
                        <input
                          type="checkbox"
                          {...register("hours_time")}
                          onChange={(e)=>{handleSelectTime(e)}}
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
           <div className="slider_in_percent" style={{width: "75%"}}></div>
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

export default WorkingSituationSilder;
