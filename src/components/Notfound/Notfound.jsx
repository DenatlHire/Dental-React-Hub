import React, { Component } from 'react';
import nl2br from 'react-newline-to-break';
import axios from 'axios'

class Notfound extends Component {
  
   
    render() {
        return (
            <>
            <section className="d-flex justify-content-center inner-banner align-items-center">
            <h1 className="text-center">404</h1>
            </section>
            <section className="page_section_main error_page">
      <div className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center">
          <div className="col-12 col-md-12 col-lg-12">
            
          
            <h1 className="display-3 fw-bold text-center error_title">
              404
              <span>PAGE NOT FOUND</span>
            </h1>

            
            <p className="mb-5 text-center text-muted">
            You may have mis-typed the URL. Or the page has been removed.<br/> Actually, there is nothing to see here...<br/> 
            Click on the links below to do something, Thanks!
            </p>

            
            <div className="text-center">
              <a className="btn btn-primary" href="/">
                Back to Home
              </a>
            </div>

          </div>
        </div>       </div> 
    </section>
          </>

        );
    }
}

export default Notfound;