import React from "react";

function ClinicProfileDisplay({
  data,
  designationsValue,
  skillValue,
  workSituatuonValue,
  availabilityValue,
  officeTypeValue
}){
  let user = data;
  return (
    <div className="item_right_info">
      <h2 className="profile_title">Clinic Profile</h2>
          <div className="display_item_list_wrap">
            <div className="di_item">
              <div className="label_name">Name</div>
              <div className={ `label_data ${ !user?.clinicname && 'label_data_placeholder'}`}>
                {user?.clinicname}
              </div>
            </div>

            <div className="di_item">
              <div className="label_name">Contact Information</div>
              <div
                className={`label_data ${!user?.email && "label_data_placeholder"}`}
              >
                {user?.email && `Email: ${user?.email}`} <br/>{user?.phone && `  Phone: ${user?.phone}`}<br/> {user?.username && `Username: ${user?.username}`}
              </div>
            </div>

            <div className="di_item">
              <div className="label_name">Location</div>
              <div className={ `label_data ${ !user?.address && 'label_data_placeholder'}`}>
                {user?.address}
              </div>
            </div>
            
            <div className="di_item">
              <div className="label_name">Practice Type</div>
              <div className={ `label_data ${ !user?.practice_type && 'label_data_placeholder'}`}>
                {user?.practice_type}
              </div>
            </div>

            <div className="di_item">
              <div className="label_name">Position</div>
              <div className={ `label_data ${ !user?.designation_id && 'label_data_placeholder'}`}>
              {designationsValue &&
              designationsValue.length > 0 &&
              designationsValue.map(element =>
                element.id == user?.designation_id ? element.name : ""
              )}
              </div>
            </div>

             <div className="di_item">
              <div className="label_name">Looking For a Position</div>
              <div className={ `label_data ${ !user?.looking_for && 'label_data_placeholder'}`}>
                {user?.looking_for}
              </div>
            </div>

            <div className="di_item">
              <div className="label_name">Skill</div>
              <div className={ `label_data ${ !user?.skillset_type_id && 'label_data_placeholder'}`}>
              {user?.skillset_type_id &&
              user?.skillset_type_id.length > 0 &&
              user?.skillset_type_id.map((element , i) =>{
                return(
                  element,
                  skillValue.map((val) => (
                    val.id == user?.skillset_type_id[i] ?
                    ( <div> {val.title} </div>)
                       : ""
                  ))
                )
                })}
              </div>
            </div>

            <div className="di_item">
              <div className="label_name">Experience Required</div>
              <div className={ `label_data ${ !user?.clinical_experience && 'label_data_placeholder'}`}>
              {
                user?.clinical_experience ? `${user?.clinical_experience} Years` : ""
              }
                {/* {`${user?.clinical_experience} Years`}  */}
              </div>
            </div>

            <div className="di_item">
              <div className="label_name">Required Position</div>
                  <div className={ `label_data ${ !user?.hours_time && 'label_data_placeholder'}`}>
                  {user?.hours_time &&
              user?.hours_time.length > 0 &&
              user?.hours_time.map((element , i) =>{
                return(
                  element,
                  workSituatuonValue.map((val) => (
                    val.id == user?.hours_time[i] ?
                    ( <div> {val.title} </div>)
                       : ""
                  ))
                )
                })}
              
              {user?.contract_type_id &&
              user?.contract_type_id.length > 0 &&
              user?.contract_type_id.map((element , i) =>{
                return(
                  element,
                  availabilityValue.map((val) => (
                    val.id == user?.contract_type_id[i] ?
                    ( <div> {val.title} </div>)
                       : ""
                  ))
                )
                })}
                  </div>
            </div>

            <div className="di_item">
              <div className="label_name ">Work Environment</div>
              <div className={ `label_data ${ !user?.officetype && 'label_data_placeholder'}`}>
                {/* {
                  user?.officetype.map((val,i) =>{
                    return (i > 0 ? ', '+val : val)
                  })
                } */}
              { user?.officetype?.filter(item => item).toString()} 
            </div>
            </div>

            <div className="di_item">
              <div className="label_name">About info</div>
              <div className={ `label_data ${ !user?.about && 'label_data_placeholder'}`}>
                {user?.about}
              </div>
            </div>
          </div>

    </div>
  );
}

export default ClinicProfileDisplay;
