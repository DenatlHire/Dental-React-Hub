import React, { useEffect, useState,useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import nl2br from 'react-newline-to-break';
import axios from 'axios';
import Select from 'react-select';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-google-places-autocomplete";
import {getIndividualSavedProfile} from '../FilterService'
import {getSkills} from '../Service';
export default function SavedJobs() {
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
  const [loading, setloading] = useState(true);
  const [address, setAddress] = useState('address');
 

  
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
    getIndividualSavedProfile().then(res=>{
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
    axios
      .delete("/saved-jobs/"+dataValue.savedID)
      .then(response => {
        console.log('response',response)
        if (response.status === 200) {
            console.log('searchResult==',searchResult)
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
    <div>
       <div className="search_result_wrap">

            

          <div className="container">
          <div class="baner-search-box banner-search-job p-6">
              <div class="row align-items-center">

                <div className='col-sm-12'>
                  <h2 className="serch_title">Saved Matches</h2>
                </div>



              </div>
            </div>
            {loading ? <div className="spinnerParent"><div id="loadingSearch"></div></div> :
              <>
              {searchResult.length > 0 ?
              searchResult.map((data,i)=>{
                
              return (
              <div className="in_result_box success_saved">
                  <div className="in_search_top">
                    <h2 className="main_s_title">{data.job_title}</h2>
                    <span className="s_designation">{data.address}</span>
                    <div onClick={()=>savedSearch(i)} class={`saved_icon active`}></div>
                  </div>
                  <div className="result_bottom_sec">
                    <div className="user_left_sec">
                      <div className="use_image">
                        <div className="thumbnail-container">
                          <div className="thumbnail">
                            <img src={data.url ? window.baseURL + data.url : "/assets/img/dental_img.png"} alt="Dental" />
                          </div>
                        </div>
                      </div>

                      <div className="user_info_in">
                        <div className="hiring_btn">
                          <a href="#" title="Currently Hiring"><i class="fa fa-check" aria-hidden="true"></i> This Company Matches your Profile</a>
                        </div>
                        <div className="us_btn">
                          <ul>
                            <li><Link target={'_blank'} to={`/clinicProfileDetails/${Buffer.from(data.user_id.toString()).toString('base64')}`} title="View Profile">View Profile</Link></li>
                            <li><a className='msg-btn' href="#" title="Message"><i class="fa fa-comment" aria-hidden="true"></i> Message</a></li>
                          </ul>
                        </div>
                      </div>

                    </div>
                    <div className="user_right_sec">

                      <div className="us_desc">
                        <p>{data.description}</p>
                      </div>
                      <div class="title_wrap">
                          <h2 class="us_name">Doctor of   {designations && designations?.map((value) => {
                            return (
                              <>{value.id === parseInt(data.roles) ? value.name : ""}</>
                            )
                          })}<span>Currently Hiring</span></h2>
                          <h2 class="us_name">{data.experience} Years<span>Working Experience Required</span></h2>
                        </div>

                      <div className="user_his_box">
                        <h2 className="use_his_title">
                          Skills
                        </h2>
                        <ul className="user_his_list">
                          {data.skills.split(/\s*,\s*/).map(skillData=>{
                            return(allSkill.map(dataSkillAll=>(
                              dataSkillAll.id == skillData && <li>{dataSkillAll.title}</li>
                            )))
                          })}
                        </ul>
                      </div>

                      <div className="user_his_box">
                        <h2 className="use_his_title">
                          Clinic Hours
                        </h2>
                        <ul className="user_his_list">
                        {data.availability.split(/\s*,\s*/).map(availabilityData=>{
                            return(availability.map(dataAvailability=>(
                              dataAvailability.id == availabilityData && <li>{dataAvailability.title}</li>
                            )))
                          })}
                        </ul>
                      </div>


                    </div>
                  </div>
                </div>)
              })
                
              :
                <div className="in_result_box"><p className="no_data">No Data Found</p></div>
              }
              </>
            }
          </div>
        </div>
    </div>
  )
}
