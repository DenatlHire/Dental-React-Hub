import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import nl2br from 'react-newline-to-break';
import axios from 'axios';
import Select from 'react-select';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-google-places-autocomplete";
import {getClinicSavedProfile} from '../FilterService'
import {getSkills} from '../Service';
import profile_pic from "./../../images/avatar.jpeg";

export default function SavedMatches() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [designations, setDesignations] = useState([]);
  const [skill, setSkill] = useState([{title: "Please select designation" , id: 0}]);
  const [allSkill, setAllSkill] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedDesignations, setSelectedDesignations] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [filterText, setFilerText] = useState('');
  const [userExperience, setExperience] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [searchLat, setSearchLat] = useState('');
  const [searchLng, setSearchLng] = useState('');
  const [loading, setloading] = useState(false);
  const [address, setAddress] = useState('address');
  const df_profile_photo = profile_pic;
  useEffect(() => {
    document.body.classList.add('foo_shape_img');
    getDesignation();
    getavailability();
    getSkills().then(res=>{
      setAllSkill(res)
    })
    savedData();
    
  }, []);

  const savedData = () =>{
    setloading(true)
    getClinicSavedProfile().then(res=>{
      console.log('res==>',res)
      if('data' in res){
        setSearchResult(res.data)
      }else{
        setSearchResult([])
      }
      setTimeout(() => {
        setloading(false)
      }, 1500);
    }).catch(err=>{
      setSearchResult([])
      setTimeout(() => {
        setloading(false)
      }, 1500);
    });
  }
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
  const savedSearch = (i) =>{
    // setloading(true)
    let dataValue = searchResult[i];
    let searchResultData = searchResult;
      axios
      .delete("/saved-profiles/"+dataValue.savedID)
      .then(response => {
        console.log('response',response)
        if (response.status === 200) {
          savedData();
        } else{
          console.log('err',response.data.error)
        }
      })
      .catch(error => {
        console.log('err',error)
      });


    console.log('dataValue',dataValue)
  }
    return (
      <>

        <div className="search_result_wrap">
          <div className="container">

            <div class="baner-search-box banner-search-job p-6">
              <div class="row align-items-center">

                <div className='col-sm-12'>
                  <h2 className="serch_title">Saved Matches</h2>
                </div>



              </div>
            </div>

            {/* <div className="search_main_ttl">
              <h2>We think these clinics may be a good match for you.</h2>
            </div> */}
 {loading ? <div className="spinnerParent"><div id="loadingSearch"></div></div> :
            <>
            {searchResult.length > 0 ?
            searchResult.map((data,i)=>{
              
             return (
            <div className="in_result_box">
              <div className="in_search_top">
                <h2 className="main_s_title">{data.firstname} {data.lastname}</h2>
                <span className="s_designation">{data.address}</span>

                <div onClick={() => savedSearch(i)} class={`saved_icon active`}></div>


              </div>
              <div className="result_bottom_sec">
                <div className="user_left_sec">
                  <div className="use_image">
                    <div className="thumbnail-container">
                      <div className="thumbnail">
                      <img src={data.url ? window.baseURL + data.url : df_profile_photo} alt="avtar" className={data.looking_for == 'Yes' && 'looking'} />
                      </div>
                    </div>
                  </div>

                  <div className="user_info_in">
                    {data.looking_for == 'Yes' && <div className="hiring_btn">
                      <a href="#" title="Looking for Work"> <i class="fa fa-briefcase" aria-hidden="true"></i> Looking for Work</a>
                    </div>}
                    <div className="us_btn">
                      <ul>
                        <li><Link target={'_blank'} to={`/individualProfileDetails/${Buffer.from(data.user_id.toString()).toString('base64')}`} title="View Profile">View Profile</Link></li>
                        <li><a className='msg-btn' href={`/messaging/?recipient=${Buffer.from(data.user_id.toString()).toString('base64')}`} title="Message"><i class="fa fa-comment" aria-hidden="true"></i> Message</a></li>
                      </ul>
                    </div>
                  </div>

                </div>
                <div className="user_right_sec">

                  <div className="title_wrap">
                    <h2 className="us_name"> {designations && designations?.map((value) => {
                      return (
                        <>{value.id === parseInt(data.designation_id) ? value.name : ""}</>
                      )
                    })}<span>Looking for Work</span></h2>
                    <h2 className="us_name">{data.clinical_experience} Years<span>Working Experience Required</span></h2>
                  </div>

                  <div className="user_his_box">
                    <h2 className="use_his_title">
                      Skills
                    </h2>
                    <ul className="user_his_list">
                      {data?.skillset_type_id?.split(/\s*,\s*/)?.map(skillData => {
                        return (allSkill.map(dataSkillAll => (
                          dataSkillAll.id == skillData && <li>{dataSkillAll.title}</li>
                        )))
                      })}
                    </ul>
                  </div>

                  <div className="user_his_box">
                    <h2 className="use_his_title">
                      Availability
                    </h2>
                    <ul className="user_his_list">
                      {data?.hours_time?.split(/\s*,\s*/)?.map(availabilityData => {
                        return (availability.map(dataAvailability => (
                          dataAvailability.id == availabilityData && <li>{dataAvailability.title}</li>
                        )))
                      })}
                    </ul>
                  </div>

                  {/* <div className="us_desc mt-5">
                    <p>asasasasa sdsdsd</p>
                  </div> */}
                </div>
              </div>
            </div>
            )
          })
            
          :
            <div className="in_result_box"><p className="no_data">No Data Found</p></div>
          }
          </>}

          </div>
        </div>

      </>

    );
 
}
