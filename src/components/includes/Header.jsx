import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
class Header extends Component {
   logout = () => {
      localStorage.clear();
      window.location.href = '/';
   }
   render() {
      const isAuthenticated = localStorage.getItem('token');
      const userinfo = JSON.parse(localStorage.getItem('user'));

      return (
         <header className="App-header">
            <nav className="navbar navbar-expand-lg navbar-light pt-5">
               <div className="container">
                  <Link className="navbar-brand" to="/">
                     <img src="/assets/img/brands/logo.png" className="navbar-brand-img" alt="..." />
                  </Link>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarCollapse">
                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fe fe-x"></i>
                     </button>
                     <ul className="navbar-nav m-auto">
                        <li className="nav-item">
                           <Link className="nav-link" to="/" aria-haspopup="true" aria-expanded="false">
                              Home</Link>
                        </li>
                        <li className="nav-item">
                           <Link className="nav-link" to="/about" aria-haspopup="true" aria-expanded="false">
                              About</Link>
                        </li>
                        <li className="nav-item">
                           <Link className="nav-link" to="/blogs" aria-haspopup="true" aria-expanded="false">
                              Blogs</Link>
                        </li>
                        <li className="nav-item">
                           <Link className="nav-link" to="/jobs" aria-haspopup="true" aria-expanded="false">
                              Search Jobs</Link>
                        </li>
                        <li className="nav-item">
                           <Link className="nav-link" to="/contact" aria-haspopup="true" aria-expanded="false">
                              Contact</Link>
                        </li>

                        <li className="nav-item">
                           <Link className="nav-link" to="/messaging" aria-haspopup="true" aria-expanded="false">
                              <i class="fa fa-envelope" aria-hidden="true"></i>
                           </Link>
                        </li>
                     </ul>
                  </div>
                  {isAuthenticated ? (
                     <>
                        <div className="dropdown user-profile-dropdown">
                           <div className="dropdown-toggle font-weight-bold nav-link" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i className="fe fe-user mr-1"></i> {userinfo ? userinfo.type == '2' ? userinfo.clinicname : userinfo.username : ""}
                           </div>
                           <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <Link className="dropdown-item" to={`${userinfo && userinfo.type == '2' ? '/clinicprofile' : '/myprofile'}`} aria-haspopup="true" aria-expanded="false">
                                 My Profile</Link>
                              <button className="dropdown-item" onClick={this.logout} aria-haspopup="true" aria-expanded="false">Log Out</button>
                           </div>
                        </div>
                     </>
                  ) : (
                     <div className="sign_btn"><Link className="navbar-btn btn btn-sm btn-primary ms-auto" to="/signin">
                        Sign In</Link> </div>
                  )}
               </div>
            </nav>
         </header>
      );
   }
}
export default Header;