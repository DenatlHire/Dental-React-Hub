import React, { useEffect, useState,useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import nl2br from 'react-newline-to-break';
import axios from 'axios';
import Select from 'react-select';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-google-places-autocomplete";
import {getClinicFilter,individualVisitPage,individualSaveJob} from '../FilterService'
import {getSkills} from '../Service';
export default function SearchResult() {
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
  const divRef = useRef(null)
  const locationChange = (data) =>{
    console.log(data);
    if(data){
      geocodeByAddress(data.label)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) =>{
        console.log('lat==>',lat)
        console.log('lng==>',lng)
        setSearchLng(lng)
        setSearchLat(lat)
      // setData({ ...data, latitude: lat, longitude: lng })
      // setValue("latitude",lat)
      // setValue("longitude",lng)
    });  
    }else{
      setSearchLng('')
      setSearchLat('') 
    }
    // setValue('address',data.label)
    
  }

  
  useEffect(() => {
    document.body.classList.add('foo_shape_img');
    getDesignation();
    getavailability();
    getSkills().then(res=>{
      setAllSkill(res)
    })
    filterQueryclear();
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

  const getdesSkills = (id) => {
    setSkill(null);
    axios
    .get("/skillset-types",{params: {
      designation_id: id
      }}).then(response => {
        console.log("res", response);
        setSkill(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  const handleChange = (e) => {
    console.log("e",e);
    getdesSkills(e.id)
    setSelectedSkill(null)
  }

  const onSkillChange = (e) => {
    // let Result = e.map(choice => (choice.id));
    // console.log('res==>',Result)
    setSelectedSkill(e)
  }

  const filterQuery = (e) =>{
    e.preventDefault();
    setloading(true)
    let selectedSkillData = selectedSkill ? selectedSkill.map(choice => (choice.id)) : [];
    let selectedAvilabilityData = selectedAvailability ? selectedAvailability.map(choice => (choice.id)): [];
    getClinicFilter(selectedAvilabilityData.join(','),selectedDesignations.id,selectedSkillData.join(','),filterText,userExperience,searchLat,searchLng).then(res=>{
      console.log('res==>',res)
      divRef.current.scrollIntoView({behavior: 'smooth'});
      setTimeout(() => {
        setloading(false)
      }, 1000);
      if('data' in res){
        setSearchResult(res.data)
      }else{
        setSearchResult([])
      }
    })
  }
  const filterQueryclear = () =>{
    setloading(true)
    setSelectedAvailability('');
    setSelectedDesignations('');
    setSelectedSkill('');
    setFilerText('');
    setExperience('');
    setSearchLat('');
    setSearchLng('');
    getClinicFilter('','','','','','','').then(res=>{
      console.log('res==>',res)
      setTimeout(() => {
        setloading(false)
      }, 1000);
      if('data' in res){
        setSearchResult(res.data)
      }else{
        setSearchResult([])
      }
    })
  }
  const savedSearch = (i) =>{
    let dataValue = searchResult[i];
    if(dataValue.saved){
      //do false
      let insertData = {
        user_id : user.id,
        job_id:dataValue.id
      }
      axios
      .delete("/saved-jobs/"+dataValue.savedID)
      .then(response => {
        console.log('response',response)
        if (response.status === 200) {
          dataValue.saved = false;
          dataValue.savedID = '';

          setSearchResult([...searchResult,dataValue])
        } else{
          console.log('err',response.data.error)
        }
      })
      .catch(error => {
        console.log('err',error)
      });
    }else{
      //do true
      let insertData = {
        user_id : user.id,
        job_id:dataValue.id
      }
      axios
      .post("/saved-jobs",insertData )
      .then(response => {
        if (response.status === 200) {
          dataValue.saved = true;
          dataValue.savedID = response.data.id;
          setSearchResult([...searchResult,dataValue]) 
          individualSaveJob(dataValue.id)

        } else{
          console.log('err',response.data.error)
        }
      })
      .catch(error => {
        console.log('err',error)
      });
    }


    console.log('dataValue',dataValue)
  }
  const clinicProfileVisite = (user_id) =>{
    individualVisitPage(user_id);
  }
  return (
    <div>
       <div className="search_result_wrap">

            {/* <div className="container t_search">
            <div class="baner-search-box banner-search-job p-6">
              <form  onSubmit={(e)=>{filterQuery(e)}}>
              <div class="row align-items-center">

                <div className='col-sm-12'>
                  <h2 className="serch_title">Search Jobs</h2>
                </div>

                <div class="col-sm-4 col-lg-4">
                <label>Job Title</label>
                  <div class="input-group input-group-lg"><span class="input-group-text border-0 pe-1"><i class="fe fe-search"></i></span>
                 
                  <input type="text" onChange={(e)=>{setFilerText(e.target.value)}} value={filterText} class="form-control border-0 px-1" placeholder="Job Title"/>
                  </div>
                </div>
                
                <div class="col-sm-4 col-lg-4">
                <label>Roles</label>
                  <div class="input-group input-group-lg"><span class="input-group-text border-0 pe-1"><i class="fe fe-search"></i></span>
                 
                  <Select className="basic-multi-select" 
                    getOptionLabel={designations => designations.name}
                    getOptionValue={designations => designations.id}
                    options={designations}
                    value={selectedDesignations}
                    onChange={(e) => {handleChange(e);setSelectedDesignations(e)}}
                    // isMulti={true}
                  /> 
                  </div>
                </div>
                <div class="col-sm-4 col-lg-4">
                <label>Skills</label>
                  <div class="input-group input-group-lg"><span class="input-group-text border-0 pe-1"><i class="fe fe-search"></i></span>
                 
                   <Select className="basic-multi-select"
                    getOptionLabel={skill => skill.title}
                    getOptionValue={skill => skill.id}
                    options={skill}
                    value={selectedSkill}
                    onChange={(e) => onSkillChange(e)}
                    isMulti={true}
                   />
                  </div>
                </div>
                
                <div class="col-sm-4 col-lg-4">
                <label>Location</label>
                  <div class="input-group input-group-lg">
                  <span class="input-group-text border-0 pe-1"><i class="fe fe-map-pin"></i></span>
                  <div className="se_location">
                 <GooglePlacesAutocomplete
                  apiKey={"AIzaSyC_jsl4AwbLyzmnmKAh5puxKPqVlh9eN7I"}
                  value={'address'}
                    selectProps={{
                      Location,
                      onChange: locationChange,
                      isClearable:true
                    }}
                  />
                </div>
                  </div>
                </div>
                <div class="col-sm-4 col-lg-4">
                <label>Experience (In Years)</label>
                  <div class="input-group input-group-lg"><span class="input-group-text border-0 pe-1"><i class="fe fe-map-pin"></i></span>
                  <div className="f_group km_group">
                  <input className="form-control border-0 px-1"
                  type="number" min="0" placeholder="Experience" value={userExperience} onChange={(e)=>{setExperience(e.target.value)}} />
                 
                </div>
                  </div>
                </div>
                <div class="col-sm-4 col-lg-4">
                <label>Availability</label>
                  <div class="input-group input-group-lg"><span class="input-group-text border-0 pe-1"><i class="fe fe-map-pin"></i></span>
                  <Select className="basic-multi-select"
                   getOptionLabel={availability => availability.title}
                   getOptionValue={availability => availability.id}
                   options={availability} 
                   onChange={(e)=>{
                      setSelectedAvailability(e)}
                    }
                   isMulti={true}
                   value={selectedAvailability}
                  />
                  </div>
                </div>
                <div class="col-sm-12 col-lg-6 f-btn"><button type="submit" class="btn btn-sm btn-primary">Search</button></div>
                <div class="col-sm-12 col-lg-6 f-btn"><button type="button" onClick={()=>{filterQueryclear()}} class="btn btn-sm btn-primary">Clear</button></div>
              </div>
              </form>
            </div>
            </div> */}

          <div className="container">

         

            <div className="search_main_ttl" ref={divRef}>
              <h2>We think these clinics may be a good match for you.</h2>
            </div>
            {loading ? <div className="spinnerParent"><div id="loadingSearch"></div></div> :
              <>
              {searchResult.length > 0 ?
              searchResult.map((data,i)=>{
                
              return (
              <div className="in_result_box success_saved">
                  <div className="in_search_top">
                    <h2 className="main_s_title">{data.clinicname}</h2>
                    <span className="s_designation">{data.address}</span>
                    <div onClick={()=>savedSearch(i)} class={`saved_icon ${data.saved ? 'active' : ''}`}></div>
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
                            <li><Link onClick={()=>clinicProfileVisite(data.user_id)} target={'_blank'} to={`/clinicProfileDetails/${Buffer.from(data.user_id.toString()).toString('base64')}`} title="View Profile">View Profile</Link></li>
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
