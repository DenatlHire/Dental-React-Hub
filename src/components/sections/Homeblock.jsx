import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Homeblock extends Component {
  render() {
    return (
      <section className="py-8 py-md-11 bg-gray-200">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-7 text-center" >
              <h2 className="display-5 main_title">
                Built for teams of all kinds.
              </h2>

              <p className="fs-lg text-muted mb-7 mb-md-9">
                No matter what you're working on, who you're with, or how many of you there are, Landkit can help.
              </p>
            </div>
          </div>

          <div className="row gx-4">
            <div className="col-12 col-lg-6 d-lg-flex mb-4" data-aos="fade-up">
              <Link to="/jobs" className="card shadow-light-lg overflow-hidden lift" >
                <div className="row">
                  <div className="col-md-4 position-relative">
                    <img src="assets/img/illustrations/illustration-4.png" className="h-75 position-absolute right-0 mt-7 me-n4" alt="..." />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body py-7 py-md-9 text-center text-md-right">
                      <h4 className="fw-bold main_small_title">
                        Search Job
                      </h4>
                      <p className="mb-0 main_small_desc">
                        Landkit works well for a scrappy team of 3 or scales to the enterprise level needs of Forture 500 companies.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-12 col-lg-6 d-lg-flex mb-4" data-aos="fade-up">
              <Link to="/signin" className="card shadow-light-lg overflow-hidden lift">
                <div className="row">
                  <div className="col-md-8">
                    <div className="card-body py-7 py-md-9 text-center text-md-left">
                      <h4 className="fw-bold main_small_title">
                        Hire Individual
                      </h4>
                      <p className="main_small_desc mb-0">
                        Instead of bombarding team members with huge messages, simply reply with an emoji to express your reply.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <img src="assets/img/illustrations/illustration-2.png" className="h-75 position-absolute left-0 mt-7" alt="..." />
                  </div>
                </div>
              </Link>
            </div>
            
          </div>
        </div>
      </section>
    );
  }
}

export default Homeblock;