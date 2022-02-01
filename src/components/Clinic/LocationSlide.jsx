import React, { useState,useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Pagination } from "./pagination";
import ClinicProfileDisplay from "./ClinicProfileDisplay";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Autocomplete from "react-google-autocomplete";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByLatLng
} from "react-google-places-autocomplete";


function NameSlide({
  activeStep,
  steps,
  handleReset,
  handleSkip,
  handleSubmitForm,
  handleBack,
  data,
  user,
  workSituatuonValue,
  availabilityValue,
  skillValue,
  officeTypeValue,
  designationsValue
}) {
  const validationSchema = yup.object().shape({
    address: yup.string().required("Please select a valid address."),
  });
  const [AddressValue, setAddress] = useState('');
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
  useEffect(() => {
    if(getValues('address')){
      console.log(getValues())
      setAddress({"label":getValues('address')})
    }
  }, []);
  
  const locationChange = (data) => {
    console.log(JSON.stringify(data));
    if (data) {
      setValue('address', data.label)
      setAddress(data)
      geocodeByAddress(data.label)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          // setData({ ...data, latitude: lat, longitude: lng })
          setValue("latitude", lat)
          setValue("longitude", lng)
        });
    } else {
      setValue('address', '')
      setValue("latitude", '')
      setAddress('')

      setValue("longitude", '')
    }
  }
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
        setValue('address', address)
        setValue("latitude", latitude)
        setValue("longitude", longitude)
      })
      .catch(error => console.error(error));
    });
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

          <div className="item_form location-form">
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <div className="item_form_wrap">
                <h2 className="form_title">Where is Your Clinic Located?</h2>
                <div className="f_group p_relative marker-location">
                  {/* <input
                    className="f_control"
                    type="text"
                    placeholder="Enter a Location"
                    {...register("clinicLocation")}
                  /> */}
                  <GooglePlacesAutocomplete
                    apiKey={"AIzaSyC_jsl4AwbLyzmnmKAh5puxKPqVlh9eN7I"}
                    selectProps={{
                      Location,
                      onChange: locationChange,
                      isClearable: true,
                      value:AddressValue
                    }}
                    error={!!errors.address}
                  />
                  <i onClick={() => { findLocation() }} className="fa fa-map-marker reg marker-location-icon"></i>
                </div>
                <p style={{ color: 'red' }} > {errors.address ? errors.address.message : ""} </p>
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
              <div className="slider_in_percent" style={{ width: "27%" }}></div>
            </div>
          </div>
        </div>
        <ClinicProfileDisplay data={user}
          workSituatuonValue={workSituatuonValue}
          availabilityValue={availabilityValue}
          skillValue={skillValue}
          officeTypeValue={officeTypeValue}
          designationsValue={designationsValue}
        />
      </div>
    </div>
  );
}

export default NameSlide;
