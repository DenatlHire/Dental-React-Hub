import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import nl2br from 'react-newline-to-break';
import axios from 'axios'

class LoginProfile extends Component {
   
    
    render() {
        return (
            <>
            
            <div className="main_wrap_login">
               <div className="login_content">
                   <div className="login_header">
                  
                   <Link className="navbar-brand" to="/">
                     <img src="/assets/img/brands/login_logo.png" className="navbar-brand-img" alt="..." />
                   </Link>

                    </div>

                    <div className="lets_get_form">
                       <h2>
                       Let's get started. <br/> 
                       Are you an individual or a clinic?
                       </h2>
                     
                     <div className="login_btn">
                         <Link className="login_btn_in" to="/individual" title="Individual">Individual</Link>
                         <Link className="login_btn_in" to="/clinic" title="Clinic">Clinic</Link>
                     </div>

                   </div>

               </div>
            </div>
            
           </>

        );
    }
}

export default LoginProfile;