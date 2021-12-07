import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-multi-carousel/lib/styles.css";
import NameSlider from "./NameSlider";
import ContactInfoSlider from "./ContactInfoSlider";
import RoleSilder from "./RoleSilder";
import LocationSilder from "./LocationSilder";
import EducationSilder from "./EducationSilder";
import WorkHistorySilder from "./WorkHistorySilder";
import SkillSilder from "./SkillSilder";
import PhotoSlide from "./PhotoSlide";
import WorkingSituationSilder from "./WorkingSituationSilder";
import OfficeTypeSilder from "./OfficeTypeSilder";
import Position from "./Position";
import IndividualBioSlide from "./IndividualBioSlide";
import { useHistory } from "react-router-dom";
// import AutoComplete from "./AutoComplete";


const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
  "Foru",
  "five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "eleven"
];

export default function IndividualInfoslide() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const history = useHistory();

  const isStepOptional = step => {
    return step === 1;
  };
  const [designations, setDesignations] = useState();
  const [skill, setSkill] = useState([]);
  const [workSituatuon, setWorkSituatuon] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [officeType, setOfficeType] = useState([]);

  useEffect(() => {
    getDesignation();
    getSkills();
    getWorkSituation();
    getavailability();
    getTypes();
  }, []);

  const getDesignation = () => {
    axios
      .get("/designations")
      .then(response => {
        // console.log("res", response);
        setDesignations(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };
  const getSkills = () => {
    axios
      .get("/skillset-types")
      .then(response => {
        console.log("res", response);
        setSkill(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  const getWorkSituation = () => {
    axios
      .get("/contract-types")
      .then(response => {
        console.log("res", response);
        setWorkSituatuon(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  const getavailability = () => {
    axios
      .get("/working-times")
      .then(response => {
        console.log("res", response);
        setAvailability(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  const getTypes = () => {
    axios
      .get("/office-types")
      .then(response => {
        console.log("res", response);
        setOfficeType(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    console.log("user", user);
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep != steps.length) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }

    setSkipped(newSkipped);
  };

  const handleBack = () => {
    console.log("backuser", user);
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    // if (!isStepOptional(activeStep)) {
    //   // You probably want to guard against something like this,
    //   // it should never occur unless someone's actively trying to break something.
    //   throw new Error("You can't skip a step that isn't optional.");
    // }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [data, setData] = useState([]);
  const [userInformation, setUserInformation] = useState([]);
  const [user, setUser] = useState([]);
  const [userid, setUserid] = useState();
  const [workHistories, setWorkHistories] = useState([]);

  const handleSubmitForm = getdata => {
    // setData(prev => ({ ...prev, ...getdata }));
    console.log("data", getdata);
    setUser(getdata);
    if (activeStep === steps.length) {
    setTimeout(function(){ 
      addUser(getdata);
    }, 3000);
    }

    if(activeStep === 4 && getdata.looking_for === "No"){
      addUser(getdata);
      history.push("/signin");
    }
  handleNext();
  };

  const addUser = (getdata) => {
console.log("user",getdata)

    axios
      .post("/auth/local/register", {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        username: user.username,
        password: user.password,
        blocked: 0,
        confirmed: 1,
        type:1
      })
      .then(response => {
        console.log("success", response);
        let user_id = response.data.user.id;
        if(activeStep === 4 && getdata.looking_for === "No"){
          axios
          .post("/user-informations", {
            looking_for: getdata.looking_for,
            type:"1",
            designation_id: user.designation_id,
            latitude: user.latitude.toString(),
            longitude: user.longitude.toString(),
            address: user.address,
            user_id: user_id,
          })
        }
        setUserid(user_id);
        addUserInformation(user_id,getdata);
        addWorkHist(user_id)
        addEducation(user_id,getdata)
      })
      .then(userEduc => {
        history.push("/signin");
      })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error);
      });
  };

  const addUserInformation = (user_id,getdata) => {
    axios
      .post("/user-informations", {
        looking_for: getdata.looking_for,
        designation_id: user.designation_id,
        latitude: user.latitude.toString(),
        longitude: user.longitude.toString(),
        address: user.address,
        type:"1",
        skillset_type_id: user.skillset_type_id.toString(),
        contract_type_id: user.contract_type_id.toString(),
        hours_time: user.hours_time.toString(),
        practice_type: user.practice_type,
        about: getdata.about,
        user_id: user_id,
        office_type_id: user.officetype.join(),
      })
      .then(response => {
        console.log("success");
        let userinfoid = response.data.id;
            for (let i = 0; i < getdata.profile_photo.length; i++) {
              const data = new FormData();
    
              let photo = "";
              let file = [];
      
              
              photo = "profile_photo";
              
              file = getdata.profile_photo[i];
            
      
              data.append('ref', 'user-information');
              data.append('refId',userinfoid);
              data.append('field', photo);
              data.append('files', file);
              for (var key of data.entries()) {
                console.log(key[0] + ', ' + key[1])
              }
              const upload_res = axios.post("/upload",data);
            }
        return response;
      })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  };

  const addWorkHist = user_id => {
    return user.job_exp.map(expValue =>
      axios
        .post("/work-histories", {
          ...expValue,
          end_date: new Date(expValue.end_date),
          start_date: new Date(expValue.start_date),
          user_id: user_id
        })
        .then(response => {
          console.log("success");
          return response;
        })
        .catch(error => {
          // Handle error.
          console.log("An error occurred:", error.response);
        })
    );
  };
  const addEducation = (user_id,getdata) => {
    return user.education
      .map(degreeValue => {
        axios
          .post("/university-programs", {
            ...degreeValue,
            institution:degreeValue.institute,
            user_id: user_id
          })
          .then(response => {
            console.log("success",response);
            
            
            // const upload_res = axios.post("/upload",{data});
            history.push("/signin");
            return response;
          })
          .catch(error => {
            // Handle error.
            console.log("An error occurred:", error.response);
          });
        });
      }

  return (
    <div sx={{ width: "100%" }}>
      {/* <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper> */}

      {activeStep === 0 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <NameSlider
              activeStep={activeStep}
              steps={steps}
              handleReset={handleReset}
              handleSkip={handleSkip}
              handleSubmitForm={handleSubmitForm}
              handleBack={handleBack}
              user={user}
              workSituatuonValue={workSituatuon}
              availabilityValue={availability}
              skillValue={skill}
              officeTypeValue={officeType}
              designationsValue={designations}
            />
            {/* <AutoComplete /> */}
          </div>
        </div>
      )}
      {activeStep === 1 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <ContactInfoSlider
              activeStep={activeStep}
              steps={steps}
              handleReset={handleReset}
              handleSkip={handleSkip}
              handleSubmitForm={handleSubmitForm}
              handleBack={handleBack}
              user={user}
              workSituatuonValue={workSituatuon}
              availabilityValue={availability}
              skillValue={skill}
              officeTypeValue={officeType}
              designationsValue={designations}
            />
          </div>
        </div>
      )}
      {activeStep === 2 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <RoleSilder
              activeStep={activeStep}
              steps={steps}
              handleReset={handleReset}
              handleSkip={handleSkip}
              handleSubmitForm={handleSubmitForm}
              handleBack={handleBack}
              user={user}
              workSituatuonValue={workSituatuon}
              availabilityValue={availability}
              skillValue={skill}
              officeTypeValue={officeType}
              designationsValue={designations}
            />
          </div>
        </div>
      )}
      {activeStep === 3 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <LocationSilder
              activeStep={activeStep}
              steps={steps}
              handleReset={handleReset}
              handleSkip={handleSkip}
              handleSubmitForm={handleSubmitForm}
              handleBack={handleBack}
              user={user}
              workSituatuonValue={workSituatuon}
              availabilityValue={availability}
              skillValue={skill}
              officeTypeValue={officeType}
              designationsValue={designations}
            />
          </div>
        </div>
      )}
      {activeStep === 5 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <EducationSilder
              activeStep={activeStep}
              steps={steps}
              handleReset={handleReset}
              handleSkip={handleSkip}
              handleSubmitForm={handleSubmitForm}
              handleBack={handleBack}
              user={user}
              workSituatuonValue={workSituatuon}
              availabilityValue={availability}
              skillValue={skill}
              officeTypeValue={officeType}
              designationsValue={designations}
            />
          </div>
        </div>
      )}
      {activeStep === 6 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <WorkHistorySilder
              activeStep={activeStep}
              steps={steps}
              handleReset={handleReset}
              handleSkip={handleSkip}
              handleSubmitForm={handleSubmitForm}
              handleBack={handleBack}
              user={user}
              workSituatuonValue={workSituatuon}
              availabilityValue={availability}
              skillValue={skill}
              officeTypeValue={officeType}
              designationsValue={designations}
            />
          </div>
        </div>
      )}
      {activeStep === 7 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <SkillSilder
              activeStep={activeStep}
              steps={steps}
              handleReset={handleReset}
              handleSkip={handleSkip}
              handleSubmitForm={handleSubmitForm}
              handleBack={handleBack}
              user={user}
              workSituatuonValue={workSituatuon}
              availabilityValue={availability}
              skillValue={skill}
              officeTypeValue={officeType}
              designationsValue={designations}
            />
          </div>
        </div>
      )}
      {activeStep === 4 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <Position
              activeStep={activeStep}
              steps={steps}
              handleReset={handleReset}
              handleSkip={handleSkip}
              handleSubmitForm={handleSubmitForm}
              handleBack={handleBack}
              user={user}
              workSituatuonValue={workSituatuon}
              availabilityValue={availability}
              skillValue={skill}
              officeTypeValue={officeType}
              designationsValue={designations}
            />
          </div>
        </div>
      )}
      {activeStep === 8 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <WorkingSituationSilder
              activeStep={activeStep}
              steps={steps}
              handleReset={handleReset}
              handleSkip={handleSkip}
              handleSubmitForm={handleSubmitForm}
              handleBack={handleBack}
              user={user}
              workSituatuonValue={workSituatuon}
              availabilityValue={availability}
              skillValue={skill}
              officeTypeValue={officeType}
              designationsValue={designations}
            />
          </div>
        </div>
      )}
      {activeStep === 9 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <OfficeTypeSilder
              activeStep={activeStep}
              steps={steps}
              handleReset={handleReset}
              handleSkip={handleSkip}
              handleSubmitForm={handleSubmitForm}
              handleBack={handleBack}
              user={user}
              workSituatuonValue={workSituatuon}
              availabilityValue={availability}
              skillValue={skill}
              officeTypeValue={officeType}
              designationsValue={designations}
            />
          </div>
        </div>
      )}
      {activeStep === 10 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <IndividualBioSlide
              activeStep={activeStep}
              steps={steps}
              handleReset={handleReset}
              handleSkip={handleSkip}
              handleSubmitForm={handleSubmitForm}
              handleBack={handleBack}
              user={user}
              workSituatuonValue={workSituatuon}
              availabilityValue={availability}
              skillValue={skill}
              officeTypeValue={officeType}
              designationsValue={designations}
            />
          </div>
        </div>
      )}
     {activeStep === 11 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <PhotoSlide
              activeStep={activeStep}
              steps={steps}
              handleReset={handleReset}
              handleSkip={handleSkip}
              handleSubmitForm={handleSubmitForm}
              handleBack={handleBack}
              user={user}
              officeTypeValue={officeType}
              availabilityValue={availability}
              workSituatuonValue={workSituatuon}
              skillValue={skill}
              designationsValue={designations}
            />
          </div>
        </div>
      )}
    </div>
  );
}
