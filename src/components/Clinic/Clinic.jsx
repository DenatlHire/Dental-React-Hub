import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import nl2br from 'react-newline-to-break';
import axios from 'axios'

class Clinic extends Component {
   
    
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
                       What are you looking to do?
                       </h2>
                     
                     <div className="login_btn">
                     <Link className="login_btn_in" to="#" title="Fill a Position">Find a Position</Link>
                         <Link className="login_btn_in" to="/clinicregister" title="Create a Profile">Create a Profile</Link>
                     </div>

                   </div>
                   
               </div>
            </div>
            
           </>

        );
    }
}

export default Clinic;