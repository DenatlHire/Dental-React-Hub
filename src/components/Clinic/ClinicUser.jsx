import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import nl2br from "react-newline-to-break";
import axios from "axios";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByLatLng
} from "react-google-places-autocomplete";
import profile_pic from "./../../images/clinic_profile.png";
import background_pic from "./../../images/profile_banner.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getDesignation,
  getavailability,
  getWorkSituation,
  getTypes,
  deleteImages
} from "../Service";
import Swal from "sweetalert2";

export default function ClinicUser(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState();
  const userInfoValue = JSON.parse(localStorage.getItem("user-info"));
  const [designations, setDesignations] = useState([]);
  const [skill, setSkill] = useState([]);
  const [skillSelected, setSkillSelected] = useState([]);
  const [workSituatuon, setWorkSituatuon] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [images, setImages] = useState([]);
  const [officeType, setOfficeType] = useState([]);
  const [usetInfo, setUsetInfo] = useState([]);
  const [newImages, setnewImages] = useState([]);
  const [newImagesPreview, setnewImagesPreview] = useState([]);
  const [profile_file, setprofile_file] = useState();
  const [selectedOption, setselectedOption] = useState(0);
  const [banner_file, setbanner_file] = useState();
  const [activePopup, setAtivePopup] = useState();
  const [userSelectedSkill, setUserSelectedSkill] = useState([]);
  const df_profile_photo = profile_pic;
  const df_banner_photo = background_pic;
  const [selectedOfficeType, setSelectedOfficeType] = useState([]);
  const [AddressValue, setAddress] = useState('');

  useEffect(() => {
    getDesignation().then(res => {
      setDesignations(res);
    });
      getSkills();
      getSkillsSelected();
    getWorkSituation().then(res => {
      setWorkSituatuon(res);
    });
    getavailability().then(res => {
      setAvailability(res);
    });
    getTypes().then(res => {
      setOfficeType(res);
    });
  }, [selectedOption]);


  // get skills
  const getSkillsSelected = () => {
    axios
    .get("/skillset-types").then(response => {
        console.log("res", response);
        setSkillSelected(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };
  const getSkills = () => {
    axios
    .get("/skillset-types",{params: {
      designation_id: selectedOption
      }}).then(response => {
        console.log("res", response);
        setSkill(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };
  // validations start

  const validationSchema = yup
    .object()
    .shape({})
    .when((values, schema) => {
      if (activePopup == 1) {
        return schema.shape({
          clinicname: yup.string().required("Please enter clinic name"),
          practice_type: yup.string().required("Please Select a Type"),
          officetype: yup
            .array()
            .of(yup.string())
            .min(1)
            .required("Please select anyone option")
        });
      }
      if (activePopup == 3) {
        return schema.shape({
          skillset_type_id: yup.array().min(1),
          designation_id: yup.string().required("Please select anyone role"),
          clinical_experience: yup
            .number()
            .typeError("Please enter a valid year")
            .min(0, "Please enter a valid year"),
          contract_type_id: yup
            .array()
            .required("Select atleast one option of your interest")
            .min(1),
          hours_time: yup
            .array()
            .required("Select atleast one option of your interest")
            .min(1)
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
      ...data
    }
  });

  console.log("temp", errors);

  // validations end

  
  const [selectSkill, setSelectSkill] = useState(
    data?.skillset_type_id ? data?.skillset_type_id : []
  );

  const [selectSkillName, setSelectSkillName] = useState(
    data?.skillset_type_name ? data?.skillset_type_name : []
  );

  const [selectedworkSituatuon, setSelectedworkSituatuon] = useState(
    data?.contract_type_id ? data?.contract_type_id : []
  );

  const [selectedworkSituatuonName, setSelectedworkSituatuonName] = useState(
    data?.contract_type_name ? data.contract_type_name : []
  );


  const handleUserInput = e => {
    console.log("data", e.target.name, e.target.value);

    const name = e.target.name;
    const value = e.target.value;
    // setdataSet(e.target.name = e.target.value)
    setUsetInfo({ ...usetInfo, [name]: value });
    console.log(
      "e.target.name = e.target.value",
      e.target.name,
      e.target.value
    );

    if (e.target.name == "practice_type") {
      setValue("practice_type", e.target.value);
    }
  };
  const onSiteChanged = e => {
    
    setUsetInfo({ ...usetInfo, designation_id: e.currentTarget.value });
    if(e.currentTarget.value != data?.designation_id?.id){
      setSelectSkill([]);
    }else{
      setSelectSkill(userSelectedSkill);
    }
    setselectedOption(e.currentTarget.value);
    setValue("designation_id", e.currentTarget.value);
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
        localStorage.setItem("user-info", JSON.stringify(userInfo));
        let office_type_id = userInfo.office_type_id
          ? userInfo.office_type_id.split(/\s*,\s*/)
          : [];
          console.log('====>',office_type_id);
        userInfo.office_type_id = userInfo.office_type_id
          ? userInfo.office_type_id.split(/\s*,\s*/)
          : [];
          setSelectedOfficeType(userInfo.office_type_id);
          let skillset_type_id = userInfo.skillset_type_id
          ? userInfo.skillset_type_id.split(/\s*,\s*/)
          : [];
        userInfo.skillset_type_id = userInfo.skillset_type_id
          ? userInfo.skillset_type_id.split(/\s*,\s*/)
          : [];
          setUserSelectedSkill(userInfo.skillset_type_id)
        let contract_type_id = userInfo.contract_type_id
          ? userInfo.contract_type_id.split(/\s*,\s*/)
          : [];
        userInfo.contract_type_id = userInfo.contract_type_id
          ? userInfo.contract_type_id.split(/\s*,\s*/)
          : [];
        let hours_time = userInfo.hours_time
          ? userInfo.hours_time.split(/\s*,\s*/)
          : [];
        userInfo.hours_time = userInfo.hours_time
          ? userInfo.hours_time.split(/\s*,\s*/)
          : [];
        userInfo.id = userInfo.id;
        userInfo.clinic_photos = userInfo.clinic_photos;
        userInfo.facebook_link = userInfo.facebook_link;
        userInfo.twitter_link = userInfo.twitter_link;
        userInfo.linkedin_link = userInfo.linkedin_link;
        setselectedOption(userInfo?.designation_id?.id);

        console.log("userInfo", userInfo.practice_type);
        setprofile_file(
          userInfo.profile_photo
            ? window.baseURL + userInfo.profile_photo.url
            : df_profile_photo
        );
        setbanner_file(
          userInfo.banner_photo
            ? window.baseURL + userInfo.banner_photo.url
            : df_banner_photo
        );
        setSelectedworkSituatuon(contract_type_id);
        setData(userInfo);
        setAddress({"label":userInfo.address})
        setValue("practice_type", userInfo.practice_type);
        setValue("designation_id", userInfo.designation_id.id);
        setSelectSkill(skillset_type_id);
        
        setSelectedhourTime(hours_time);
        setSelectSkillName(userInfo.skillset_type_name ? userInfo.skillset_type_name.split(/\s*,\s*/) : [])
        setSelectedhourTimeName(userInfo.hours_time_name ? userInfo.hours_time_name.split(/\s*,\s*/) : [])
        setValue("skillset_type_id", userInfo.skillset_type_id);
        setValue("hours_time", userInfo.hours_time);
        setValue("officetype", userInfo.office_type_id);
        setValue("contract_type_id", contract_type_id);
      })
      .catch(error => {
        console.log("data", error);
      });
  }, []);

  const submit = e => {
    axios
      .put("users/" + data.user_id.id, {
        clinicname: usetInfo.clinicname
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

    axios
      .put("user-informations/" + data.id, {
        // user_id: userinfo.id,
        about: usetInfo.about,
        linkedin_link: usetInfo.linkedin_link,
        facebook_link: usetInfo.facebook_link,
        instagram_link: usetInfo.instagram_link,
        twitter_link: usetInfo.twitter_link,
        address: data.address,
        longitude: data.longitude.toString(),
        latitude: data.latitude.toString(),
        clinical_experience: usetInfo.clinical_experience,
        designation_id: usetInfo.designation_id,
        practice_type: usetInfo.practice_type,
        contract_type_id: selectedworkSituatuon.join(),
        contract_type_name: selectedworkSituatuonName.join(),
        hours_time: selectedhourTime.join(),
        hours_time_name: selectedhourTimeName.join(),
        skillset_type_id: selectSkill.join(),
        skillset_type_name: selectSkillName.join(),
        office_type_id: selectedOfficeType.join()
      })
      .then(response => {
        // Handle success.
        window.location.href = "/clinicprofile";
      })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  };
  const changeIntrestedStatus = status =>{
    axios
      .put("user-informations/" + data.id, {
        looking_for:status
      })
      .then(response => {
        // Handle success.
        window.location.href = "/myprofile";
        console.log(   "okokok" ,data?.designation_id?.id +'=='+ usetInfo.designation_id)
      })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  }
  const photosUpload = e => {
    e.preventDefault();
    if (newImages.length > 0) {
      for (let i = 0; i < newImages.length; i++) {
        console.log("loop");

        const dataFile = new FormData();

        let photo = "";
        let file = [];

        photo = "clinic_photos";

        file = newImages[i];

        dataFile.append("ref", "user-information");
        dataFile.append("refId", data.id);
        dataFile.append("field", photo);
        dataFile.append("files", file);
        for (var key of dataFile.entries()) {
          console.log("test", key[0] + ", " + key[1]);
        }
        const upload_res = axios.post("/upload", dataFile).then(res => {
          if (i == newImages.length - 1) {
            // setTimeout(() => {
            window.location.href = "/clinicprofile";
            // }, 100);
          }
        });
      }
    } else {
      // refresh
      window.location.href = "/clinicprofile";
    }
  };

  const handleChange = event => {
    if (event.target.name == "profileimage") {
      setprofile_file(event.target.files[0]);
      // event.target.value = null;
    }

    if (event.target.name == "bannerimage") {
      setbanner_file(event.target.files[0]);

      // event.target.value = null;
    }
  };
  useEffect(() => {
    if (profile_file && typeof profile_file == "object") {
      const datas = new FormData();

      let photo = "profile_photo";
      let file = profile_file;

      datas.append("ref", "user-information");
      datas.append("refId", data.id);
      datas.append("field", photo);
      datas.append("files", file);

      sendReq(datas, "profile");
    }
  }, [profile_file]);
  useEffect(() => {
    console.log("typeof", typeof banner_file);
    if (banner_file && typeof banner_file == "object") {
      console.log("------", banner_file);

      const datas = new FormData();

      let photo = "banner_photo";
      let file = banner_file;

      datas.append("ref", "user-information");
      datas.append("refId", data.id);
      datas.append("field", photo);
      datas.append("files", file);

      sendReq(datas, "banner");
    }
  }, [banner_file]);

  const sendReq = async (data, type) => {
    const upload_res = await axios({
      url: window.baseURL + "/upload",
      method: "POST",
      data
    });

    if (upload_res && upload_res.data[0]) {
      if (type == "profile") {
        setprofile_file(window.baseURL + upload_res.data[0].url);
        window.location.href = "/clinicprofile";
      }

      if (type == "banner") {
        setbanner_file(window.baseURL + upload_res.data[0].url);
      }
    } else {
      alert("Somthing went wrong. Please try again.");
    }
  };
  const [selectedhourTime, setSelectedhourTime] = useState(
    data?.hours_time ? data?.hours_time : []
  );

  const [selectedhourTimeName, setSelectedhourTimeName] = useState(
    data?.hours_time_name ? data.hours_time_name : []
  );

  const handleSelectTime = (e,selectName)=> {
    let selectedValue = selectedhourTime;
    let selectedValueName = selectedhourTimeName;
    if (e.target.checked) {
      selectedValue.push(e.target.value);
      setSelectedhourTime([...selectedValue]);
      setValue("hours_time", selectedValue);

      // name
      selectedValueName.push(selectName);
      setSelectedhourTimeName([...selectedValueName]);
      setValue("hours_time_name", selectedValueName);
    } else {
      const index = selectedValue.indexOf(e.target.value);
      const indexName = selectedValueName.indexOf(selectName);
      if (index > -1) {
        selectedValue.splice(index, 1);
        setSelectedhourTime([...selectedValue]);
        setValue("hours_time", selectedValue);
      }

      // name
      if (indexName > -1) {
        selectedValueName.splice(indexName, 1);
        setSelectedhourTimeName([...selectedValueName]);
        setValue("hours_time_name", selectedValueName);
      }
    }
  };

  const locationChange = datas => {
    let dataValue = data;
    if(datas){
      console.log('..-->>',userInfoValue)
      console.log("location", datas.label);
      dataValue.address = datas.label;
      setData(dataValue);
      console.log("dataValue =>", dataValue);
      setAddress(datas)

      // setValue('address',data.label)
      geocodeByAddress(datas.label)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) =>
          setData({ ...data, latitude: lat, longitude: lng })
        );
      // setValue('address',data.label)
    }else{
      console.log('..-->>',userInfoValue)
      setAddress('')
      setData({ ...data,address:userInfoValue.address, latitude: userInfoValue.latitude, longitude: userInfoValue.longitude })
    }
  };
  const findLocation = () =>{
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("current",position);
      let latitude = position.coords.latitude
      let longitude = position.coords.longitude
      geocodeByLatLng({ lat:latitude, lng: longitude })
      .then(results => {
        let address = results[0].formatted_address;
        console.log(results)
        setAddress({"label":address})
        setData({ ...data,address:address, latitude: latitude, longitude: longitude })
      })
      .catch(error => console.error(error));
    });
  }

  const handleSelectOfficeType = (e, i) => {
    let selectedValue = selectedOfficeType;

    console.log("officeType---->", officeType[i]);

    if (e.target.value === officeType[i].option_1) {
      selectedValue.push(e.target.value);
      // setSelectedOfficeType([...selectedValue]);
      console.log("selectedValue", selectedValue);

      setValue("officetype", selectedValue);
      console.log(
        "selectedOfficeTypeP",
        selectedValue.indexOf(officeType[i].option_2)
      );
      const index = selectedValue.indexOf(officeType[i].option_2);
      if (index >= 0) {
        selectedValue.splice(index, 1);
      }
      console.log("selectSkill", selectedValue);
      setSelectedOfficeType([...selectedValue]);
    }

    if (e.target.value === officeType[i].option_2) {
      selectedValue.push(e.target.value);
      // setSelectedOfficeType([...selectedValue]);
      setValue("officetype", selectedValue);
      console.log("selectedOfficeType", selectedOfficeType);

      const index = selectedValue.indexOf(officeType[i].option_1);
      if (index >= 0) {
        selectedValue.splice(index, 1);
      }
      console.log("selectSkill", selectedValue);
      setSelectedOfficeType([...selectedValue]);
    }
  };

  const handleSelectSituation = (e,selectName) => {
    let selectedValue = selectedworkSituatuon;
    let selectedValueName = selectedworkSituatuonName;
    if (e.target.checked) {
      selectedValue.push(e.target.value);
      setSelectedworkSituatuon([...selectedValue]);
      setValue("contract_type_id", selectedValue);

      // name
      selectedValueName.push(selectName);
      setSelectedworkSituatuonName([...selectedValueName]);
      setValue("contract_type_name", selectedValueName);
    } else {
      const index = selectedValue.indexOf(e.target.value);
      const indexName = selectedValueName.indexOf(selectName);

      if (index > -1) {
        selectedValue.splice(index, 1);
        setSelectedworkSituatuon([...selectedValue]);
        setValue("contract_type_id", selectedValue);
      }

      // name
      if (indexName > -1) {
        selectedValueName.splice(indexName, 1);
        setSelectedworkSituatuonName([...selectedValueName]);
        setValue("contract_type_name", selectedValueName);
      }
    }
  };

  const handleSelectSkill = (e,selectName) => {
    let selectedValue = selectSkill;
    let selectedValueName = selectSkillName;
    if (e.target.checked) {
      selectedValue.push(e.target.value);
      setSelectSkill([...selectedValue]);
      setValue("skillset_type_id", selectedValue);

      // name
      selectedValueName.push(selectName);
      setSelectSkillName([...selectedValueName]);
      setValue("skillset_type_name", selectedValueName);
    } else {
      const index = selectedValue.indexOf(e.target.value);
      const indexName = selectedValueName.indexOf(selectName);
      if (index > -1) {
        selectedValue.splice(index, 1);
        setSelectSkill([...selectedValue]);
        setValue("skillset_type_id", selectedValue);
      }

      // name
      if (indexName > -1) {
        selectedValueName.splice(indexName, 1);
        setSelectSkillName([...selectedValueName]);
        setValue("skillset_type_name", selectedValueName);
      }
    }
  };

  const handleImages = async event => {
    console.log("photo", event.target.files);
    const files = event.target.files;
    let filesValue = newImages;
    for (let i = 0; i < files.length; i++) {
      filesValue.push(files[i]);
      setnewImages([...filesValue]);
      // setValue('clinicPhoto',filesValue)
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[i]);
      fileReader.onload = () => {
        newImagesPreview.push(fileReader.result);
        setnewImagesPreview([...newImagesPreview]);
      };
      // setnewImagesPreview(filesValue)
      // setValue('clinicPhoto',filesValue)
    }
  };
  const removeImage = (image, i) => {
    console.log("image===>", image);
    if (image) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Remove",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#008AE8",
        cancelButtonColor: "#d33",
        reverseButtons: true
      }).then(result => {
        if (result.isConfirmed) {
          // /upload/files/:id
          deleteImages(image.id)
            .then(response => {
              console.log("response", response);
              let clinicImages = data.clinic_photos;
              clinicImages.splice(i, 1);
              data.clinic_photos = clinicImages;
              setData({ ...data });
              Swal.fire("Removed!", "Image removed successfully!!.", "success");
            })
            .catch(errors => {
              console.log("rem res error => ", errors);
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire("Cancelled", "Image is not remove", "error");
        }
      });
    }
  };
  const removePreview = (iamges, i) => {
    let imagePreviewData = newImagesPreview;
    imagePreviewData.splice(i, 1);
    setnewImagesPreview([...imagePreviewData]);
    let imageData = newImages;
    imageData.splice(i, 1);
    setnewImages([...imageData]);
  };
  return (
    <>
      {data && (
        <div className="in_user_wrap cli_profile_wrap">
          <div className="container">
            <div className="in_user_box">
              <div
                className="in_user_top"
                style={{ backgroundImage: `url("${banner_file}")` }}
              >

                {/* <div class="saved_icon">  </div> */}
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
                    onClick={() => {
                      setAtivePopup(1);
                    }}
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
                      <a className="edit-icon icon-plus shadow">
                        <i className="fe fe-camera"></i>
                      </a>
                    </div>

                    <div className="thumbnail-container">
                      <div className="thumbnail">
                        <img src={profile_file} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="user_social">
                    <ul>
                      {data.user_id.email && (
                        <li>
                          <a
                            target="_blank"
                            href={`mailto:${data.user_id.email}`}
                          >
                            <i className="fa fa-envelope"></i>
                          </a>
                        </li>
                      )}

                      {data.facebook_link && (
                        <li>
                          <a target="_blank" href={data.facebook_link}>
                            <i className="fa fa-facebook"></i>
                          </a>
                        </li>
                      )}

                      {data.twitter_link && (
                        <li>
                          <a target="_blank" href={data.twitter_link}>
                            <i className="fa fa-twitter"></i>
                          </a>
                        </li>
                      )}
                      {data.linkedin_link && (
                        <li>
                          <a target="_blank" href={data.linkedin_link}>
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>
                      )}

                      {data.instagram_link && (
                        <li>
                          <a target="_blank" href={data.instagram_link}>
                            <i className="fa fa-instagram"></i>
                          </a>
                        </li>
                      )}
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
                      {userInfoValue.address}
                    </li>
                  </ul>
                  <div className="us_desc">
                    <p>{data.about}</p>
                  </div>
                  <div className="user_btn">
                    <ul>
                      {console.log(
                        "{data?.office_type_id",
                        data?.office_type_id
                      )}
                      {data?.office_type_id &&
                        data?.office_type_id.map(dataOffice => (
                          <li>
                            <p>{dataOffice}</p>
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
                      onClick={() => {
                        setAtivePopup(0);
                      }}
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
                                        onChange={e => handleUserInput(e)}
                                        name="clinicname"
                                      />
                                      <p style={{ color: "red" }}>
                                        {" "}
                                        {errors.clinicname
                                          ? errors.clinicname.message
                                          : ""}{" "}
                                      </p>
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
                                        onChange: locationChange,
                                        isClearable: true,
                                        value:AddressValue
                                      }}
                                    />
                                    <i onClick={() => { findLocation() }} className="fa fa-map-marker reg marker-location-icon"></i>
                                    <p style={{ color: "red" }}>
                                      {" "}
                                      {errors.address
                                        ? errors.address.message
                                        : ""}{" "}
                                    </p>
                                  </div>

                                  <h2 className="form_title">
                                    Are You a General or Specialist Practice?
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
                                        onChange={e => handleUserInput(e)}
                                        name="practice_type"
                                        defaultChecked={
                                          data.practice_type === "General"
                                            ? true
                                            : false
                                        }
                                      />
                                      <label for="size_1">General</label>

                                      <input
                                        type="radio"
                                        name="size"
                                        id="size_2"
                                        value="Specialist"
                                        name="practice_type"
                                        name="practice_type"
                                        onChange={e => handleUserInput(e)}
                                        defaultChecked={
                                          data.practice_type === "Specialist"
                                            ? true
                                            : false
                                        }
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
                                          onChange={e => handleUserInput(e)}
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
                                              checked={
                                                selectedOfficeType &&
                                                selectedOfficeType.find(
                                                  element =>
                                                    element == type.option_1
                                                )
                                              }
                                              onChange={e => {
                                                handleSelectOfficeType(e, i);
                                              }}
                                            />
                                            <label for={type.option_1}>
                                              {type.option_1}
                                            </label>
                                            {console.log(
                                              "selectedOfficeType",
                                              selectedOfficeType,
                                              type.option_2,
                                              type.option_1
                                            )}
                                            <input
                                              type="radio"
                                              name={i + "size"}
                                              id={type.option_2}
                                              value={type.option_2}
                                              checked={
                                                selectedOfficeType &&
                                                selectedOfficeType.find(
                                                  element =>
                                                    element == type.option_2
                                                )
                                              }
                                              onChange={e => {
                                                handleSelectOfficeType(e, i);
                                              }}
                                            />
                                            <label for={type.option_2}>
                                              {type.option_2}
                                            </label>
                                          </div>
                                        ))}
                                      </div>
                                      <p style={{ color: "red" }}>
                                                {" "}
                                                {errors.officetype
                                                  ? "Select atleast one option of your interest"
                                                  : ""}{" "}
                                              </p>
                                    </div>




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
                                          defaultValue={data.facebook_link}
                                          onChange={event => {
                                            setUsetInfo({
                                              ...usetInfo,
                                              facebook_link: event.target.value
                                            });
                                          }}
                                          type="text"
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
                                          onChange={event => {
                                            setUsetInfo({
                                              ...usetInfo,
                                              twitter_link: event.target.value
                                            });
                                          }}
                                          type="text"
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
                                          onChange={event => {
                                            setUsetInfo({
                                              ...usetInfo,
                                              linkedin_link: event.target.value
                                            });
                                          }}
                                          type="text"
                                          defaultValue={data.linkedin_link}
                                          // value={this.state.linkedin_link} onChange={(event) => this.handleUserInput(event)}
                                          placeholder="Linkedin Link "
                                        />
                                      </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                      <div className="form-group">
                                        <label
                                          className="form-label"
                                          htmlFor="instagram_link"
                                        >
                                          Instagram Link
                                        </label>
                                        <input
                                          className="form-control"
                                          id="instagram_link"
                                          name="instagram_link"
                                          // value={this.state.instagram_link} onChange={(event) => this.handleUserInput(event)} type="text"
                                          onChange={event => {
                                            setUsetInfo({
                                              ...usetInfo,
                                              instagram_link: event.target.value
                                            });
                                          }}
                                          type="text"
                                          defaultValue={data.instagram_link}
                                          placeholder="Instagram Link "
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
                                        onClick={() => {
                                          setAtivePopup(0);
                                        }}
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
                          onClick={() => {
                            setAtivePopup(2);
                          }}
                        >
                          <i className="fe fe-edit-2"></i>
                        </a>
                        {data.clinic_photos && data.clinic_photos.length > 0 ? (
                          data.clinic_photos.map(iamges => (
                            <div className="ex_photos_in">
                              <div className="thumbnail-container">
                                <div className="thumbnail">
                                  <img
                                    src={window.baseURL + iamges.url}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="ex_photos_in">
                           No photo available
                          </div>
                        )}
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
                        {console.log("newImages", newImages)}
                        <h5 className="modal-title" id="imagePopupLabel">
                          Images
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={() => {
                            setAtivePopup(0);
                          }}
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
                                      onSubmit={e => photosUpload(e)}
                                    >
                                      <div className="item_form_wrap">
                                        <h2 className="form_title">
                                          Images List
                                        </h2>
                                        <div className="f_group">
                                          <div className="ex_photos">
                                            <div className="ex_photos_wrap">
                                              {data.clinic_photos &&
                                              data.clinic_photos.length > 0
                                                ? data.clinic_photos.map(
                                                    (iamges, i) => (
                                                      <div className="ex_photos_in">
                                                        <div className="thumbnail-container">
                                                          <div className="thumbnail">
                                                            <img
                                                              src={
                                                                window.baseURL +
                                                                iamges.url
                                                              }
                                                              alt=""
                                                            />
                                                            <div
                                                              className="removeImage"
                                                              onClick={() => {
                                                                removeImage(
                                                                  iamges,
                                                                  i
                                                                );
                                                              }}
                                                            >
                                                              {" "}
                                                              <i className="fa fa-remove"></i>{" "}
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    )
                                                  )
                                                : 
                                                <p style={{padding: "0px 20px"}}>No images found</p>
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
                                        <div className="fil_slide_wrap">
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
                                          {/* <div class="fileUpload">
                                        {data.clinic_photos && data.clinic_photos.length > 0 &&
                                                data.clinic_photos.map((iamges, i) => (
                                          <img className="up_img file-upload" height="150" src={'https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_640.png'}/>
                                                ))}
                                          </div> */}
                                          <div className="ex_photos">
                                            <div className="ex_photos_wrap">
                                              {newImagesPreview &&
                                                newImagesPreview.length > 0 &&
                                                newImagesPreview.map(
                                                  (iamges, i) => (
                                                    <div className="ex_photos_in">
                                                      <div className="thumbnail-container">
                                                        <div className="thumbnail">
                                                          <img
                                                            src={iamges}
                                                            alt=""
                                                          />
                                                          <div
                                                            className="removeImage"
                                                            onClick={() => {
                                                              removePreview(
                                                                iamges,
                                                                i
                                                              );
                                                            }}
                                                            style={{
                                                              position:
                                                                "absolute"
                                                            }}
                                                          >
                                                            {" "}
                                                            <i className="fa fa-remove"></i>{" "}
                                                            {" "}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )
                                                )}
                                            </div>
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
                                            onClick={() => {
                                              setAtivePopup(0);
                                            }}
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
                      onClick={() => {
                        setAtivePopup(3);
                      }}
                      data-target={"#expEditInfo"}
                    >
                      <i className="fe fe-edit-2"></i>
                    </a>
                    {(data?.skillset_type_id &&
                      data?.skillset_type_id.length > 0) ||
                    (data?.hours_time && data?.hours_time.length > 0) ? (
                      <>
                        <div className="ex_box_title">
                          <h2 className="ex_title">
                            {data?.designation_id?.name}
                          </h2>
                          <div className="box_right_data">
                            <span>{data.clinical_experience} Years</span>
                            <span className="ex_ttl">Experience Required</span>
                          </div>
                        </div>

                        {data?.skillset_type_id &&
                          data?.skillset_type_id.length > 0 && (
                            <div className="box_list_info">
                              <div className="skill_dta">
                                <h2 className="sk_tit">Skills Required</h2>
                                <ul>
                                  {/* <Link to="/#">{data.skillset_type_id}</Link> */}
                                  {data?.skillset_type_id &&
                                  data?.skillset_type_id.length > 0
                                    ? data?.skillset_type_id.map(
                                        (element, i) => {
                                          return (
                                            element,
                                            skillSelected.map(val =>
                                              val.id ==
                                              data?.skillset_type_id[i] ? (
                                                <li>
                                                  {" "}
                                                  <p>
                                                    {val.title}
                                                  </p>{" "}
                                                </li>
                                              ) : (
                                                ""
                                              )
                                            )
                                          );
                                        }
                                      )
                                    : "No record found"}
                                </ul>
                              </div>
                            </div>
                          )}
                        {data?.hours_time && data?.hours_time.length > 0 && (
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
                        )}
                      </>
                    ) : (
                      "No record found"
                    )}
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
                            onClick={() => {
                              setAtivePopup(0);
                              // setSkill(skillSelected)
                              getSkills()
                            }}
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
                                        <form
                                          style={{ mexHeight: "unset" }}
                                          onSubmit={handleSubmit(submit)}
                                        >
                                          <h2 className="form_title">
                                            What is Your Role?
                                          </h2>
                                          <div className="role_box_wrap">
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
                                                    {...register(
                                                      "designation_id"
                                                    )}
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
                                              {selectedOption ?
                                              <>
                                              <ul>
                                                {skill.map((skill, i) => (
                                                  <li
                                                    className={`${
                                                      selectSkill &&
                                                      selectSkill.find(
                                                        element =>
                                                          element == skill.id
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
                                                        {...register(
                                                          "skillset_type_id"
                                                        )}
                                                        onChange={e => {
                                                          handleSelectSkill(e,skill.title);
                                                        }}
                                                        checked={
                                                          selectSkill &&
                                                          selectSkill.find(
                                                            element =>
                                                              element ==
                                                              skill.id
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
                                              <p style={{ color: "red" }}>
                                                {" "}
                                                {errors.skillset_type_id
                                                  ? "Select atleast one option of your interest"
                                                  : ""}{" "}
                                              </p>
                                              </>
                                              : <strong>Please select role </strong>}
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="item_form_wrap col-12 mt-5">
                                              <h2 className="form_title">
                                                Years of Experience Required:
                                              </h2>
                                              <label>
                                                Enter a specific amount or a
                                                range.
                                              </label>

                                              <div className="f_group km_group">
                                                <input
                                                  className="f_control"
                                                  defaultValue={
                                                    data.clinical_experience
                                                  }
                                                  type="number"
                                                  {...register(
                                                    "clinical_experience"
                                                  )}
                                                  onChange={e =>
                                                    handleUserInput(e)
                                                  }
                                                  name="clinical_experience"
                                                  min="0"
                                                />
                                                <label>Years</label>
                                              </div>
                                            </div>
                                            <p style={{ color: "red" }}>
                                              {" "}
                                              {errors.clinical_experience
                                                ? errors.clinical_experience
                                                    .message
                                                : ""}{" "}
                                            </p>
                                          </div>
                                          <div className="item_form_wrap">
                                            <h2 className="form_title">
                                              {" "}
                                              Hours Required for This Position:
                                            </h2>

                                            <div className="skill_wrap">
                                              <ul>
                                                {workSituatuon.map(
                                                  (situation, i) => (
                                                    <li
                                                      className={`${
                                                        selectedworkSituatuon &&
                                                        selectedworkSituatuon.find(
                                                          element =>
                                                            element ==
                                                            situation.id
                                                        )
                                                          ? "active"
                                                          : ""
                                                      }`}
                                                    >
                                                      <label>
                                                        <input
                                                          type="checkbox"
                                                          {...register(
                                                            "contract_type_id"
                                                          )}
                                                          hidden
                                                          value={situation.id}
                                                          onChange={e => {
                                                            handleSelectSituation(
                                                              e,situation.title
                                                            );
                                                          }}
                                                          checked={
                                                            selectedworkSituatuon &&
                                                            selectedworkSituatuon.find(
                                                              element =>
                                                                element ==
                                                                situation.id
                                                            )
                                                              ? true
                                                              : false
                                                          }
                                                        />
                                                        {situation.title}
                                                      </label>
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                              <p style={{ color: "red" }}>
                                                {" "}
                                                {errors.contract_type_id
                                                  ? "Select atleast one option of your interest"
                                                  : ""}{" "}
                                              </p>
                                            </div>

                                            <div className="skill_wrap">
                                              <label>
                                                Candidate Availability:
                                              </label>
                                              <ul>
                                                {availability.map((ave, i) => (
                                                  <li
                                                    className={`${
                                                      selectedhourTime &&
                                                      selectedhourTime.find(
                                                        element =>
                                                          element == ave.id
                                                      )
                                                        ? "active"
                                                        : ""
                                                    }`}
                                                  >
                                                    <label>
                                                      <input
                                                        type="checkbox"
                                                        {...register(
                                                          "hours_time"
                                                        )}
                                                        onChange={e => {
                                                          handleSelectTime(e,ave.title);
                                                        }}
                                                        hidden
                                                        value={ave.id}
                                                        checked={
                                                          selectedhourTime &&
                                                          selectedhourTime.find(
                                                            element =>
                                                              element == ave.id
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
                                              <p style={{ color: "red" }}>
                                                {" "}
                                                {errors.hours_time
                                                  ? "Select atleast one option of your interest"
                                                  : ""}{" "}
                                              </p>
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
                                                onClick={() => {
                                                  setAtivePopup(0);
                                                  // setSkill(skillSelected)
                                                  getSkills();
                                                }}
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
              {/* <div className="col-12">
                    <div className="pr-bot-btn">
                    <span
                        onClick={()=>changeIntrestedStatus('No')}
                        className={`int_btn not ${data.looking_for == 'No' ? 'rd_btn' : 'nt_btn' }`}
                        title="Not Interested"
                      >
                        Not looking for opportunity
                      </span>
                      <span 
                      onClick={()=>changeIntrestedStatus('Yes')}
                      className={`int_btn yes ${data.looking_for == 'Yes' ? 'gr_btn' : 'nt_btn' }`} title="Interested">
                        Looking for opportunity
                      </span>
                    </div>
                  </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
