import React, { useEffect, useState,useRef } from "react";

import { Link, Redirect } from "react-router-dom";
import nl2br from 'react-newline-to-break';
import axios from 'axios';
import Select from 'react-select';
import {getNotification,markAsRead} from '../FilterService'
import profile_pic from "./../../images/avatar.jpeg";
import dental_image from  "./../../images/clinic_profile.png";


export default function Notification() {
const [NotificationList, setNotificationList] = useState([]);
const [loading, setloading] = useState(false);
const user = JSON.parse(localStorage.getItem("user"));

useEffect(() => {
  getNotificationData();
}, []);
const getNotificationData =() =>{
  setloading(true)
  getNotification().then(res=>{
    setTimeout(() => {
      setloading(false)
    }, 1000);
    if('data' in res){
      setNotificationList(res.data)
    }else{
      setNotificationList([])
    }
  });
}
const markAsReadnoti = (i) =>{
  let dataValue = NotificationList[i];
  markAsRead(dataValue.id).then(res=>{
        dataValue.is_read = 1;
        getNotificationData()
  })

}
  return (
    <>

      <div className="search_result_wrap">
        <div className="container">

          <div class="baner-search-box banner-search-job p-6">
            <div class="row align-items-center">

              <div className='col-sm-12'>
                <h2 className="serch_title">Notifications</h2>
              </div>



            </div>
          </div>

          {/* <div className="search_main_ttl">
              <h2>We think these clinics may be a good match for you.</h2>
            </div> */}

          <div className="in_result_box notification_wrap">
            <div className="noti_wrap">

              

              

              {loading ? <div className="spinnerParent"><div id="loadingSearch"></div></div> :
              <>
              {NotificationList.length > 0 ?
              NotificationList.map((data,i)=>(
                <div className="noti_list">
                  <div className="noti_img">
                    <div className="thumbnail-container">
                      <div className="thumbnail">
                        <img src={data.url ? window.baseURL + data.url : user.type == 1 ? profile_pic :  "/assets/img/dental_img.png"} alt="avtar" />
                      </div>
                    </div>
                  </div>
                  <div className="noti-text">
                    <p> {data.description}</p>
                    {data.is_read != 1 &&<div className="read_msg_btn">
                      <p onClick={()=>markAsReadnoti(i)} className='read_btn' title='Read Message'>Read Message</p>
                    </div>}
                  </div>
                </div>
              )):
              <div className="noti_list"><p className="no_data">No Data Found</p></div>
              }
              </>
              }
            </div>
          </div>


        </div>
      </div>

    </>

  );
}