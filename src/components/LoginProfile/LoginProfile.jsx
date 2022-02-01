import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import nl2br from 'react-newline-to-break';
import axios from 'axios'

class LoginProfile extends Component {

    componentDidMount(prevProps) {
        // Typical usage (don't forget to compare props):
        document.body.classList.remove('foo_shape_img');
      }
    
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
                         <Link className="login_btn_in" to="/register" title="Individual">Individual</Link>
                         <Link className="login_btn_in" to="/clinicregister" title="Clinic">Clinic</Link>
                     </div>

                   </div>

               </div>
            </div>
            
           </>

        );
    }
}

export default LoginProfile;