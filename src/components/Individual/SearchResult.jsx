import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import nl2br from 'react-newline-to-break';
import axios from 'axios'

class SearchResult extends Component {
   
    
    render() {
        return (
            <>
            
            <div className="search_result_wrap">
              <div className="container">

                <div className="search_main_ttl">
                  <h2>We think these clinics may be a good match for you.</h2>
                </div>
               
                 <div className="in_result_box">
                 <div className="in_search_top">
                    <h2 className="main_s_title">Oliver Park Dental</h2>
                    <span className="s_designation">General Practice in Edmonton, AB</span>
                  </div>
                  <div className="result_bottom_sec">
                    <div className="user_left_sec">
                      <div className="use_image">
                        <div className="thumbnail-container">
                          <div className="thumbnail">
                            <img src="/assets/img/avatars/user_img.png" alt="avtar" />
                          </div>
                        </div>
                       </div>

                       <div className="user_info_in">
                         <div className="hiring_btn">
                           <a href="#" title="Currently Hiring">Currently Hiring</a>
                         </div>
                         <div className="us_btn">
                           <ul>
                             <li><a href="#" title="View Profile">View Profile</a></li>
                             <li><a href="#" title="Message">Message</a></li>
                           </ul>
                         </div>
                       </div>
                      
                  </div>
                  <div className="user_right_sec">
                     
                      <div className="title_wrap">
                       <h2 className="us_name">Doctor of Dental Surgery<span>Currently Hiring</span></h2>
                       <h2 className="us_name">6 Years<span>Working Experience Required</span></h2>
                      </div>
                      
                      <div className="user_his_box">
                        <h2 className="use_his_title">
                        Environment
                        </h2>
                        <ul className="user_his_list">
                          <li><a href="#" title="Busy">Busy</a></li>
                          <li><a href="#" title="Social">Social</a></li>
                          <li><a href="#" title="Large Team">Large Team</a></li>
                        </ul>
                      </div>

                      <div className="user_his_box">
                        <h2 className="use_his_title">
                        Clinic Hours
                        </h2>
                        <ul className="user_his_list">
                          <li><a href="#" title="Weekdays">Weekdays</a></li>
                          <li><a href="#" title="Evenings">Evenings</a></li>
                          <li><a href="#" title="Weekends">Weekends</a></li>
                        </ul>
                      </div>

                     <div className="us_desc">
                       <p>asasasasa sdsdsd</p>
                      </div>
                     </div>
                     </div>
                 </div>

                 <div className="in_result_box">
                 <div className="in_search_top">
                    <h2 className="main_s_title">Oliver Park Dental</h2>
                    <span className="s_designation">General Practice in Edmonton, AB</span>
                  </div>
                  <div className="result_bottom_sec">
                    <div className="user_left_sec">
                      <div className="use_image">
                        <div className="thumbnail-container">
                          <div className="thumbnail">
                            <img src="/assets/img/avatars/user_img.png" alt="avtar" />
                          </div>
                        </div>
                       </div>

                       <div className="user_info_in">
                         <div className="hiring_btn">
                           <a href="#" title="Currently Hiring">Currently Hiring</a>
                         </div>
                         <div className="us_btn">
                           <ul>
                             <li><a href="#" title="View Profile">View Profile</a></li>
                             <li><a href="#" title="Message">Message</a></li>
                           </ul>
                         </div>
                       </div>
                      
                  </div>
                  <div className="user_right_sec">
                     
                  <div className="us_desc">
                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                         quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                      </div>
                      
                      <div className="user_his_box">
                        <h2 className="use_his_title">
                        Environment
                        </h2>
                        <ul className="user_his_list">
                          <li><a href="#" title="Busy">Busy</a></li>
                          <li><a href="#" title="Social">Social</a></li>
                          <li><a href="#" title="Large Team">Large Team</a></li>
                        </ul>
                      </div>

                      <div className="user_his_box">
                        <h2 className="use_his_title">
                        Clinic Hours
                        </h2>
                        <ul className="user_his_list">
                          <li><a href="#" title="Weekdays">Weekdays</a></li>
                          <li><a href="#" title="Evenings">Evenings</a></li>
                          <li><a href="#" title="Weekends">Weekends</a></li>
                        </ul>
                      </div>

                 
                     </div>
                     </div>
                 </div>

              </div>
            </div>
            
           </>

        );
    }
}

export default SearchResult;