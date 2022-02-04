import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import profile_pic from "./../../images/avatar.jpeg";
import profile_pic_clinic from "./../../images/clinic_profile.png";
import {getNotification} from '../FilterService'
class Header extends Component {
   logout = () => {
      localStorage.clear();
      window.location.href = '/';
   }
   constructor(props) {
      super(props);
      this.state = {notification: 0};
   }
   componentDidMount(){
      this.getNotificationCount()
      setInterval(() => {

         this.getNotificationCount()
      }, 5000);
   }
   getNotificationCount(){
      const userinfo = JSON.parse(localStorage.getItem('user'));
      if(localStorage.getItem('user') ){
         getNotification().then(res=>{
            if('data' in res){
                let length = res.data.filter(function(item){
                   return item.is_read != 1;
                 }).length;
                 console.log('length==>',length)
                 this.setState({notification : length})
             }else{
               console.log('length==>')
                this.setState({notification : 0})
             
             }
           });
      }
      
   }
   render() {
      console.log('23')
      const isAuthenticated = localStorage.getItem('token');
      const userinfo = JSON.parse(localStorage.getItem('user'));
      const userType = JSON.parse(localStorage.getItem("user-info"));
      const df_profile_photo = profile_pic;
      const df_clinic_photo = profile_pic_clinic;

      // const [profile_file, setprofile_file] = useState(
      //       userType.profile_photo
      //         ? window.baseURL + userType.profile_photo.url
      //         : df_profile_photo
      // );
      return (
         <header className="App-header">
            <nav className="navbar navbar-expand-lg navbar-light pt-5">
               <div className="container">
               <Link className="navbar-brand" to="/">
                        <img src="/assets/img/brands/logo.png" className="navbar-brand-img" alt="..." />
                     </Link>
               {isAuthenticated ? (
                  <><button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                           <span className="navbar-toggler-icon"></span>
                        </button><div className="collapse navbar-collapse" id="navbarCollapse">
                           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                              <i className="fe fe-x"></i>
                           </button>
                           <ul className="navbar-nav m-auto">
                              <li className="nav-item">
                                 <Link className="nav-link" to="/" aria-haspopup="true" aria-expanded="false">
                                    Dashboard</Link>
                              </li>
                              {/* <li className="nav-item">
                                 <Link className="nav-link" to="/about" aria-haspopup="true" aria-expanded="false">
                                    About</Link>
                              </li> */}
                              {/* <li className="nav-item">
                                 <Link className="nav-link" to="/blogs" aria-haspopup="true" aria-expanded="false">
                                    Blogs</Link>
                              </li> */}
                              <li className="nav-item">
                                 <Link className="nav-link" to={ userinfo.type == '2' ? '/findProfile' : '/searchresult'} aria-haspopup="true" aria-expanded="false">
                                    Search Jobs</Link>
                              </li>
                              {/* <li className="nav-item">
                                 <Link className="nav-link" to="/contact" aria-haspopup="true" aria-expanded="false">
                                    Contact</Link>
                              </li> */}
                           </ul>
                        </div><>

                           <div className='after_login'>
                              <div className='add_job_btn'>
                                 {userinfo && userinfo.type == '2' ?
                                    <Link to={'/createjob'}>Add a Job</Link> : ""}
                                 <Link className="ad_btn active" to={ userinfo.type == '2' ? '/savedmatches' : '/savedjob'} >Saved Matches</Link>
                              </div>

                              <div className="noti_btn">
                                 <Link className="n_icon" to="/notification"><i class="fa fa-bell" aria-hidden="true"></i>
                                 {this.state.notification > 0 &&<span>{this.state.notification}</span>}
                                 </Link>
                                 <Link className="n_icon" to="/#"><i class="fa fa-envelope" aria-hidden="true"></i>
                                    <span>5</span>
                                 </Link>
                              </div>

                              <div className="dropdown user-profile-dropdown">
                                 <div className="dropdown-toggle font-weight-bold nav-link" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {/* <i className="fe fe-user mr-1"></i> {userinfo ? userinfo.type == '2' ? userinfo.clinicname : userinfo.username : ""} */}
                                    <div className="loginn_img">
                                       <div className="thumbnail-container">
                                          <div className="thumbnail">



                                             <img src={userType && userType.profile_photo && userType.profile_photo.url
                                                ? window.baseURL + userType.profile_photo.url
                                                : userinfo && userinfo.type == '2' ? df_clinic_photo : df_profile_photo} alt="..." />
                                             {/* <img src="/assets/img/avatars/avatar-4.jpg" alt="..." /> */}


                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Link className="dropdown-item" to={`${userinfo && userinfo.type == '2' ? '/clinicprofile' : '/myprofile'}`} aria-haspopup="true" aria-expanded="false">
                                       My Profile</Link>
                                    {userinfo && userinfo.type == '2' ?
                                       <Link className="dropdown-item" to={'/myjobs'} aria-haspopup="true" aria-expanded="false">
                                          My Jobs</Link> : " "}
                                    <button className="dropdown-item" onClick={this.logout} aria-haspopup="true" aria-expanded="false">Log Out</button>
                                 </div>
                              </div>
                           </div>
                        </></>
                  ) : (
                     <div className="sign_btn">
                        <Link className="login_link" title='Log In' to="/signin">
                        <img src="/assets/img/brands/can_flag.svg" className="flag_img" alt="..." /> Log In</Link>
                        <Link className="navbar-btn theme_btn_default ms-auto" to="/signupprofile">
                        Sign Up for Free</Link> </div>
                  )}
               </div>
            </nav>
         </header>
      );
   }
}
export default Header;