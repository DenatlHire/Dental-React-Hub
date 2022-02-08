import React, { useEffect,useState } from 'react';
import Banner from '../sections/Banner';
import About from '../sections/About';
import Homeblock from '../sections/Homeblock';
import {individualDashboard,clinicDashboard} from '../FilterService'
import {getSkills} from '../Service';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import {getClinicFilter,individualVisitPage,individualSaveJob} from '../FilterService'
import profile_pic from "./../../images/avatar.jpeg";
import InfiniteScroll from 'react-infinite-scroll-component';


function Home(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultListing, setSearchResultListing] = useState([]);
  const [loading, setloading] = useState(false);
  const [designations, setDesignations] = useState([]);
  const [skill, setSkill] = useState([{title: "Please select designation" , id: 0}]);
  const [allSkill, setAllSkill] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [filterText, setFilerText] = useState('');
  const [userExperience, setExperience] = useState(0);
  const df_profile_photo = profile_pic;
  const [count, setCount] = useState({
    prev: 0,
    next: 5
  })
  const [hasMore, setHasMore] = useState(true);
  
  useEffect(() => {
    setloading(true)
  if(user.type == 1 ){
    individualDashboard().then(res=>{
      setTimeout(() => {
        setloading(false)
      }, 1000);
      if('data' in res){
        setSearchResult(res.data)
        setSearchResultListing(res.data.slice(count.prev, count.next))
      }else{
        setSearchResult([])
        setSearchResultListing([])
      }
    }).catch(err=>{
      console.log('error--->',err)
    })
  }
  else{
    clinicDashboard().then(res=>{
      setTimeout(() => {
        setloading(false)
      }, 1000);
      if('data' in res){
        setSearchResult(res.data)
        setSearchResultListing(res.data.slice(count.prev, count.next))

      }else{
        setSearchResult([])
        setSearchResultListing([])
      }
    }).catch(err=>{
      console.log('error--->',err)
    })
  }
  }, []);
  useEffect(() => {
    document.body.classList.add('foo_shape_img');
    getDesignation();
    getavailability();
    getSkills().then(res=>{
      setAllSkill(res)
    })
  
  }, []);
  const getMoreData = () => {
    if (searchResultListing.length === searchResult.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setSearchResultListing(searchResultListing.concat(searchResult.slice(count.prev + 5, count.next + 5)))
    }, 2000)
    setCount((prevState) => ({ prev: prevState.prev + 5, next: prevState.next + 5 }))
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
    
  return (
      <>
      <div className='search_result_wrap'>
      <div className='container'>
      <div class="search_main_ttl"><h2>Welcome Back, {user.type == 1 ? user.firstname+' '+user.lastname : user.clinicname}! Here are some matches you may be interested in.</h2></div>
      {loading ? <div className="spinnerParent"><div id="loadingSearch"></div></div> :
      <>
      {
        user.type == 1 ?
        <>
        <InfiniteScroll
          dataLength={searchResultListing.length}
          next={getMoreData}
          hasMore={hasMore}
          loader={<div className="spinnerParent" style={{marginTop:"10px"}}><div id="loadingSearch"></div></div>}
          
        >
        {searchResultListing.length > 0 ?
              searchResultListing.map((data,i)=>{
                
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
                            <img src={data.url ? window.baseURL + data.url : df_profile_photo} alt="avtar" className={data.looking_for == 'Yes' && 'looking'} />
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
                            <li><a className='msg-btn' href={`/messaging/?recipient=${data.user_id}`} title="Message"><i class="fa fa-comment" aria-hidden="true"></i> Message</a></li>
                          </ul>
                        </div>
                      </div>

                    </div>
                    <div className="user_right_sec">

                      <div className="us_desc">
                        <p>{data.description}</p>
                      </div>
                      <div class="title_wrap">
                          <h2 class="us_name">{designations && designations?.map((value) => {
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
                <div className="in_result_box"><p className="no_data">No Matches Found</p></div>
              }
        </InfiniteScroll>
        </>
        

        : 
        <>
        <InfiniteScroll
          dataLength={searchResultListing.length}
          next={getMoreData}
          hasMore={hasMore}
          loader={<div className="spinnerParent"><div id="loadingSearch"></div></div>}
          
        >
        {searchResult.length > 0 ?
            searchResult.map((data,i)=>{
              
             return (
              <div className="in_result_box">
              <div className="in_search_top">
                <h2 className="main_s_title">{data.firstname} {data.lastname}</h2>
                <span className="s_designation">{data.address}</span>
               
                <div onClick={()=>savedSearch(i)} class={`saved_icon ${data.saved ? 'active' : ''}`}></div>
       
              
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
                        <li><Link onClick={()=>{clinicProfileVisite(data.user_id)}} target={'_blank'} to={`/individualProfileDetails/${Buffer.from(data.user_id.toString()).toString('base64')}`} title="View Profile">View Profile</Link></li>
                        <li><a className='msg-btn' href={`/messaging/?recipient=${data.user_id}`} title="Message"><i class="fa fa-comment" aria-hidden="true"></i> Message</a></li>
                      </ul>
                    </div>
                  </div>

                </div>
                <div className="user_right_sec">

                  <div className="title_wrap">
                    <h2 className="us_name">{designations && designations?.map((value) => {
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
                    {data?.skillset_type_id?.split(/\s*,\s*/)?.map(skillData=>{
                            return(allSkill.map(dataSkillAll=>(
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
                    {data?.hours_time?.split(/\s*,\s*/)?.map(availabilityData=>{
                            return(availability.map(dataAvailability=>(
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
              <div className="in_result_box"><p className="no_data">No Matches Found</p></div>
            }
            </InfiniteScroll>
        </> 
      }
      </>}
      </div>
      </div>
      </>
  );
  
}

export default Home;