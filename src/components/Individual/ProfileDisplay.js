import React from "react";
import { format } from "date-fns";

function ProfileDisplay({
  data,
  designationsValue,
  skillValue,
  workSituatuonValue,
  availabilityValue,
  officeTypeValue
}) {
  let user = data;
  let des = designationsValue;
  return (
    <div className="item_right_info">
      {console.log("data submit", user, workSituatuonValue, availabilityValue)}
      <h2 className="profile_title">Your Profile</h2>
      <div className="display_item_list_wrap">
        <div className="di_item">
          <div className="label_name">Name</div>
          <div
            className={`label_data ${!user?.firstname &&
              "label_data_placeholder"}`}
          >
            {user?.firstname} {user?.lastname}
          </div>
        </div>

        <div className="di_item">
          <div className="label_name">Contact Information</div>
          <div
            className={`label_data ${!user?.email && "label_data_placeholder"}`}
          >
            {user?.email && `Email: ${user?.email}`} <br/>{user?.phone && `  Phone: ${user?.phone}`}
          </div>
        </div>

        <div className="di_item">
          <div className="label_name">Role</div>
          <div
            className={`label_data ${!user?.designation_id &&
              "label_data_placeholder"}`}
          >
            {/* {user?.designation_id} */}
            {designationsValue &&
              designationsValue.length > 0 &&
              designationsValue.map(element =>
                element.id == user?.designation_id ? element.name : ""
              )}
          </div>
        </div>

        <div className="di_item">
          <div className="label_name">Location</div>
          <div
            className={`label_data ${!user?.address &&
              "label_data_placeholder"}`}
          >
            {/* {user?.latitude} {user?.longitude}  */}
            {user?.address}
          </div>
        </div>
        <div className="di_item">
          <div className="label_name">Actively Looking For a Position</div>
          <div
            className={`label_data ${!user?.looking_for &&
              "label_data_placeholder"}`}
          >
            {user?.looking_for}
          </div>
        </div>
        <div className="di_item">
          <div className="label_name">Education</div>
          <div
            className={`label_data ${!user?.education &&
              "label_data_placeholder"}`}
          >
            {user?.education &&
              user?.education.length > 0 &&
              user?.education.map((education, i) => (
                <div
                  className={`label_data ${!education.degree &&
                    "label_data_placeholder"}`}
                >
                  {education?.degree} <br/> {education?.institute}<br/>{" "}
                  {format(new Date(education?.year_graduation), "yyyy-MM") }
                </div>
              ))}
          </div>
        </div>

        <div className="di_item">
          <div className="label_name">Work Experience</div>
          <div
                className={`label_data ${!user?.job_exp &&
                  "label_data_placeholder"}`}
              >
          {user?.job_exp &&
            user?.job_exp.length > 0 &&
            user?.job_exp.map((work, i) => (
              <div
                className={`label_data ${!user?.job_exp  &&
                  "label_data_placeholder"}`}
              >
                {work?.job_title}<br/>{work?.place_work} <br/> {work?.start_date}<br/>{" "}
                {work?.end_date}  
              </div>
            ))}
            </div>
        </div>

        <div className="di_item">
          <div className="label_name">Skills</div>
          <div
            className={`label_data ${!user?.skillset_type_id &&
              "label_data_placeholder"}`}
          >
            {user?.skillset_type_id &&
              user?.skillset_type_id.length > 0 &&
              user?.skillset_type_id.map((element , i) =>{
                return(
                  element,
                  skillValue?.map((val) => (
                    val.id == user?.skillset_type_id[i] ?
                    ( <div> {val.title} </div>)
                       : ""
                  ))
                )
                })}
          </div>
        </div>

        <div className="di_item">
          <div className="label_name">Ideal Working Situation</div>
          <div
            className={`label_data ${!user?.hours_time &&
              "label_data_placeholder"}`}
          >
            {/* {user?.hours_time &&
              user?.hours_time.length > 0 &&
              user?.hours_time.toString()}{" "} */}

                {user?.hours_time &&
              user?.hours_time.length > 0 &&
              user?.hours_time.map((element , i) =>{
                return(
                  element,
                  availabilityValue.map((val) => (
                    val.id == user?.hours_time[i] ?
                    ( <div> {val.title} </div>)
                       : ""
                  ))
                )
                })}


            {user?.practice_type}
            {/* {user?.contract_type_id} */}

            {user?.contract_type_id &&
              user?.contract_type_id.length > 0 &&
              user?.contract_type_id.map((element , i) =>{
                return(
                  element,
                  workSituatuonValue.map((val) => (
                    val.id == user?.contract_type_id[i] ?
                    ( <div> {val.title} </div>)
                       : ""
                  ))
                )
                })}
          </div>
        </div>

        <div className="di_item">
          <div className="label_name">Ideal Work Environment</div>
          <div
            className={`label_data ${!user?.officetype &&
              "label_data_placeholder"}`}
          >
              { user?.officetype?.filter(item => item).toString()} 
            {/* {user?.officetype?.toString()} */}
            {/* {user?.teamSize} {user?.atmosphere}  { user?.ideal_envt } */}
          </div>
        </div>

        <div className="di_item">
          <div className="label_name">About Yourself</div>
          <div
            className={`label_data ${!user?.about && "label_data_placeholder"}`}
          >
            {" "}
            {user?.about}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDisplay;
