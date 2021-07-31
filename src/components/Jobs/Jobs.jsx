import React, { Component } from 'react';
import { Link }
    from "react-router-dom";
import nl2br from 'react-newline-to-break';
import axios from 'axios';
class Jobs extends Component {
render() {
return (
   <>
<section className="d-flex justify-content-center inner-banner align-items-center">
   <h1 className="text-center">Search Jobs</h1>
</section>
<section className="page_section_main job-search">
   <div className="banner-search">
      <div className="container">
         <div className="baner-search-box banner-search-job p-6">
            <div className="row align-items-center">
               <div className="col-sm-4 col-lg-5">
                  <div className="input-group input-group-lg">
                     <span className="input-group-text border-0 pe-1">
                     <i className="fe fe-search"></i>
                     </span>
                     <input type="text" className="form-control border-0 px-1" placeholder="Search by Job Type, skill, or company..." />
                  </div>
               </div>
               <div className="col-sm-4 col-lg-5">
                  <div className="input-group input-group-lg">
                     <span className="input-group-text border-0 pe-1">
                     <i className="fe fe-map-pin"></i>
                     </span>
                     <input type="text" className="form-control border-0 px-1" placeholder="Location..." />
                  </div>
               </div>
               <div className="col-sm-4 col-lg-2 ml-auto text-right">
                  <button type="submit" className="btn btn-sm btn-primary w-100">
                  Search
                  </button>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div className="job_list_wrap mt-8">
     <div className="container">
     <div className="row">
      <div className="col-12 col-md-6 col-lg-4 mb-6">
         <div className="card card-border h-100 border-primary shadow-light-lg  aos-init aos-animate" data-aos="fade-up">
            <div className="card-body">
              
               
                  <div className="list-group list-group-flush">
                     <div className="list-group-item text-reset text-decoration-none">
                        <h3 className="fw-bold mb-0 title">
                        <Link to="#!" className="fw-bold main_small_title">
                        Senior Visual Designer 
                        </Link>
                        </h3>
                        <div className="dyas mb-2">
                           3 Days Ago
                        </div>
                        <p className="text-muted mb-3">
                         Magic Resume will adapt based on what positions the employer has available when it's shared.
                       </p>
                        <p className="fs-sm text-muted mb-1">
                           5+ years experience 
                        </p>
                        <p className="fs-sm fw-bold mb-2">
                        Ahmedabad, Gujarat, India
                        </p>

                        <Link to="#!" className="btn btn-sm btn-primary w-100">
                        Apply Job
                        </Link>
                       
                     </div>
                    
                  
               </div>
            </div>
         </div>
      </div>
      <div className="col-12 col-md-6 col-lg-4 mb-6">
         <div className="card card-border h-100 border-primary shadow-light-lg  aos-init aos-animate" data-aos="fade-up">
            <div className="card-body">
              
               
                  <div className="list-group list-group-flush">
                     <div className="list-group-item text-reset text-decoration-none">
                        <h3 className="fw-bold mb-0 title">
                        <Link to="#!" className="fw-bold">
                        Senior Visual Designer 
                        </Link>
                        </h3>
                        <div className="dyas mb-2">
                           3 Days Ago
                        </div>
                        <p className="text-muted mb-3">
                         Magic Resume will adapt based on what positions the employer has available when it's shared.
                       </p>
                        <p className="fs-sm text-muted mb-1">
                           5+ years experience 
                        </p>
                        <p className="fs-sm fw-bold mb-2">
                        Ahmedabad, Gujarat, India
                        </p>

                        <Link to="#!" className="btn btn-sm btn-primary w-100">
                        Apply Job
                        </Link>
                       
                     </div>
                    
                  
               </div>
            </div>
         </div>
      </div>
      <div className="col-12 col-md-6 col-lg-4 mb-6">
         <div className="card card-border h-100 border-primary shadow-light-lg  aos-init aos-animate" data-aos="fade-up">
            <div className="card-body">
              
               
                  <div className="list-group list-group-flush">
                     <div className="list-group-item text-reset text-decoration-none">
                        <h3 className="fw-bold mb-0 title">
                        <Link to="#!" className="fw-bold">
                        Senior Visual Designer 
                        </Link>
                        </h3>
                        <div className="dyas mb-2">
                           3 Days Ago
                        </div>
                        <p className="text-muted mb-3">
                         Magic Resume will adapt based on what positions the employer has available when it's shared.
                       </p>
                        <p className="fs-sm text-muted mb-1">
                           5+ years experience 
                        </p>
                        <p className="fs-sm fw-bold mb-2">
                        Ahmedabad, Gujarat, India
                        </p>

                        <Link to="#!" className="btn btn-sm btn-primary w-100">
                        Apply Job
                        </Link>
                       
                     </div>
                    
                  
               </div>
            </div>
         </div>
      </div>
      <div className="col-12 col-md-6 col-lg-4 mb-6">
         <div className="card card-border h-100 border-primary shadow-light-lg  aos-init aos-animate" data-aos="fade-up">
            <div className="card-body">
              
               
                  <div className="list-group list-group-flush">
                     <div className="list-group-item text-reset text-decoration-none">
                        <h3 className="fw-bold mb-0 title">
                        <Link to="#!" className="fw-bold">
                        Senior Visual Designer 
                        </Link>
                        </h3>
                        <div className="dyas mb-2">
                           3 Days Ago
                        </div>
                        <p className="text-muted mb-3">
                         Magic Resume will adapt based on what positions the employer has available when it's shared.
                       </p>
                        <p className="fs-sm text-muted mb-1">
                           5+ years experience 
                        </p>
                        <p className="fs-sm fw-bold mb-2">
                        Ahmedabad, Gujarat, India
                        </p>

                        <Link to="#!" className="btn btn-sm btn-primary w-100">
                        Apply Job
                        </Link>
                       
                     </div>
                    
                  
               </div>
            </div>
         </div>
      </div>
      <div className="col-12 col-md-6 col-lg-4 mb-6">
         <div className="card card-border h-100 border-primary shadow-light-lg  aos-init aos-animate" data-aos="fade-up">
            <div className="card-body">
              
               
                  <div className="list-group list-group-flush">
                     <div className="list-group-item text-reset text-decoration-none">
                        <h3 className="fw-bold mb-0 title">
                        <Link to="#!" className="fw-bold">
                        Senior Visual Designer 
                        </Link>
                        </h3>
                        <div className="dyas mb-2">
                           3 Days Ago
                        </div>
                        <p className="text-muted mb-3">
                         Magic Resume will adapt based on what positions the employer has available when it's shared.
                       </p>
                        <p className="fs-sm text-muted mb-1">
                           5+ years experience 
                        </p>
                        <p className="fs-sm fw-bold mb-2">
                        Ahmedabad, Gujarat, India
                        </p>

                        <Link to="#!" className="btn btn-sm btn-primary w-100">
                        Apply Job
                        </Link>
                       
                     </div>
                    
                  
               </div>
            </div>
         </div>
      </div>
      <div className="col-12 col-md-6 col-lg-4 mb-6">
         <div className="card card-border h-100 border-primary shadow-light-lg  aos-init aos-animate" data-aos="fade-up">
            <div className="card-body">
              
               
                  <div className="list-group list-group-flush">
                     <div className="list-group-item text-reset text-decoration-none">
                        <h3 className="fw-bold mb-0 title">
                        <Link to="#!" className="fw-bold">
                        Senior Visual Designer 
                        </Link>
                        </h3>
                        <div className="dyas mb-2">
                           3 Days Ago
                        </div>
                        <p className="text-muted mb-3">
                         Magic Resume will adapt based on what positions the employer has available when it's shared.
                       </p>
                        <p className="fs-sm text-muted mb-1">
                           5+ years experience 
                        </p>
                        <p className="fs-sm fw-bold mb-2">
                        Ahmedabad, Gujarat, India
                        </p>

                        <Link to="#!" className="btn btn-sm btn-primary w-100">
                        Apply Job
                        </Link>
                       
                     </div>
                    
                  
               </div>
            </div>
         </div>
      </div>
      
      </div>
     </div>
   </div>
</section>
</>
);
}
}
export default Jobs;