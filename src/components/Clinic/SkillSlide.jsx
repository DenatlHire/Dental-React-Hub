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

  // const validationSchema = yup.object().shape({
  //   skillset_type_id: yup.array().min(1, 'Select atleast one option of your interest')
  // });
  const validationSchema = yup.object().shape({
    // skillset_type_id: yup.array().min(1, 'Select atleast one option of your interest') 
    // skillset_type_id: yup.boolean().oneOf([true], 'Message')
    skillset_type_id: yup.array().min(1)
    // skillset_type_id: yup.array()
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

  console.log("temp",errors);

  const [skill, setSkill] = useState([]);
  const [selectSkill, setSelectSkill] = useState(getValues('skillset_type_id') ? getValues('skillset_type_id') : []);
  const [selectSkillName, setSelectSkillName] = useState(getValues('skillset_type_name') ? getValues('skillset_type_name') : []);
  useEffect(() => {
	getSkills()
  },[]);

  const getSkills = () => {
	axios
	.get("/skillset-types",{params: {
    designation_id: getValues('designation_id')
    }})
	.then(response => {
	  console.log("res", response);
	  setSkill(response.data)
	})
	.catch(function(error) {
	  // handle error
	  console.log(error);
	});
  }
  const handleSelectSkill = (e,skillName) =>{
    let selectedValue = selectSkill;
    let selectedValueName = selectSkillName;
    if(e.target.checked){
      selectedValue.push(e.target.value)
      setSelectSkill([...selectedValue])
      setValue('skillset_type_id',selectedValue)

      // name
      selectedValueName.push(skillName)
      setSelectSkillName([...selectedValueName])
      setValue('skillset_type_name',selectedValueName)
    }else{
      const index = selectedValue.indexOf(e.target.value);
      const indexName = selectedValueName.indexOf(skillName);
      if (index > -1) {
        selectedValue.splice(index, 1);
        setSelectSkill([...selectedValue])
        setValue('skillset_type_id',selectedValue)
      }

      // name
      if (indexName > -1) {
        selectedValueName.splice(indexName, 1);
        setSelectSkillName([...selectedValueName])
        setValue('skillset_type_name',selectedValueName)
      }
    }
  }
  return (
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
            <h2 className="form_title">What Skills are You Looking For?</h2>

            <div className="skill_wrap">
              <ul>
                {skill?.map((skill,i) => (
                  <li className={`${selectSkill.find(element => element == skill.id) ? 'active' : ''}`}>
                  <label>
                    <input type="checkbox"
                     {...register("skillset_type_id")}
                      hidden value={skill.id} 
                      onChange={(e)=>{handleSelectSkill(e,skill.title)}}
                        />
                    {skill.title}
                  </label>
                </li> 
                ))}  
              </ul>
              <p style={{color: 'red'}} > {errors.skillset_type_id ? "Select atleast one option of your interest" : ""} </p>
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
           <div className="slider_in_percent" style={{width: "64%"}}></div>
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
  );
}

export default NameSlide;
