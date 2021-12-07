import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import NameSlide from "./NameSlide";
import LocationSlide from "./LocationSlide";
import PracticetypeSlice from "./PracticetypeSlice";
import PositionSlide from "./PositionSlide";
import SkillSlide from "./SkillSlide";
import ExperienceSlide from "./ExperienceSlide";
import DurationSlide from "./DurationSlide";
import WorkEnvironment from "./WorkEnvironment";
import ClinicBioSlide from "./ClinicBioSlide";
import PhotoSlide from "./PhotoSlide";
import ActivelyLooking from "./ActivelyLooking";
import ContactInfoSlider from "./ContactInfoSlider";

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

export default function ClinicInfoslide() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const history = useHistory();

  const isStepOptional = step => {
    return step === 1;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
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

  const [data, setData] = useState({});
  const [user, setUser] = useState([]);
  const [userid, setUserid] = useState();

  const handleSubmitForm = getdata => {
    setUser(getdata);
    console.log("user", getdata);

    if (activeStep === steps.length) {
      addUser(getdata);
      history.push("/signin");
    }
    if(activeStep === 4 && getdata.looking_for === "No"){
      addUser(getdata);
      history.push("/signin");
    }
    handleNext();
  };

  const addUser = (getdata) => {
    axios
      .post("/auth/local/register", {
        clinicname: user.clinicname,
        email: user.email,
        phone: user.phone,
        username: user.username,
        password: user.password,
        blocked: 0,
        confirmed: 1,
        type:2
      })
      .then(response => {
        console.log("success", response);
        let user_id = response.data.user.id;
        if(activeStep === 4 && getdata.looking_for === "No"){
          axios
          .post("/user-informations", {
            looking_for: getdata.looking_for,
            type:2,
            practice_type: user.practice_type,
            latitude: user.latitude.toString(),
            longitude: user.longitude.toString(),
            address: user.address,
            user_id: user_id,
          })

        }
        setUserid(user_id);
        addUserInformation(user_id,getdata);
      })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error);
      });
  };

  const addUserInformation = (user_id,getdata) => {
    axios
      .post("/user-informations", {
        latitude: user.latitude.toString(),
        longitude: user.longitude.toString(),
        address: user.address,
        practice_type: user.practice_type,
        looking_for: user.looking_for,
        designation_id: user.designation_id,
        skillset_type_id: user.skillset_type_id.toString(),
        clinical_experience: user.clinical_experience,
        contract_type_id: user.contract_type_id.toString(),
        hours_time: user.hours_time.toString(),
        office_type_id: user.officetype.join(),
        about: getdata.about,
        user_id: user_id,
        type:2
      })
      .then(response => {
        console.log("success",response);
        let userinfoid = response.data.id;
        for (let i = 0; i < getdata.clinicPhoto.length; i++) {
          const data = new FormData();

          let photo = "";
          let file = [];
  
          
          photo = "clinic_photos";
          
          file = getdata.clinicPhoto[i];
        
  
          data.append('ref', 'user-information');
          data.append('refId',userinfoid);
          data.append('field', photo);
          data.append('files', file);
          for (var key of data.entries()) {
            console.log(key[0] + ', ' + key[1])
          }
          const upload_res = axios.post("/upload",data);
        }
        
        // const upload_res = axios.post("/upload",{data});
        history.push("/signin");
        return response;
      })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  };

  const [designations, setDesignations] = useState([]);
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
        console.log("res", response);
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

  return (
    <div sx={{ width: "100%" }}>
      {activeStep === 0 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <NameSlide
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
              officeTypeValue={officeType}
              availabilityValue={availability}
              workSituatuonValue={workSituatuon}
              skillValue={skill}
              designationsValue={designations}
            />
          </div>
        </div>
      )}
      {activeStep === 2 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <LocationSlide
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
      {activeStep === 3 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <PracticetypeSlice
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
      {activeStep === 5 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup"> 
            <PositionSlide
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

      {activeStep === 4 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <ActivelyLooking
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

      {activeStep === 6 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <SkillSlide
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
      {activeStep === 7 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <ExperienceSlide
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
      {activeStep === 8 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <DurationSlide
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
      {activeStep === 9 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <WorkEnvironment
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

      {activeStep === 10 && (
        <div className="main_overlay_info_data">
          <div className="main_over_poup">
            <ClinicBioSlide
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
