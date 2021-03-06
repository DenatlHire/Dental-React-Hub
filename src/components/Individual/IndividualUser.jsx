import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import nl2br from "react-newline-to-break";
import axios from "axios";
import { format } from "date-fns";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-google-places-autocomplete";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import { responsiveFontSizes } from "@mui/material";
import profile_pic from './../../images/avatar.jpeg'
import background_pic from './../../images/profile_banner.png'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function IndividualUser(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState();
  const [designations, setDesignations] = useState([]);
  const [skill, setSkill] = useState([]);
  const [workSituatuon, setWorkSituatuon] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [officeType, setOfficeType] = useState([]);
  const [education, setEducation] = useState([]);
  const [educationData, setEducationData] = useState([
   { degree: "",
    institute: "",
    year_graduation: new Date(),
    user_id:user.id}
  ]);
  const [workHist, setWorkHist] = useState([
  ]);
  const [workHistData, setWorkHistData] = useState([
    {
      job_title: "",
      place_work: "",
      start_date:format(new Date(), "yyyy-MM"),
      end_date: format(new Date(), "yyyy-MM"),
      user_id:user.id
    }
  ]);
  const [dataSet, setdataSet] = useState([]);
  const [usetInfo, setUsetInfo] = useState([]);
  const [totalExp, setTotalExp] = useState(0);
  const [activePopup, setAtivePopup] = useState();

  const [profile_file, setprofile_file] = useState()
  const [banner_file, setbanner_file] = useState()
  const [dateLimit, setDateLimit] = useState([])

  const df_profile_photo = profile_pic;
  const df_banner_photo = background_pic;


  useEffect(() => {
    getDesignation();
    getSkills();
    getWorkSituation();
    getavailability();
    getTypes();
    getWorkHist();
    getEducation();
  }, []);


  // validation start

  const validationSchema = yup.object().shape({
  }).when((values, schema) => {
    if(activePopup == 1){
      return schema.shape({
        firstname: yup.string().required("Please enter first name"),
        lastname: yup.string().required("Please enter last name"),
        designation_id: yup.string().required("Please select anyone role"),
      });
    }
    if(activePopup == 2){
      return schema.shape({
        workHistData: yup.array().of(
          yup.object().shape({
            job_title: yup.string().required("Job title is required"),
            place_work: yup.string().required("Work place required"),
            start_date: yup.string().required("Please select a date"),
            end_date: yup.string().required("Please select a date"),
          })
        )
      });
    }
    if(activePopup == 3){
      return schema.shape({
        educationData: yup.array().of(
          yup.object().shape({
            degree: yup.string().required("Degree required"),
            institution: yup.string().required("Institute required"),
            year_graduation: yup.string().required("Please select a date")
          })
        ),
      });
    }
    if(activePopup == 4){
      return schema.shape({
        skillset_type_id: yup.array().min(1),
      });
    }
    if(activePopup == 5){
      return schema.shape({
        contract_type_id: yup.array().required('Select atleast one option of your interest').min(1),
        hours_time: yup.array().required('Select atleast one option of your interest').min(1),
      });
    }
  })

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    register,
    control,
    watch,
    getValues
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...user
    }
  });

  console.log("temp",errors);

  // validation ends

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

  useEffect(() => {
    axios
      .get("user-informations", {
        params: {
          user_id: user.id
        }
      })
      .then(response => {
        console.log("data", response.data);
        let userInfo = response.data[0];
        let office_type_id = userInfo.office_type_id ? userInfo.office_type_id.split(/\s*,\s*/) : [];
        userInfo.office_type_id = userInfo.office_type_id ? userInfo.office_type_id.split(/\s*,\s*/) : [];
        let skillset_type_id = userInfo.skillset_type_id ? userInfo.skillset_type_id.split(/\s*,\s*/): [];
        userInfo.skillset_type_id = userInfo.skillset_type_id ? userInfo.skillset_type_id.split(/\s*,\s*/): [];
        let contract_type_id = userInfo.contract_type_id ? userInfo.contract_type_id.split(/\s*,\s*/) : [];
        userInfo.contract_type_id = userInfo.contract_type_id ? userInfo.contract_type_id.split(/\s*,\s*/) : [];
        let hours_time = userInfo.hours_time ?  userInfo.hours_time.split(/\s*,\s*/) : [];
        userInfo.hours_time = userInfo.hours_time ?  userInfo.hours_time.split(/\s*,\s*/) : [];
        userInfo.id = userInfo?.id;
        userInfo.longitude = userInfo?.longitude;
        userInfo.latitude = userInfo?.latitude;
        userInfo.latitude = userInfo?.latitude;
        userInfo.address = userInfo?.address;
        console.log("userInfo", userInfo);
        setData(userInfo);
        setSelectedOfficeType(office_type_id)
        setSelectedworkSituatuon(contract_type_id)
        setUsetInfo(userInfo.user_id);
        setUsetInfo({ ...usetInfo, designation_id: userInfo.designation_id });
        setSelectedhourTime(hours_time)
        setSelectSkill(skillset_type_id)
        setselectedOption(userInfo.designation_id.id);
        setprofile_file(userInfo.profile_photo ? window.baseURL + userInfo.profile_photo.url :  df_profile_photo )
        setValue('contract_type_id',userInfo.contract_type_id)
        setValue('skillset_type_id',userInfo.skillset_type_id)
        setValue('hours_time',userInfo.hours_time)
        setValue("designation_id",userInfo.designation_id.id)
        setbanner_file(userInfo.banner_photo ? window.baseURL + userInfo.banner_photo.url :  df_banner_photo )

      })
      .catch(error => {
        console.log("data", error);
      });
  }, []);

  const getWorkHist = () => {
    axios
      .get("/work-histories", {
        params: {
          user_id: user.id
        }
      })
      .then(response => {
        console.log("getWorkHist", response.data);
        // setData(userInfo);  
        let totalExpCount = 0;
        if (response.data && response.data.length > 0) {
          setWorkHist(response.data);
          setWorkHistData(response.data);
          response.data.map((work, i) => {
            totalExpCount =
              totalExpCount +
              (format(new Date(work.end_date), "yyyy") -
                format(new Date(work.start_date), "yyyy")) *
                1;
            console.log("total---", totalExpCount);
            console.log(
              "total---",
              (format(new Date(work.end_date), "yyyy") -
                format(new Date(work.start_date), "yyyy")) *
                1
            );
            setTotalExp(totalExpCount);
          });
        }
      });
  };
  const getEducation = () => {
    axios
      .get("/university-programs", {
        params: {
          user_id: user.id
        }
      })
      .then(response => {
        console.log("getEducation", response.data);
        if(response.data.length > 0){
          setEducation(response.data);
          setEducationData(response.data);
        }
        // setData(userInfo);
      })
      .catch(error => {
        console.log("data", error);
      });
  };
  const totalWorkingYears = async () => {
    let total = 0;
  };
  // workSubmit
  const submit = e => {
    console.log("id =====>", usetInfo.firstname);
    axios
      .put("users/" + data.user_id.id, {
        firstname: usetInfo.firstname,
        lastname: usetInfo.lastname,
        email: usetInfo.email,
        phone: usetInfo.phone
      })
      .then(response => {
        // Handle success.
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.href = "/myprofile";
      })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
      // alert(usetInfo.designation_id)
    axios
      .put("user-informations/" + data.id, {
        user_id: data.user_id.id,
        about: usetInfo.about,
        city_id: usetInfo.city_id,
        facebook_link: usetInfo.facebook_link,
        twitter_link: usetInfo.twitter_link,
        linkedin_link: usetInfo.linkedin_link,
        address: data.address,
        latitude: data?.latitude.toString(),
        longitude: data?.longitude.toString(),
        designation_id: usetInfo.designation_id,
        office_type_id: selectedOfficeType.join(),
        contract_type_id: selectedworkSituatuon.join(),
        hours_time: selectedhourTime.join(),
        skillset_type_id: selectSkill.join(),
      })
      .then(response => {
        // Handle success.
        window.location.href = "/myprofile";
      })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  };

  const workSubmit = e => {
    console.log("id =====>", workHistData);
    workHistData.map(expValue =>
      expValue.id
        ? axios
            .put("/work-histories/" + expValue.id, expValue)
            .then(response => {
              // Handle success.
              window.location.href = "/myprofile";
            })
            .catch(error => {
              // Handle error.
              console.log("An error occurred:", error.response);
            })
        : axios
            .post("/work-histories/", expValue)
            .then(response => {
              // Handle success.
              window.location.href = "/myprofile";
            })
            .catch(error => {
              // Handle error.
              console.log("An error occurred:", error.response);
            })
    );
  };

  const eduSubmit = e => {
    console.log("id =====>", education);
    educationData.map(eduValue =>
      eduValue.id
        ? axios
            .put("/university-programs/" + eduValue.id, {...eduValue,user_id:user.id})
            .then(response => {
              // Handle success.
              window.location.href = "/myprofile";
            })
            .catch(error => {
              // Handle error.
              console.log("An error occurred:", error.response);
            })
        : axios
            .post("/university-programs/", eduValue)
            .then(response => {
              // Handle success.
              window.location.href = "/myprofile";
            })
            .catch(error => {
              // Handle error.
              console.log("An error occurred:", error.response);
            })
    );
  };

  const addEdu = e => {
    educationData.push({
      degree: "",
      institute: "",
      year_graduation: new Date(),
      user_id:user.id
    });
    setEducationData([...educationData]);
    console.log("edu", educationData);
  };

  const addJob = e => {
    workHistData.push({
      job_title: "",
      place_work: "",
      start_date:format(new Date(), "yyyy-MM"),
      end_date: format(new Date(), "yyyy-MM"),
      user_id:user.id
    });
    setWorkHistData([...workHistData]);
    console.log("Job", workHistData);
  };
  
  const deleteField = i => {
    console.log("click", educationData);
    let formValues = educationData;
    formValues.splice(i, 1);
    console.log('formValue',formValues)
    setEducationData([...formValues]);
    {console.log("educationData",educationData)
    // setValue("educationData",formValues)
    }
  };
  const deleteJobField = i => {
    // alert(i)
    console.log("click", workHistData);
    let formValues = workHistData;
    formValues.splice(i, 1);
    console.log('formValue',formValues)
    setWorkHistData([...formValues]);
  };

  const locationChange = datas => {
    console.log("location", datas.label);
    let dataValue = data;
    dataValue.address = datas.label;
    setData(dataValue);
    // setValue('address',data.label)
    geocodeByAddress(datas.label)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) =>
      setData({ ...data, latitude: lat, longitude: lng })
      );
  };

  const handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    console.log('value====',name)
    setUsetInfo({ ...usetInfo, [name]: value });
  };

  const workHistChange = (e, i) => {

    // setting limits for end_Date
    if (e.target.name === `workHistData[${i}].start_date`) {
    let startDates = [...dateLimit]
    startDates[i] = e.target.value
    setDateLimit(startDates)
    }


    console.log("data", e.target.value, e.target.name);
    // console.log("data", e.target.value);
    let workData = workHistData;
    const name = e.target.name;
    const value = e.target.value;

    if (name === `workHistData[${i}].job_title`) {
      workData[i].job_title = e.target.value;
      setValue(`workHistData[${i}].job_title`,e.target.value)
    }
    if (name === `workHistData[${i}].place_work`) {
      workData[i].place_work = e.target.value;
      setValue(`workHistData[${i}].place_work`,e.target.value)
    }

    if (name === `workHistData[${i}].start_date`) {
      workData[i].start_date = e.target.value;
      setValue(`workHistData[${i}].start_date`,e.target.value)
    }

    if (name === `workHistData[${i}].end_date`) {
      workData[i].end_date = e.target.value;
      setValue(`workHistData[${i}].end_date`,e.target.value)
    }

    console.log("work ==>", workData[i]);

    setWorkHistData(workData);
  };
  
  const educationChange = (e, i) => {
    console.log("data", e.target.value);
    let eduDate = educationData;
    const name = e.target.name;
    const value = e.target.value;
    // console.log("data", eduDate[i].degree);

    if (name === "degree") {
      eduDate[i].degree = e.target.value;
      setValue(`educationData[${i}].degree`,e.target.value)
    }
    if (name === "institution") {
      eduDate[i].institution = e.target.value;
      setValue(`educationData[${i}].institution`,e.target.value)
    }

    if (name === "year_graduation") {
      eduDate[i].year_graduation = e.target.value;
      setValue(`educationData[${i}].year_graduation`,e.target.value)
    }

    console.log("work ==>", eduDate[i]);
    setEducation(eduDate);
  };

  const eduChange = (e, i) => {
    console.log("data", e.target.name, e.target.value);

    const name = e.target.name;
    const value = e.target.value;
    console.log("data", education[i].job_title);

    if (name === "job_title") {
      education[i].job_title = e.target.value;
    }
    if (name === "place_work") {
      education[i].place_work = e.target.value;
    }
    console.log("work ==>", education[i]);
  };

  const [selectedOption, setselectedOption] = useState(0);

  const [selectedworkSituatuon, setSelectedworkSituatuon] = useState( data?.contract_type_id ? data?.contract_type_id: []);

    const [selectedOfficeType, setSelectedOfficeType] = useState( data?.office_type_id ? data?.office_type_id: []);

    const [selectedhourTime, setSelectedhourTime] = useState( data?.hours_time ? data?.hours_time: []);

    const [selectSkill, setSelectSkill] = useState(data && data.skillset_type_id ? data.skillset_type_id :[]);


    const handleSelectSkill = (e) =>{
      let selectedValue = selectSkill;
      console.log('event.target.checked;',e.target.checked)
      console.log('event.target.value',e.target.value)
      if(e.target.checked){
        selectedValue.push(e.target.value)
        console.log('selectSkill',selectedValue)
        setSelectSkill([...selectedValue])
        setValue('skillset_type_id',selectedValue)
      }else{
        const index = selectedValue.indexOf(e.target.value);
        // alert(index)
        if (index > -1) {
          selectedValue.splice(index, 1);
          console.log('event.target.value',selectedValue)
          setSelectSkill([...selectedValue])
          setValue('skillset_type_id',selectedValue)
        }
      }
    }


    const handleSelectOfficeType = (e,i) =>{
      let selectedValue = selectedOfficeType;

      console.log("officeType",officeType[i]);
      

      if(e.target.value === officeType[i].option_1){
        selectedValue.push(e.target.value)
        setSelectedOfficeType([...selectedValue])
        console.log("selectedValue",selectedValue);

        // setValue('officetype',selectedValue)
        console.log("selectedOfficeTypeP",selectedOfficeType.indexOf(officeType[i].option_2));
        const index =  selectedOfficeType.indexOf(officeType[i].option_2);
        if(index >= 0){
          selectedOfficeType.splice(index, 1);
        }
        console.log('selectSkill',selectedOfficeType)
        setSelectedOfficeType([...selectedOfficeType])
      }

      if(e.target.value === officeType[i].option_2){
        selectedValue.push(e.target.value)
        setSelectedOfficeType([...selectedValue])
        // setValue('officetype',selectedValue)
        console.log("selectedOfficeType",selectedOfficeType);
        
        const index = selectedOfficeType.indexOf(officeType[i].option_1);
        if(index >= 0){
          selectedOfficeType.splice(index, 1);
        }
        console.log('selectSkill',selectedOfficeType)
        setSelectedOfficeType([...selectedOfficeType])
      }
    }

    const handleSelectSituation = (e) =>{
      let selectedValue = selectedworkSituatuon;
      console.log('event.target.checked;',e.target.checked)
      console.log('event.target.value',e.target.value)
      if(e.target.checked){
        selectedValue.push(e.target.value)
        setSelectedworkSituatuon([...selectedValue])
        setValue('contract_type_id',selectedValue)
      }else{
        const index = selectedValue.indexOf(e.target.value);
        if (index > -1) {
          selectedValue.splice(index, 1);
      console.log('event.target.value',selectedValue.splice(index, 1))
      setValue('contract_type_id',selectedValue)
          setSelectedworkSituatuon([...selectedValue])
        }
      }
    }

    const handleSelectTime = (e) =>{
      let selectedValue = selectedhourTime;
      console.log('event.target.checked;',e.target.checked)
      console.log('event.target.value',e.target.value)
      if(e.target.checked){
        selectedValue.push(e.target.value)
        setSelectedhourTime([...selectedValue])
        setValue('hours_time',selectedValue)
      }else{
        const index = selectedValue.indexOf(e.target.value);
        if (index > -1) {
          selectedValue.splice(index, 1);
          console.log('event.target.value',selectedValue.splice(index, 1))
          setSelectedhourTime([...selectedValue])
          setValue('hours_time',selectedValue)
        }
      }
    }

  const onSiteChanged = e => {
    setUsetInfo({ ...usetInfo, designation_id: e.currentTarget.value });
    setselectedOption(e.currentTarget.value);
    setValue("designation_id",e.currentTarget.value)
  };


  const handleChange = (event) => {
    // alert(5)
      if (event.target.name == "profileimage") {
        setprofile_file(event.target.files[0]);
        // event.target.value = null;
      }

      if (event.target.name == "bannerimage") {
        setbanner_file(event.target.files[0]);
        
        // event.target.value = null;
      }
  }
