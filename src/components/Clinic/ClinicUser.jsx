import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import nl2br from "react-newline-to-break";
import axios from "axios";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-google-places-autocomplete";
import profile_pic from './../../images/clinic_profile.png'
import background_pic from './../../images/profile_banner.png'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ClinicUser(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState();
  const [designations, setDesignations] = useState([]);
  const [skill, setSkill] = useState([]);
  const [workSituatuon, setWorkSituatuon] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [images, setImages] = useState([]);
  const [officeType, setOfficeType] = useState([]);
  const [usetInfo, setUsetInfo] = useState([]);
  const [newImages, setnewImages] = useState([]);
  const [profile_file, setprofile_file] = useState()
  const [selectedOption, setselectedOption] = useState(0);
  const [banner_file, setbanner_file] = useState()
  const [activePopup, setAtivePopup] = useState();
  const df_profile_photo = profile_pic;
  const df_banner_photo = background_pic;
  useEffect(() => {
    getDesignation();
    getSkills();
    getWorkSituation();
    getavailability();
    getTypes();
  }, []);


  // validations start

  const validationSchema = yup.object().shape({}).when((values, schema) => {
    if(activePopup == 1){
      return schema.shape({
        clinicname: yup.string().required("Please enter clinic name"),
        practice_type: yup.string().required("Please Select a Type"),
        officetype: yup.array().of(yup.string()).min(1).required("Please select anyone option"),
      });
    }
    if(activePopup == 3){
      return schema.shape({
        skillset_type_id: yup.array().min(1),
        designation_id: yup.string().required("Please select anyone role"),
        clinical_experience: yup.string().required("Please add Your experience"),
        contract_type_id: yup.array().required('Select atleast one option of your interest').min(1),
        hours_time: yup.array().required('Select atleast one option of your interest').min(1),
      });
    }
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    register,
    watch
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
     ...data,
    },
  });

  console.log("temp",errors);
  

  // validations end

  const [selectSkill, setSelectSkill] = useState(data?.skillset_type_id ? data?.skillset_type_id : []);

  const [selectedworkSituatuon, setSelectedworkSituatuon] = useState(data?.contract_type_id ? data?.contract_type_id : []);

  const getDesignation = () => {
    axios
      .get("/designations")
      .then(response => {
        console.log("res", response);
        setDesignations(response.data);
      })
      .catch(function (error) {
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
      .catch(function (error) {
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
      .catch(function (error) {
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
      .catch(function (error) {
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
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };



  const handleUserInput = e => {
    console.log("data", e.target.name, e.target.value);

    const name = e.target.name;
    const value = e.target.value;
    // setdataSet(e.target.name = e.target.value)
    setUsetInfo({ ...usetInfo, [name]: value })
    console.log("e.target.name = e.target.value",e.target.name ,  e.target.value);

    if(e.target.name == "practice_type"){
      setValue("practice_type", e.target.value)
    }

  };
  const onSiteChanged = e => {
    setUsetInfo({ ...usetInfo, designation_id: e.currentTarget.value });
    setselectedOption(e.currentTarget.value);
    setValue("designation_id",e.currentTarget.value)
  };
  useEffect(() => {
    axios
      .get("user-informations", {
        params: {
          user_id: user.id
        }
      })
      .then(response => {
        // console.log("data", response.data);
        let userInfo = response.data[0];
        let office_type_id = userInfo.office_type_id ? userInfo.office_type_id.split(/\s*,\s*/) : [];
        userInfo.office_type_id = userInfo.office_type_id ? userInfo.office_type_id.split(/\s*,\s*/) : [];
        let skillset_type_id = userInfo.skillset_type_id ? userInfo.skillset_type_id.split(/\s*,\s*/) : [];
        userInfo.skillset_type_id = userInfo.skillset_type_id ? userInfo.skillset_type_id.split(/\s*,\s*/) : [];
        let contract_type_id = userInfo.contract_type_id ? userInfo.contract_type_id.split(/\s*,\s*/) : [];
        userInfo.contract_type_id = userInfo.contract_type_id ? userInfo.contract_type_id.split(/\s*,\s*/) : [];
        let hours_time = userInfo.hours_time ? userInfo.hours_time.split(/\s*,\s*/) : [];
        userInfo.hours_time = userInfo.hours_time ? userInfo.hours_time.split(/\s*,\s*/) : [];
        userInfo.id = userInfo.id;
        userInfo.clinic_photos = userInfo.clinic_photos;
        userInfo.facebook_link = userInfo.facebook_link;
        userInfo.twitter_link = userInfo.twitter_link;
        userInfo.linkedin_link = userInfo.linkedin_link;
        setselectedOption(userInfo?.designation_id?.id);
        
        console.log("userInfo", userInfo.practice_type);
        setprofile_file(userInfo.profile_photo ? window.baseURL + userInfo.profile_photo.url :  df_profile_photo)
        setbanner_file(userInfo.banner_photo ? window.baseURL + userInfo.banner_photo.url : df_banner_photo)
        setSelectedworkSituatuon(contract_type_id)
        setData(userInfo);
        // setUsetInfo(userInfo);
        setValue("practice_type", userInfo.practice_type)
        setValue("designation_id",userInfo.designation_id.id)
        setSelectSkill(skillset_type_id)
        setSelectedOfficeType(office_type_id)
        setSelectedhourTime(hours_time)
        setValue('skillset_type_id',userInfo.skillset_type_id)
        setValue('hours_time',userInfo.hours_time)
        setValue('officetype',userInfo.office_type_id)
      })
      .catch(error => {
        console.log("data", error);
      });
  }, []);

  const submit = (e) => {
    // e.preventDefault();

   console.log("userinfo",usetInfo);
     axios
       .put("users/" + data.user_id.id, {
         clinicname: usetInfo.clinicname,
         // lastname: usetInfo.lastname,
         // email: usetInfo.email,
         // phone: usetInfo.phone
       })
       .then(response => {
         // Handle success.
         localStorage.setItem("user", JSON.stringify(response.data));
         window.location.href = "/clinicprofile";
       })
       .catch(error => {
         // Handle error.
         console.log("An error occurred:", error.response);
       });
  
      
      
      console.log("putdata",data , usetInfo)
      axios.put('user-informations/' + data.id, {
      // user_id: userinfo.id,
      about: usetInfo.about,
      linkedin_link: data.linkedin_link,
      facebook_link: data.facebook_link,
      twitter_link: data.twitter_link,
      address: data.address,
      longitude: data.longitude.toString(),
      latitude: data.latitude.toString(),
      clinical_experience: usetInfo.clinical_experience,
      designation_id: usetInfo.designation_id,
      practice_type: usetInfo.practice_type,
      contract_type_id: selectedworkSituatuon.join(),
      hours_time: selectedhourTime.join(),
      skillset_type_id: selectSkill.join(),
      office_type_id: selectedOfficeType.join(),
    })
      .then(response => {
        // Handle success.
        window.location.href = "/clinicprofile";
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });
  };

 const photosUpload = (e) => {
  e.preventDefault();
  if(newImages.length > 0){
    for (let i = 0; i < newImages.length; i++) {
      console.log("loop");
      
      const dataFile = new FormData();
  
      let photo = "";
      let file = [];
  
      
      photo = "clinic_photos";
      
      file = newImages[i];
    
  
      dataFile.append('ref', 'user-information');
      dataFile.append('refId',data.id);
      dataFile.append('field', photo);
      dataFile.append('files', file);
      for (var key of dataFile.entries()) {
        console.log("test",  key[0] + ', ' + key[1])
      }
      const upload_res = axios.post("/upload",dataFile).then(res=>{
        if(i == (newImages.length - 1)){
          // setTimeout(() => {
          window.location.href = "/clinicprofile";
        // }, 100);
        }
      });
      
    }

  }else{
    // refresh
    window.location.href = "/clinicprofile";
  }
 }

  const handleChange = (event) => {
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
    if (profile_file && typeof profile_file == 'object') {
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
    console.log('typeof', typeof banner_file)
    if (banner_file && typeof banner_file == 'object') {
      console.log('------', banner_file)

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
        setprofile_file(window.baseURL + upload_res.data[0].url);
      }

      if (type == "banner") {
        setbanner_file(window.baseURL + upload_res.data[0].url);
      }

    } else {
      alert("Somthing went wrong. Please try again.")
    }
  }

  const [selectedOfficeType, setSelectedOfficeType] = useState(data?.office_type_id ? data?.office_type_id : []);

  const [selectedhourTime, setSelectedhourTime] = useState(data?.hours_time ? data?.hours_time : []);


  const handleSelectTime = (e) => {
    let selectedValue = selectedhourTime;
    console.log('event.target.checked;', e.target.checked)
    console.log('event.target.value', e.target.value)
    if (e.target.checked) {
      selectedValue.push(e.target.value)
      setSelectedhourTime([...selectedValue])
      setValue('hours_time',selectedValue)
    } else {
      const index = selectedValue.indexOf(e.target.value);
      if (index > -1) {
        selectedValue.splice(index, 1);
        console.log('event.target.value', selectedValue.splice(index, 1))
        setSelectedhourTime([...selectedValue])
        setValue('hours_time',selectedValue)
      }
    }
  }

  const locationChange = datas => {
    console.log("location", datas.label);
    let dataValue = data;
    dataValue.address = datas.label;
    setData(dataValue);
    console.log("dataValue =>",dataValue);
    
    // setValue('address',data.label)
    geocodeByAddress(datas.label)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) =>
      setData({ ...data, latitude: lat, longitude: lng })
      );
      // setValue('address',data.label)
  };

  const handleSelectOfficeType = (e, i) => {
    let selectedValue = selectedOfficeType;

    console.log("officeType", officeType[i]);


    if (e.target.value === officeType[i].option_1) {
      selectedValue.push(e.target.value)
      setSelectedOfficeType([...selectedValue])
      console.log("selectedValue", selectedValue);

      setValue('officetype',selectedValue)
      console.log("selectedOfficeTypeP", selectedOfficeType.indexOf(officeType[i].option_2));
      const index = selectedOfficeType.indexOf(officeType[i].option_2);
      if (index >= 0) {
        selectedOfficeType.splice(index, 1);
      }
      console.log('selectSkill', selectedOfficeType)
      setSelectedOfficeType([...selectedOfficeType])
    }

    if (e.target.value === officeType[i].option_2) {
      selectedValue.push(e.target.value)
      setSelectedOfficeType([...selectedValue])
      setValue('officetype',selectedValue)
      console.log("selectedOfficeType", selectedOfficeType);

      const index = selectedOfficeType.indexOf(officeType[i].option_1);
      if (index >= 0) {
        selectedOfficeType.splice(index, 1);
      }
      console.log('selectSkill', selectedOfficeType)
      setSelectedOfficeType([...selectedOfficeType])
    }
  }

  const handleSelectSituation = (e) => {
    let selectedValue = selectedworkSituatuon;
    console.log('event.target.checked;', e.target.checked)
    console.log('event.target.value', e.target.value)
    if (e.target.checked) {
      selectedValue.push(e.target.value)
      setSelectedworkSituatuon([...selectedValue])
      setValue('contract_type_id',selectedValue)
    } else {
      const index = selectedValue.indexOf(e.target.value);
      
      if (index > -1) {
        console.log("index",index);
        selectedValue.splice(index, 1);
        console.log('event.target.value.selectedValue', selectedValue)
        setSelectedworkSituatuon([...selectedValue])
        console.log("selectedValueppppp",selectedValue);
        setValue('contract_type_id',selectedValue)
      }
    }
  }

  const handleSelectSkill = (e) => {
    let selectedValue = selectSkill;
    console.log('event.target.checked;', selectedValue)
    console.log('event.target.value', e.target.value)
    if (e.target.checked) {
      selectedValue.push(e.target.value)
      console.log('selectSkill', selectedValue)
      setSelectSkill([...selectedValue])
      setValue('skillset_type_id',selectedValue)
    } else {
      const index = selectedValue.indexOf(e.target.value);
      if (index > -1) {
        selectedValue.splice(index, 1);
        console.log('event.target.value', selectedValue.splice(index, 1))
        setSelectSkill([...selectedValue])
        setValue('skillset_type_id',selectedValue)
      }
    }
  }

  const handleImages = async (event) => {
    console.log("photo",event.target.files);
    const files = event.target.files;
    let filesValue = []; 
    for (let i = 0; i < files.length; i++) {
        filesValue.push(files[i])
        setnewImages(filesValue)
        // setValue('clinicPhoto',filesValue)
    }
          
}

  return (
    <>
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
                  data-target={"#clinicInfo"}
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
                        <img src={profile_file} alt="Dental" />
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
                  <h2 className="us_name">{data?.user_id.clinicname}</h2>
                  <ul className="user_role">
                    <li>
                      <span>Type:</span>
                      {data.practice_type}
                    </li>
                    <li>
                      <span>Location:</span>
                      {data.address}
                    </li>
                  </ul>
                  <div className="us_desc">
                    <p>{data.about}</p>
                  </div>
                  <div className="user_btn">
                    <ul>
                      {console.log("{data?.office_type_id", data?.office_type_id)
                      }
                      {data?.office_type_id && data?.office_type_id.map(dataOffice => (
                        <li>
                          <Link to="/#">{dataOffice}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* part onr start */}
            <div
              className="modal edit-modal fade"
              id="clinicInfo"
              data-backdrop="static"
              data-keyboard="false"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="clinicInfoLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-scrollable"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="clinicInfoLabel">
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
                                      What is Your Clinic's Name?
                                    </h2>
                                    <div className="f_group">
                                      <input
                                        className="f_control"
                                        type="text"
                                        placeholder="Clinic Name"
                                        defaultValue={data?.user_id.clinicname}
                                        // error={!!errors.clinicname}
                                        {...register("clinicname")}
                                        onChange={(e) => handleUserInput(e)}
                                        name="clinicname"
                                      />
                                      <p style={{color: 'red'}} > {errors.clinicname ? errors.clinicname.message : ""} </p>
                                    </div>
                                  </div>
                                 
                                  {/* here */}
                                  <h2 className="form_title">
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
                                    <p style={{color: 'red'}} > {errors.address ? errors.address.message : ""} </p>
                                    </div>
                                 
                                  <h2 className="form_title">
                                    Are You a General or 
                                    Specialist Practice?
                                  </h2>

                                  <div className="idel_form">
                                    <div class="InputGroup">
                                      <input
                                        type="radio"
                                        name="size"
                                        id="size_1"
                                        value="General"
                                        {...register("practice_type")} 
                                        name="practice_type"
                                        onChange={(e) => handleUserInput(e)}
                                        name="practice_type"
                                        defaultChecked={data.practice_type === "General" ? true : false}
                                      />
                                      <label for="size_1">General</label>

                                      <input
                                        type="radio"
                                        name="size"
                                        id="size_2"
                                        value="Specialist"
                                        name="practice_type"
                                        name="practice_type"
                                        onChange={(e) => handleUserInput(e)}
                                        defaultChecked={data.practice_type === "Specialist" ? true : false}
                                      />
                                      <label for="size_2">Specialist</label>
                                    </div>
                                  </div>

                                 
                                  <div className="row my-5">
                                 
                                  <div className="col-12 col-md-12">
                                    <h2 className="form_title">
                                      Tell Us About Your Clinic.
                                    </h2>
                                    <label className="m_lable">
                                      (ie. Clinic culture, employee perks and
                                      benefits, clinic houes, etc.)
                                    </label>
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

                                  <div className="col-12 col-md-12 mt-4">
                                    <h2 className="form_title">
                                      Your Work Environment:
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
                                              handleSelectOfficeType(e, i)
                                            }}
                                          />
                                          <label for={type.option_1}>
                                            {type.option_1}
                                          </label>
                                          {console.log("selectedOfficeType", selectedOfficeType, data.office_type_id)
                                          }
                                          <input
                                            type="radio"
                                            name={i + "size"}
                                            id={type.option_2}
                                            value={type.option_2}
                                            defaultChecked={selectedOfficeType && selectedOfficeType.find(
                                              element =>
                                                element == type.option_2
                                            )}
                                            onChange={e => {
                                              handleSelectOfficeType(e, i)
                                            }}
                                          />
                                          <label for={type.option_2}>
                                            {type.option_2}
                                          </label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                              
                               
                                
                                  <div className="col-12 col-md-12 my-4 mt-5">
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
                                        defaultValue={data.facebook_link}
                                        onChange={(event) => { setData({ ...data, facebook_link: event.target.value }) }} type="text"

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
                                        defaultValue={data.twitter_link}
                                        onChange={(event) => { setData({ ...data, twitter_link: event.target.value }) }} type="text"

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
                                        onChange={(event) => { setData({ ...data, linkedin_link: event.target.value }) }} type="text"
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
            {/* part one end */}
            <div className="exp_box_wrap">
              <div className="row">
                <div className="col-md-12 ind-col">
                  <div className="ex_box ex_ph_box">
                    <div className="ex_box_title">
                      <h2 className="ex_title">Photos</h2>
                    </div>

                    <div className="ex_photos">
                      <div className="ex_photos_wrap">
                      <a
                  href
                  className="edit-icon icon-plus shadow"
                  data-toggle="modal"
                  // onClick={() => alert("clicked")}
                  data-target={"#imagePopup"}
                  onClick={()=>{setAtivePopup(2)}}
                >
                  <i className="fe fe-edit-2"></i>

                </a>
                        {data.clinic_photos && data.clinic_photos.length > 0 ?
                          data.clinic_photos.map(iamges => (
                            <div className="ex_photos_in">
                              <div className="thumbnail-container">
                                <div className="thumbnail">
                                  <img
                                    src={window.baseURL + iamges.url}
                                    alt="photos"
                                  />
                                </div>
                              </div>
                            </div>
                          ))

                          :
                          <div className="ex_photos_in">
                                No photo available
                          </div>
                        }

                      </div>
                    </div>
                  </div>
                </div>

                {/* image popup start */}

<div
              className="modal edit-modal fade"
              id="imagePopup"
              data-backdrop="static"
              data-keyboard="false"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="imagePopupLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-scrollable"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                  {console.log("newImages",newImages)
                  }
                    <h5 className="modal-title" id="imagePopupLabel">
                      Images
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
                                  onSubmit={(e) => photosUpload(e)}
                                >
                                  <div className="item_form_wrap">
                                    <h2 className="form_title">
                                      Images List
                                    </h2>
                                    <div className="f_group">
                                    <div className="ex_photos">
                                    <div className="ex_photos_wrap">

                                    {data.clinic_photos && data.clinic_photos.length > 0 ?
                          data.clinic_photos.map(iamges => (
                            
                                <div className="ex_photos_in">
                                  <div className="thumbnail-container">
                                    <div className="thumbnail">
                                      <img
                                        src={window.baseURL + iamges.url}
                                        alt="photos"
                                      />
                                    </div>
                                  </div>
                            </div>
                            
                          ))
                          

                          :
                            "No images found"
                        }
                        </div>
                            </div>
                                    </div>
                                  </div>
                                 <hr />
                                  {/* here */}
                                  <h2 className="form_title">
                                    Add New Images
                                  </h2>
                                 
                                 
                                  <div className="item_form_wrap">
                <div class="fileUpload">
                {/* <img className="up_img" src={banner_photo} 
                alt={name}
                 /> */}
                        <input
                            className="file-upload"
                            name="bannerimage"
                            id="bannerimage"
                            type="file"
                            accept="image/*"
                            onChange={handleImages}
                            multiple
                        />
                  <span>
                    <i className="fa fa-plus"></i>
                  </span>
                </div>
              </div>
                                  <div className="row">
                                    <div className="col-12 justify-content-end d-flex">
                                      <button
                                        className="btn btn-primary mb-6 mt-6 mb-md-0 lift"
                                        type="submit"
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

                {/* image popup end */}

                <div className="col-12">
                  <h2 className="ex_title">Active Postings</h2>
                </div>

                <div className="col-md-6 ind-col">
                  <div className="ex_box">
                    <a
                      href
                      className="edit-icon icon-plus shadow"
                      data-toggle="modal"
                      onClick={()=>{setAtivePopup(3)}}
                      data-target={"#expEditInfo"}
                    >
                      <i className="fe fe-edit-2"></i>
                    </a>
                    {(data?.skillset_type_id &&
                            data?.skillset_type_id.length > 0 ) ||(data?.hours_time &&
                              data?.hours_time.length > 0) ?
                              <>
                    <div className="ex_box_title">
                      <h2 className="ex_title">{data?.designation_id?.name}</h2>
                      <div className="box_right_data">
                        <span>{data.clinical_experience} Years</span>
                        <span className="ex_ttl">Experience Required</span>
                      </div>
                    </div>
                   
                              {data?.skillset_type_id &&
                              data?.skillset_type_id.length > 0 &&
                    <div className="box_list_info">
                      <div className="skill_dta">
                        <h2 className="sk_tit">Skills Required</h2>
                        <ul>
                          {/* <Link to="/#">{data.skillset_type_id}</Link> */}
                          {data?.skillset_type_id &&
                            data?.skillset_type_id.length > 0 ?
                            data?.skillset_type_id.map((element, i) => {
                              return (
                                element,
                                skill.map(val =>
                                  val.id == data?.skillset_type_id[i] ? (
                                    <li>
                                      {" "}
                                      <Link to="/#">{val.title}</Link>{" "}
                                    </li>
                                  ) : (
                                    ""
                                  )
                                )
                              );
                            }): 'No record found'}
                        </ul>
                      </div>
                    </div>
}
                    {data?.hours_time &&
                              data?.hours_time.length > 0 &&
                    <div className="box_list_info border-0 pt-0">
                      <div className="box_list_right_data">
                        <ul>
                          <li className="b_name_data">
                            Availability Requirements
                          </li>
                          <li className="b_name">
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
                          </li>
                          <li className="b_name">
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
                    </div>
                    }
                    </>
                    :"No record found"}
                  </div>
                  {/* here */}
                  <div
                    className="modal edit-modal fade"
                    id="expEditInfo"
                    data-backdrop="static"
                    data-keyboard="false"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="expEditInfo"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-scrollable"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="expEditInfo">
                          Preferences Information
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
                          <div className="card-body p-0 main_overlay_info_data">
                            <div className="main_over_poup">
                              <div className="item_main">
                                <div className="item_in_info">
                                  <div
                                    className="item_left_info"
                                    style={{ width: "100%" }}
                                  >
                                    <div className="item_form">
                                      <div className="item_form">
                                        <form style={{ mexHeight: "unset" }}
                                          onSubmit={handleSubmit(submit)}
                                        >
                                          <h2 className="form_title">
                                            What is Your Role?
                                          </h2>
                                          <div className="role_box_wrap">
                                            {console.log("check ==>", selectedOption)}
                                            {designations.map((role, i) => (
                                              <div
                                                className={`role_box_list ${selectedOption == role.id
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
                                            {/* <p style={{color: 'red'}} > {errors.designation_id ? "Please select anyone role" : ""} </p> */}
                                          </div>

                                          <h2 className="form_title mt-5">
                                            What Skills are You Looking For?
                                          </h2>

                                          <input
                                            type="hidden"
                                            id="userinfoid"
                                            name="userinfoid"
                                          />
                                          <div className="row">
                                            <div className="skill_wrap col-12">
                                              <ul>
                                                {console.log("selectSkill",selectSkill)
                                                }
                                                {skill.map((skill, i) => (
                                                  <li
                                                    className={`${selectSkill && selectSkill.find(
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
                                                        checked={selectSkill && selectSkill.find(
                                                          element => element == skill.id
                                                        )
                                                          ? true
                                                          : false
                                                          }
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
                                            <div className="item_form_wrap col-12 mt-5">
                                              <h2 className="form_title">Years of Experience Required:</h2>
                                              <label>Enter a specific amount or a range.</label>

                                              <div className="f_group km_group">
                                                <input className="f_control"
                                                  defaultValue={data.clinical_experience}
                                                  type="number" placeholder="1" min="1"
                                                  {...register("clinical_experience")}
                                                  onChange={(e) => handleUserInput(e)}
                                                  name="clinical_experience"
                                                />
                                                <label>Years</label>
                                              </div>
                                            </div>

                                          </div>
                                          <div className="item_form_wrap">
                                            <h2 className="form_title"> Hours Required for This Position:</h2>

                                            <div className="skill_wrap">
                                              <ul>
                                                {workSituatuon.map((situation, i) => (
                                                  <li
                                                    className={`${selectedworkSituatuon && selectedworkSituatuon.find(
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
                                                          : false
                                                          }
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

                                                {availability.map((ave, i) => (
                                                  <li
                                                    className={`${selectedhourTime && selectedhourTime.find(
                                                      element => element == ave.id
                                                    )
                                                      ? "active"
                                                      : ""
                                                      }`}
                                                  >
                                                    <label>
                                                      <input
                                                        type="checkbox"
                                                        {...register("hours_time")}
                                                        onChange={e => {
                                                          handleSelectTime(e);
                                                        }}
                                                        hidden
                                                        value={ave.id}
                                                        checked={selectedhourTime && selectedhourTime.find(
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
                                          </div>
                                          <div className="row">
                                            <div className="col-12 justify-content-end d-flex">
                                              <button
                                                className="btn btn-primary mb-6 mt-6 mb-md-0 lift"
                                                type="submit"
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
                  </div>
                  {/* end */}
                </div>
                
               

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
