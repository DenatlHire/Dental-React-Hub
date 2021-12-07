import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileDisplay from "./ProfileDisplay";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Pagination } from "./pagination";

function OfficeTypeSilder({
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
    // envt: yup.string().required("Please Select an Option"),
    // atmosphere: yup.string().required("Please Select an Option"),
    // teamSize: yup.string().required("Please Select an Option"),
    // type: yup.string().required("Please Select an Option"),
    officetype: yup.array().of(yup.string()).min(1).required("Please select anyone option")
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
    console.log('event.target.checked;',e.target.checked)
    console.log('event.target.value',e.target.value)
    if(e.target.checked){
      selectedValue.push(e.target.value)
      console.log('selectSkill',selectedValue)
      setSelectedOfficeType([...selectedValue])
      setValue('officetype',selectedValue)
    }
    // else{
    //   const index = selectedValue.indexOf(e.target.value);
    //   if (index > -1) {
    //     selectedValue.splice(index, 1);
    //     console.log('selectSkill',selectedValue)
    //     setSelectSkill([...selectedValue])
    //     setValue('skillset_type_id',selectedValue)

    //   }
    // }
  }

  // useEffect(() => {
  //   getTypes()
  // },[]);

  // const getTypes = () => {
	// axios
	// .get("/office-types")
	// .then(response => {
	//   console.log("res", response);
	//   setOfficeType(response.data)
	// })
	// .catch(function(error) {
	//   // handle error
	//   console.log(error);
	// });
  // }
	
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
                <h2 className="form_title">Your Ideal Work Environment:</h2>


                <div className="idel_form">
              {officeTypes.map((type,i) => (
                 <div class="InputGroup">
                 <input type="radio" 
                 name={i+'size'}
                 id={type.option_1}
                 value={type.option_1} 
                //  {...register(`officetype[${i}]`)}
                 checked={selectedOfficeType.find(element => element == type.option_1) } 
                 onChange={(e)=>{handleSelectOfficeType(e)}}
                 />
                 <label for={type.option_1}>{type.option_1}</label>

                 <input
                   type="radio"
                   name={i+'size'}
                   id={type.option_2}
                   value={type.option_2}
                  //  {...register(`officetype[${i}]`)}
                  checked={selectedOfficeType.find(element => element == type.option_2) }
                  onChange={(e)=>{handleSelectOfficeType(e)}}
                 />
                 <label for={type.option_2}>{type.option_2}</label>
               </div>
              ))}         
                </div>
                    <p style={{color: 'red'}} > {errors.officetype ? "Please Select atleast one of above" : ""} </p>
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
           <div className="slider_in_percent" style={{width: "83%"}}></div>
         </div>
          </div>
        </div>
        <ProfileDisplay 
         data = {user}
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

export default OfficeTypeSilder;