useEffect(() => {
  if(profile_file && typeof profile_file == 'object'){
    const datas = new FormData();

    let photo = "profile_photo";
    let file = profile_file;

    datas.append('ref', 'user-information');
    datas.append('refId', data.id);
    datas.append('field', photo);
    datas.append('files', file);

    sendReq(datas, 'profile');
  }
    
  
}, [profile_file])
useEffect(() => {
  console.log('typeof',typeof banner_file)
  if(banner_file && typeof banner_file == 'object'){
    console.log('------',banner_file)

    const datas = new FormData();

    let photo = "banner_photo";
    let file = banner_file;

    datas.append('ref', 'user-information');
    datas.append('refId', data.id);
    datas.append('field', photo);
    datas.append('files', file);

    sendReq(datas, 'banner');
  }
}, [banner_file])


const sendReq = async (data, type) => {
    const upload_res = await axios({
        url: window.baseURL + '/upload',
        method: "POST",
        data
    });

    if (upload_res && upload_res.data[0]) {
        if (type == "profile") {
          // alert(3)
          setprofile_file(window.baseURL + upload_res.data[0].url);
        }

        if (type == "banner") {
            setbanner_file(window.baseURL + upload_res.data[0].url);
        }

    } else {
        alert("Somthing went wrong. Please try again.")
    }
}
 
  return (
    <>
    {console.log("userInfo ===>",data)
    }
      {data && (
        <div className="in_user_wrap">
          <div className="container">
            <div className="in_user_box">
              <div className="in_user_top" style={{backgroundImage: `url("${banner_file}")`}}>
                  <input
                        className="file-upload"
                        name="bannerimage"
                        id="bannerimage"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        multiple
                    />
                  <a className="edit-icon">
                  <i className="fe fe-camera"></i>
                  </a>
                 
                  {/* <div className="thumbnail-container">
                      <div className="thumbnail">
                        <img
                          src={banner_file}
                        />
                      </div>
                    </div> */}
              </div>
              <div className="user_bottom_sec">
                <div className="edit_in_dta">
                <a
                  href
                  className="edit-icon icon-plus shadow"
                  data-toggle="modal"
                  onClick={()=>{setAtivePopup(1)}}
                  data-target={"#editaboutinformation"}
                >
                  <i className="fe fe-edit-2"></i>
                </a>
                </div>
                <div className="user_left_sec">
                  <div className="use_image">
                  <div className="prof_in_dta">
              
                  <input
                        className="file-upload"
                        name="profileimage"
                        id="profileimage"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        multiple
                    />
                      <a
                  className="edit-icon icon-plus shadow"
                >
                  <i className="fe fe-camera"></i>
                </a>
                </div>
                    <div className="thumbnail-container">
                      <div className="thumbnail">
                        <img
                          src={profile_file}
                          alt="avtar"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="user_social">
                    <ul>
                      <li>
                        <a target="_blank" href={`mailto:${data.user_id.email}`}> 
                          <i className="fa fa-envelope"></i>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href={data.facebook_link}>
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                      <a target="_blank" href={data.twitter_link}>
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                      <a target="_blank" href={data.linkedin_link}>
                          <i className="fa fa-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="user_right_sec">
                  <h2 className="us_name">
                    {data?.user_id.firstname}
                    <span>{data?.user_id.lastname}</span>
                  </h2>
                  <ul className="user_role">
                    <li>
                      <span>Role:</span>
                      {data?.designation_id?.name}
                    </li>
                    <li>
                      <span>Location:</span>
                      {data.address}
                    </li>
                  </ul>
                  <div className="us_desc">
                    <p>{data.about}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* about popup */}
            <div
              className="modal edit-modal fade"
              id="editaboutinformation"
              data-backdrop="static"
              data-keyboard="false"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="editaboutinformationLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-scrollable"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="editaboutinformationLabel">
                      General Information
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={()=>{setAtivePopup(0)}}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="main_overlay_info_data">
                      <div className="main_over_poup">
                        <div className="item_main">
                          <div className="item_in_info">
                            <div
                              className="item_left_info"
                              style={{ width: "100%" }}
                            >
                              <div className="item_form">
                                <form
                                  style={{ mexHeight: "unset" }}
                                  onSubmit={handleSubmit(submit)}
                                >
                                  <div className="item_form_wrap">
                                    <h2 className="form_title">
                                      What's Your Name?
                                    </h2>
                                    <div className="row">
                                      <div className="col-md-6">
                                      <div className="f_group">
                                      <input
                                        className="f_control"
                                        type="text"
                                        name="firstname"
                                        placeholder="First Name"
                                        {...register("firstname")}
                                        defaultValue={data?.user_id.firstname}
                                        onChange={e => handleUserInput(e)}
                                      />
                                    </div>
                                    <p style={{color: 'red'}} > {errors.firstname ? errors.firstname.message : ""} </p>
                                      </div>
                                      <div className="col-md-6">
                                      <div className="f_group">
                                      <input
                                        className="f_control"
                                        type="text"
                                        name="lastname"
                                        placeholder="Last Name"
                                        defaultValue={data?.user_id.lastname}
                                        {...register("lastname")}
                                        onChange={e => handleUserInput(e)}
                                      />
                                    </div>
                                    <p style={{color: 'red'}} > {errors.lastname ? errors.lastname.message : ""} </p>
                                        </div>
                                    </div>
                                 
                                    
                                   
                                    
                                  </div>
                                  
                                  <div className="row my-3">
                                  <div className="col-12 col-md-12">
                                    <h2 className="form_title">
                                      Tell Us About Yourself.
                                    </h2>
                                    <div className="f_group">
                                      <textarea
                                        className="f_control"
                                        type="text"
                                        defaultValue={data.about}
                                        placeholder="Write a bio..."
                                        // {...register("about")}
                                        name="about"
                                        onChange={(e) => handleUserInput(e)}
                                      />
                                    </div>
                                  </div>
                                   </div>
                                  
                                  <h2 className="form_title mt-3">
                                    What is Your Role?
                                  </h2>
                                  <div className="role_box_wrap">
                                    {console.log("check ==>", selectedOption)}
                                    {designations.map((role, i) => (
                                      <div
                                        className={`role_box_list ${
                                          selectedOption == role.id
                                            ? "active"
                                            : ""
                                        }`}
                                      >
                                        <label className="role_box_list_data">
                                          <input
                                            type="radio"
                                            name="role"
                                            hidden
                                            // defaultChecked = {role.id === data?.designation_id.id }
                                             {...register("designation_id")}
                                            value={role.id}
                                            onChange={onSiteChanged}
                                          />
                                          <img
                                            src={
                                              axios.defaults.baseURL +
                                              role.image.url
                                            }
                                            alt={role.alternativeText}
                                          />
                                          <span className="role_name">
                                            {role.name}
                                          </span>
                                        </label>
                                      </div>
                                    ))}
                                    <p style={{color: 'red'}} > {errors.designation_id ? "Please select anyone role" : ""} </p>
                                  </div>

                                  
                                  <h2 className="form_title mt-3">
                                    Where are You Located?
                                  </h2>
                                  <div className="f_group p_relative m_relative">
                                    <GooglePlacesAutocomplete
                                      placeholder="Enter a Location"
                                      apiKey={
                                        "AIzaSyC_jsl4AwbLyzmnmKAh5puxKPqVlh9eN7I"
                                      }
                                      defaultValue={data.address}
                                      selectProps={{
                                        Location,
                                        onChange: locationChange
                                      }}
                                    />
                                    <i className="fa fa-map-marker"></i>
                                  </div>
                                  <div className="row">
                                    <div className="col-12 col-md-6">
                                      <div className="form-group">
                                        <label
                                          className="form-label"
                                          htmlFor="facebook_link"
                                        >
                                          Facebook Link
                                        </label>
                                        <input
                                          className="form-control"
                                          id="facebook_link"
                                          name="facebook_link"
                                          // value={this.state.facebook_link} onChange={(event) => this.handleUserInput(event)} type="text"
                                          onChange={(event) => {setUsetInfo({...usetInfo,facebook_link:event.target.value})}} type="text"
                                          defaultValue={data.facebook_link}
                                          placeholder="Facebook Link "
                                        />
                                      </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                      <div className="form-group">
                                        <label
                                          className="form-label"
                                          htmlFor="twitter_link"
                                        >
                                          Twitter Link
                                        </label>
                                        <input
                                          className="form-control"
                                          id="twitter_link"
                                          name="twitter_link"
                                          type="text"
                                          onChange={(event) => {setUsetInfo({...usetInfo,twitter_link:event.target.value})}} type="text"
                                          defaultValue={data.twitter_link}
                                          // value={this.state.twitter_link} onChange={(event) => this.handleUserInput(event)}
                                          placeholder="Twitter Link "
                                        />
                                      </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                      <div className="form-group">
                                        <label
                                          className="form-label"
                                          htmlFor="linkedin_link"
                                        >
                                          Linkedin Link
                                        </label>
                                        <input
                                          className="form-control"
                                          id="linkedin_link"
                                          name="linkedin_link"
                                          type="text"
                                          onChange={(event) => {setUsetInfo({...usetInfo,linkedin_link:event.target.value})}} type="text"
                                          defaultValue={data.linkedin_link}
                                          // value={this.state.linkedin_link} onChange={(event) => this.handleUserInput(event)}
                                          placeholder="Linkedin Link "
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-12 justify-content-end d-flex">
                                      <button
                                        className="btn btn-primary mb-6 mt-6 mb-md-0 lift"
                                        type="submit"
                                        // onClick={() => submit()}
                                      >
                                        Save
                                      </button>
                                      <button
                                        className="btn btn-danger ml-2 mb-6 mt-6 mb-md-0 lift"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                        onClick={()=>{setAtivePopup(0)}}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* about popup end */}
            <div className="exp_box_wrap">
              <div className="row">
                <div className="col-md-6 ind-col">
                  <div className="ex_box">
                    <div className="ex_box_title">
                      <h2 className="ex_title">Work Experience</h2>
                      <div className="box_right_data">
                        {/* <span>8 Years</span> */}
                        {workHistData.length > 0 && workHistData[0].job_title &&
                        <>
                        <span>
                          {totalExp > 1 && totalExp + " Years"}
                          {totalExp <= 1 && totalExp + " Year"}
                        </span>
                        <span className="ex_ttl">TOTAL</span></>}
                      </div>
                    </div>
                    <a
                      href
                      className="edit-icon icon-plus shadow"
                      data-toggle="modal"
                      onClick={()=>{setAtivePopup(2)}}
                      data-target={"#workExpinfo"}
                    >
                      <i className="fe fe-edit-2"></i>
                    </a>
                    {workHistData && workHistData.length > 0  && workHistData[0].job_title ?
                      workHistData.map((work, i) => (
                        
                        work.job_title &&
                        <>
                          <div className="box_list_info">
                            <div className="box_list_left_data">
                              <ul>
                                <li className="b_name">{work.job_title}</li>
                                <li className="b_name_data">
                                  {work.place_work}
                                </li>
                              </ul>
                            </div>
                            <div className="box_list_right_data">
                              <ul>
                                {/* <li className="b_name">5 Years</li>
                                 */}
                                <li className="b_name">
                                  {workHist &&
                                    workHist.length > 0 &&
                                    format(new Date(work.end_date), "yyyy") -
                                      format(new Date(work.start_date), "yyyy")}
                                  {workHist &&
                                  workHist.length > 0 &&
                                  format(new Date(work.end_date), "yyyy") -
                                    format(new Date(work.start_date), "yyyy") >
                                    1
                                    ? "Years"
                                    : " Year"}
                                </li>
                                <li className="b_name_data">
                                  {workHist &&
                                    workHist.length > 0 &&
                                    format(
                                      new Date(work.start_date),
                                      "yyyy"
                                    )}{" "}
                                  - {format(new Date(work.end_date), "yyyy")}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </>
                        
                        
                      )) : <div className="box_list_info">
                      No record found
                    </div>}
                  </div>
                </div>

                {/* work popup start */}
                <div
                  className="modal edit-modal fade"
                  id="workExpinfo"
                  data-backdrop="static"
                  data-keyboard="false"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="workExpinfoLabel"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-scrollable"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="workExpinfoLabel">
                          Work History Information
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={()=>{setAtivePopup(0)}}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="main_overlay_info_data">
                          <div className="main_over_poup">
                            <div className="item_main">
                              <div className="item_in_info">
                                <div
                                  className="item_left_info"
                                  style={{ width: "100%" }}
                                >
                                  <div className="item_form">
                                    <form
                                      style={{ mexHeight: "unset" }}
                                      onSubmit={handleSubmit(workSubmit)}
                                      
                                    >
                                      <div className="item_form_wrap">
                                        <h2 className="form_title">
                                          Your Work Experience:
                                        </h2>
                                        
                                        <div className="educationSection">
                                        
                                          {workHistData &&
                                            workHistData.map((work, i) => (
                                              <div key={i}>
                                              {console.log("work ==>",work)
                                              }
                                                <div className="row work_row">
                                                  <div className="col-sm-6">
                                                    <div className="f_group">
                                                      <input
                                                        className="f_control"
                                                        type="text"
                                                        placeholder="Job Title (Most Recent)"
                                                        name="job_title"
                                                        defaultValue={
                                                          work.job_title
                                                        }
                                                        {...register(`workHistData[${i}].job_title`)}
                                                        onChange={e =>
                                                          workHistChange(e, i)
                                                        }
                                                      />
                                                      {errors && errors.workHistData && <p style={{ color: 'red' }} > {errors?.workHistData[i]?.job_title ? errors?.workHistData[i]?.job_title.message : ""} </p>}
                                                    </div>
                                                  </div>

                                                  <div className="col-sm-6">
                                                    <div className="f_group">
                                                      <input
                                                        className="f_control"
                                                        type="text"
                                                        placeholder="Place of Work"
                                                        defaultValue={
                                                          work.place_work
                                                        }
                                                        name="place_work"
                                                        {...register(`workHistData[${i}].place_work`)}
                                                        onChange={e =>
                                                          workHistChange(e, i)
                                                        }
                                                      />
                                                       {errors && errors.workHistData && <p style={{ color: 'red' }} > {errors?.workHistData[i]?.place_work ? errors?.workHistData[i]?.place_work.message : ""} </p>}
                                                    </div>
                                                  </div>

                                                  <div className="col-sm-6">
                                                    <div className="f_group">
                                                    <input
                                                        className="f_control"
                                                        type="month"
                                                        placeholder="mm/yyyy"
                                                        name="start_date"
                                                        {...register(`workHistData[${i}].start_date`)}
                                                        onChange={e =>
                                                          workHistChange(e, i)
                                                        }
                                                        // defaultValue ={'2020-11'}
                                                        defaultValue ={format(new Date(work.start_date), "yyyy-MM")}
                                                      />
                                                       {errors && errors.workHistData && <p style={{ color: 'red' }} > {errors?.workHistData[i]?.start_date ? errors?.workHistData[i]?.start_date.message : ""} </p>}
                                                    </div>
                                                  </div>

                                                  <div className="col-sm-6">
                                                    <div className="f_group">
                                                    <input
                                                        className="f_control"
                                                        type="month"
                                                        placeholder="mm/yyyy"
                                                        name="end_date"
                                                        {...register(`workHistData[${i}].end_date`)}
                                                        onChange={e =>
                                                          workHistChange(e, i)
                                                        }
                                                        min={dateLimit[i]}
                                                        defaultValue = {format(new Date(work.end_date), "yyyy-MM")}
                                                      />
                                                      {errors && errors.workHistData && <p style={{ color: 'red' }} > {errors?.workHistData[i]?.end_date ? errors?.workHistData[i]?.end_date.message : ""} </p>}
                                                    </div>
                                                  </div>
                                                </div>
                                                {
                                                  i > 0 &&
                                                    <p
                                                      onClick={() =>
                                                        deleteJobField(i)
                                                      }
                                                      className="addedu"
                                                    >
                                                      {" "}
                                                      - Remove Field
                                                    </p>
                                                  }
                                              </div>
                                            ))}

                                            
                                        </div>
                                        <p className="addedu" onClick={addJob}>
                                          {" "}
                                          + Add Experience
                                        </p>
                                      </div>
                                      <div className="row">
                                        <div className="col-12 justify-content-end d-flex">
                                          <button
                                            className="btn btn-primary mb-6 mt-6 mb-md-0 lift"
                                            type="submit"
                                            // onClick={() => this.submit()}
                                          >
                                            Save
                                          </button>
                                          <button
                                            className="btn btn-danger ml-2 mb-6 mt-6 mb-md-0 lift"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                            onClick={()=>{setAtivePopup(0)}}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* wrok pop end */}

                <div className="col-md-6 ind-col">
                  <div className="ex_box">
                    <div className="ex_box_title">
                      <h2 className="ex_title">Education</h2>
                    </div>
                    <a
                      href
                      className="edit-icon icon-plus shadow"
                      data-toggle="modal"
                      onClick={()=>{setAtivePopup(3)}}
                      data-target={"#educationinfo"}
                    >
                      <i className="fe fe-edit-2"></i>
                    </a>

                    {educationData && educationData.length > 0 && educationData[0].degree ? educationData.map((edu, i) => (
                      edu.degree ?
                      <div className="box_list_info">
                      
                        <div className="box_list_left_data">
                          <ul>
                            <li className="b_name">
                              {edu.degree}
                            </li>
                            <li className="b_name_data">
                              {edu.institution}
                            </li>
                          </ul>
                        </div>
                        <div className="box_list_right_data">
                          <ul>
                            <li className="b_name text-right">
                              {format(
                                new Date(edu.year_graduation),
                                "yyyy"
                              )}
                            </li>

                            <li className="b_name_data"></li>
                          </ul>
                        </div>
                      </div>
                      :
                      ''
                    )): <div className="box_list_info">
                    No record found
                  </div>}
                  </div>
                </div>

                {/* education popup start */}

                <div
                  className="modal edit-modal fade"
                  id="educationinfo"
                  data-backdrop="static"
                  data-keyboard="false"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="educationinfoLabel"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-scrollable"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="educationinfoLabel">
                          Education Information
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={()=>{setAtivePopup(0)}}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="main_overlay_info_data">
                          <div className="main_over_poup">
                            <div className="item_main">
                              <div className="item_in_info">
                                <div
                                  className="item_left_info"
                                  style={{ width: "100%" }}
                                >
                                  <div className="item_form">
                                    <form
                                      style={{ mexHeight: "unset" }}
                                      // onSubmit={e => eduSubmit(e)}
                                      onSubmit={handleSubmit(eduSubmit)}
                                    >
                                      <div className="item_form_wrap">
                                        <h2 className="form_title">
                                          Your Educational History:
                                        </h2>
                                        <div className="educationSection">
                                          {educationData.map((edu, i) => (
                                            <div key={i}>
                                              <div className="f_group">
                                                <input
                                                  className="f_control"
                                                  type="text"
                                                  defaultValue={
                                                    educationData[i].degree
                                                  }
                                                  {...register(`educationData[${i}].degree`)}
                                                  placeholder="Degree/Diploma"
                                                  name="degree"
                                                  onChange={(e) => educationChange(e,i)}
                                                />
                                                { errors && errors.educationData && <p style={{color: 'red'}} > {errors?.educationData[i]?.degree ? errors?.educationData[i]?.degree.message : ""} </p>} 
                                              </div>

                                              <div className="f_group">
                                                <input
                                                  className="f_control"
                                                  type="text"
                                                  defaultValue={
                                                    educationData[i].institution
                                                  }
                                                  {...register(`educationData[${i}].institution`)}
                                                  placeholder="Institution"
                                                  name="institution"
                                                  onChange={(e) => educationChange(e,i)}
                                                />
                                                 { errors && errors.educationData && <p style={{color: 'red'}} > {errors?.educationData[i]?.institution ? errors?.educationData[i]?.institution.message : ""} </p>} 
                                              </div>

                                              <div className="f_group p_relative">
                                              <input
                                                        className="f_control"
                                                        type="month"
                                                        placeholder="mm/yyyy"
                                                        name="year_graduation"
                                                        {...register(`educationData[${i}].year_graduation`)}
                                                        onChange={e =>
                                                          educationChange(e, i)
                                                        }
                                                        defaultValue = {format(new Date(educationData[i].year_graduation), "yyyy-MM")}
                                                      />
                                              </div>
                                              {
                                                  i > 0 &&
                                                    <p
                                                      onClick={() =>
                                                        deleteField(i)
                                                      }
                                                      className="addedu"
                                                    >
                                                      {" "}
                                                      - Remove Field
                                                    </p>
                                                  }
                                            </div>
                                          ))}
                                        </div>
                                        <p className="addedu" onClick={addEdu}>
                                          {" "}
                                          + Add Education
                                        </p>
                                      </div>
                                      <div className="row">
                                        <div className="col-12 justify-content-end d-flex">
                                          <button
                                            className="btn btn-primary mb-6 mt-6 mb-md-0 lift"
                                            type="submit"
                                            // onClick={() => this.submit()}
                                          >
                                            Save
                                          </button>
                                          <button
                                            className="btn btn-danger ml-2 mb-6 mt-6 mb-md-0 lift"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                            onClick={()=>{setAtivePopup(0)}}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* education popup end */}
                <div className="col-md-6 ind-col">
                  <div className="ex_box">
                    <div className="ex_box_title">
                      <h2 className="ex_title">Skills</h2>
                    </div>
                    <a
                      href
                      className="edit-icon icon-plus shadow"
                      data-toggle="modal"
                      onClick={()=>{setAtivePopup(4)}}
                      data-target={"#skillInfo"}
                    >
                      <i className="fe fe-edit-2"></i>
                    </a>
                    <div className="box_list_info border-0 pt-0">
                      <div className="skill_dta">
                        <ul>
                          {data &&
                            data.skillset_type_id.length > 0 ?
                            data.skillset_type_id.map((element, i) => {
                              return (
                                element,
                                skill.map(val =>
                                  val.id == element ? (
                                    <li>
                                      {" "}
                                      <Link to="/#">{val.title}</Link>{" "}
                                    </li>
                                  ) : (
                                    ""
                                  )
                                )
                              );
                            }) : 'No record found'}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Skill popup start */}
                <div
                  className="modal edit-modal fade"
                  id="skillInfo"
                  data-backdrop="static"
                  data-keyboard="false"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="skillInfo"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-scrollable"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="skillInfo">
                          Skill Information
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={()=>{setAtivePopup(0)}}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="card-body p-0">
                          <form style={{ mexHeight: "unset" }}  onSubmit={handleSubmit(submit)}>
                            <input
                              type="hidden"
                              id="userinfoid"
                              name="userinfoid"
                              // value={this.state.userinfoid}
                            />
                            <div className="row">
                              <div className="skill_wrap">
                                <ul>
                                  {skill.map((skill, i) => (
                                    // .indexOf(skill.id) > -1 ? 'active' : ''
                                    <li
                                      className={`${
                                        selectSkill && selectSkill.find(
                                          element => element == skill.id
                                        )
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      <label>
                                        <input
                                          type="checkbox"
                                          hidden
                                          value={skill.id}
                                          {...register("skillset_type_id")}
                                          onChange={e => {
                                          handleSelectSkill(e);
                                          }}
                                        />
                                        {skill.title}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                <p style={{color: 'red'}} > {errors.skillset_type_id ? "Select atleast one option of your interest" : ""} </p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 justify-content-end d-flex">
                                <button
                                  className="btn btn-primary mb-6 mt-6 mb-md-0 lift"
                                  type="submit"
                                  // onClick={() => this.submit()}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-danger ml-2 mb-6 mt-6 mb-md-0 lift"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  onClick={()=>{setAtivePopup(0);setSelectSkill(data?.skillset_type_id ? data?.skillset_type_id:[])}}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* skill popup end*/}
                <div className="col-md-6 ind-col">
                  <div className="ex_box pre-box">
                    <div className="ex_box_title">
                      <h2 className="ex_title">Preferences</h2>
                    </div>
                    <a
                      href
                      className="edit-icon icon-plus shadow"
                      data-toggle="modal"
                      onClick={()=>{setAtivePopup(5)}}
                      data-target={"#preferencesinfo"}
                    >
                      <i className="fe fe-edit-2"></i>
                    </a>
                    <div className="box_list_info">
                    {((data?.contract_type_id && data?.contract_type_id.length > 0) || (data && data?.office_type_id != '')  || (data?.hours_time && data?.hours_time.length > 0)) ? 
                          <>
                      <div className="box_list_left_data">
                        <ul>
                          
                          <li className="b_name">Ideal working situation</li>
                          <li className="b_name_data">
                            {data?.contract_type_id &&
                              data?.contract_type_id.length > 0 &&
                              data?.contract_type_id.map((element, i) => {
                                return (
                                  element,
                                  workSituatuon.map(val =>
                                    val.id == data?.contract_type_id[i]
                                      ? i > 0
                                        ? ", " + val.title.toString()
                                        : val.title.toString()
                                      : ""
                                  )
                                );
                              })}
                          </li>
                          
                        </ul>
                      </div>
                      <div className="box_list_right_data">
                        <ul>
                          <li className="b_name">Ideal work environment</li>
                          {data && data?.office_type_id.map(dataOffice => (
                            <li className="b_name_data">
                              {/* {data.office_type_id.toString()} */}
                              {dataOffice}
                            </li>
                          ))}
                        </ul>
                      </div>
                      </> : 'No record found' }
                    </div>
                    {data?.hours_time && data?.hours_time.length > 0 &&
                        <div className="box_list_info">
                          <div className="box_list_left_data">
                            <ul>
                              <li className="b_name">Availability</li>
                              <li className="b_name_data">
                                {data?.hours_time &&
                                  data?.hours_time.length > 0 &&
                                  data?.hours_time.map((element, i) => {
                                    return (
                                      element,
                                      availability.map(val =>
                                        val.id == data?.hours_time[i]
                                          ? i > 0
                                            ? ", " + val.title.toString()
                                            : val.title.toString()
                                          : ""
                                      )
                                    );
                                  })}{" "}
                                {/* ,{" "} */}
                              </li>
                            </ul>
                          </div>
                          {/* <div className="box_list_right_data">
                            <ul>
                              <li className="b_name">Ideal commute distance</li>
                              <li className="b_name_data">20 KM or less</li>
                            </ul>
                          </div> */}
                        </div>
                    }
                  </div>
                </div>
                {/*Preferences popup start  */}
                <div
                  className="modal edit-modal fade"
                  id="preferencesinfo"
                  data-backdrop="static"
                  data-keyboard="false"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="preferencesinfoLabel"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-scrollable"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="preferencesinfoLabel">
                        Preferences Information
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          onClick={()=>{setAtivePopup(0)}}
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="main_overlay_info_data">
                          <div className="main_over_poup">
                            <div className="item_main">
                              <div className="item_in_info">
                                <div
                                  className="item_left_info"
                                  style={{ width: "100%" }}
                                >
                                  <div className="item_form">
                                    <form
                                      style={{ mexHeight: "unset" }}
                                      onSubmit={handleSubmit(submit)}
                                    >
                                      <h2 className="form_title">
                                        Your Ideal Working Situation:
                                      </h2>

                                      <div className="skill_wrap">
                                        <ul>
                                          {workSituatuon && workSituatuon.map((situation, i) => (
                                            <li
                                              className={`${
                                                selectedworkSituatuon && selectedworkSituatuon.find(
                                                  element =>
                                                    element == situation.id
                                                )
                                                  ? "active"
                                                  : ""
                                              }`}
                                            >
                                              <label>
                                                <input
                                                  type="checkbox"
                                                  {...register("contract_type_id")}
                                                  hidden
                                                  value={situation.id}
                                                  onChange={e => {
                                                    handleSelectSituation(e);
                                                  }}
                                                  checked={selectedworkSituatuon && selectedworkSituatuon.find(
                                                    element =>
                                                      element == situation.id
                                                  )
                                                    ? true
                                                    : false}
                                                />
                                                {situation.title}
                                              </label>
                                            </li>
                                          ))}
                                        </ul>
                                        <p style={{color: 'red'}} > {errors.contract_type_id ? "Select atleast one option of your interest" : ""} </p>
                                      </div>
                                      <div className="skill_wrap">
                                        <h2 className="form_title">
                                          Your Ideal Work Environment:
                                        </h2>

                                        <div className="idel_form">
                                          {officeType.map((type, i) => (
                                            <div class="InputGroup">
                                              <input
                                                type="radio"
                                                name={i + "size"}
                                                id={type.option_1}
                                                value={type.option_1}
                                                defaultChecked={selectedOfficeType && selectedOfficeType.find(
                                                  element =>
                                                    element == type.option_1
                                                )}
                                                onChange={e => {
                                                  handleSelectOfficeType(e,i)
                                                }}
                                              />
                                              <label for={type.option_1}>
                                                {type.option_1}
                                              </label>
                                              <input
                                                type="radio"
                                                name={i + "size"}
                                                id={type.option_2}
                                                value={type.option_2}
                                                checked={selectedOfficeType && selectedOfficeType.find(
                                                  element =>
                                                    element == type.option_2
                                                )}
                                                onChange={e => {
                                                  handleSelectOfficeType(e,i)
                                                }}
                                              />
                                              <label for={type.option_2}>
                                                {type.option_2}
                                              </label>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      <div className="skill_wrap">
                                        <h2 className="form_title">
                                          What's Your Availability?
                                        </h2>
                                        <ul>
                                          {availability.map((ave, i) => (
                                            <li
                                              className={`${
                                                selectedhourTime && selectedhourTime.find(
                                                  element => element == ave.id
                                                )
                                                  ? "active"
                                                  : ""
                                              }`}
                                            >
                                              <label>
                                                <input
                                                  type="checkbox"
                                                  // {...register("hours_time")}
                                                  onChange={e => {
                                                  handleSelectTime(e);
                                                  }}
                                                  hidden
                                                  value={ave.id}
                                                  checked={
                                                    selectedhourTime && selectedhourTime.find(
                                                      element => element == ave.id
                                                    )
                                                      ? true
                                                      : false
                                                  }
                                                />
                                                {ave.title}
                                              </label>
                                            </li>
                                          ))}
                                        </ul>
                                        <p style={{color: 'red'}} > {errors.hours_time ? "Select atleast one option of your interest" : ""} </p>
                                      </div>
                                      <div className="row">
                                        <div className="col-12 justify-content-end d-flex">
                                          <button
                                            className="btn btn-primary mb-6 mt-6 mb-md-0 lift"
                                            type="submit"
                                            // onClick={() => this.submit()}
                                          >
                                            Save
                                          </button>
                                          <button
                                            className="btn btn-danger ml-2 mb-6 mt-6 mb-md-0 lift"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                            onClick={()=>{setAtivePopup(0)}}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Preferences popup end */}
                <div className="col-12">
                  <div className="pr-bot-btn">
                     <a className="int_btn nt_btn" href="#" title="Not Interested">Not Interested</a>
                     <a className="int_btn gr_btn" href="#" title="Interested">Interested</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default IndividualUser;
