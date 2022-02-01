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
    // envt: yup.string().required("Please select atleast one from above"),
    // atmosphere: yup.string().required("Please select atleast one from above") ,
    // teamSize: yup.string().required("Please select atleast one from above"),
    // environment: yup.string().required("Please select atleast one from above")
    // officetype: yup.array().of(yup.string()).required("Please select anyone option")
     officetype: yup.array().of(yup.string()).min(1).required("Please select anyone option")
    //  officetype: yup.string().required().min(1)
    //  officetype: yup.array().nullable().of(yup.string())

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


  const [officeTypes, setOfficeType] = useState(officeTypeValue);
  const [selectedOfficeType, setSelectedOfficeType] = useState(getValues('officetype') ? getValues('officetype') : []);

  const handleSelectOfficeType = (e) =>{
    let selectedValue = selectedOfficeType;

    const selectedArray = officeTypes.find(element => element.id == e.target.name );
    console.log("selectedArray",selectedArray.option_1);
    if(selectedValue.find(element => element == selectedArray.option_1 )){
        // remove option 1 value and add option_2 value
        const index = selectedValue.indexOf(selectedArray.option_1); 
        if (index > -1) {
          selectedValue.splice(index, 1);
          selectedValue.push(e.target.value)
          setSelectedOfficeType([...selectedValue])
          setValue('officetype',selectedValue)
        }

      }else if(selectedValue.find(element => element == selectedArray.option_2 )){
          // remove option_2 value and add option_1 value
          const index = selectedValue.indexOf(selectedArray.option_2); 
          if (index > -1) {
            selectedValue.splice(index, 1);
            selectedValue.push(e.target.value)
            setSelectedOfficeType([...selectedValue])
            setValue('officetype',selectedValue)
          }

      }else{
        selectedValue.push(e.target.value)
        setSelectedOfficeType([...selectedValue])
        setValue('officetype',selectedValue)
      }

    // if(e.target.checked){
    //   selectedValue.push(e.target.value)
    //   console.log('selectSkill',selectedValue)
    //   setSelectedOfficeType([...selectedValue])
    //   setValue('officetype',selectedValue)
    // }
    // else{
    //   const index = selectedValue.indexOf(e.target.value);
    //   if (index > -1) {
    //     selectedValue.splice(index, 1);
    //     console.log('selectSkillselectSkill',selectedValue)
    //     setSelectedOfficeType([...selectedValue])
    //     setValue('officetype',selectedValue)
    //   }
    // }
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
              <h2 className="form_title">Your Work Environment:</h2>


              <div className="idel_form">
            {officeTypes.map((type,i) => (
               <div class="InputGroup">
               <input type="radio" 
               name={type.id}
               id={type.option_1}
               value={type.option_1} 
               defaultChecked={selectedOfficeType.find(element => element == type.option_1) }
              //  {...register(`officetype[${i}]`)} 
              onChange={(e)=>{handleSelectOfficeType(e)}}
               />
               <label for={type.option_1}>{type.option_1}</label>

               <input
                 type="radio"
                 name={type.id}
                 id={type.option_2}
                 value={type.option_2}
                 defaultChecked={selectedOfficeType.find(element => element == type.option_2) }
                //  {...register(`officetype[${i}]`)}
              onChange={(e)=>{handleSelectOfficeType(e)}}
               />
               <label for={type.option_2}>{type.option_2}</label>
             </div>
            ))}         
                  <p style={{color: 'red'}} > {errors.officetype ? "Please Select atleast one of above" : ""} </p>
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
           <div className="slider_in_percent" style={{width: "91%"}}></div>
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

export default NameSlide;
