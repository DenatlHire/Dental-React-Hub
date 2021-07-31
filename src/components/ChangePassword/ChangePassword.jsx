import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ChangePassword extends Component {

    render() {
        return (
            <section className="pt-4 py-md-10">
                <div className="container">
                    <div className="row align-items-center shadow">
                        <div className="col-md-12 common-form">
                            <div className="card card-row ">
                                <div className="row gx-0">
                                    <div className="col-12 col-md-5 d-none d-md-block bg-cover card-img-start" style={{ backgroundImage: 'url(./assets/img/photos/photo-8.jpg)' }}>
                                        <img src="/assets/img/photos/photo-8.jpg" alt="..." className="img-fluid d-md-none invisible" />
                                        <div className="shape shape-end shape-fluid-y svg-shim text-white d-none d-md-block">
                                            <svg viewBox="0 0 112 690" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M116 0H51v172C76 384 0 517 0 517v173h116V0z" fill="currentColor" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-7">
                                        <div className="card-body">

                                            <h2 className="mb-4 fw-bold text-center" id="modalSignupHorizontalTitle">
                                                Change Password
                                            </h2>

                                            <form className="mb-4">
                                                <div className="row signup-form">
                                                    <div className="col-md-12 s-col">
                                                        <div className="form-group mb-5">
                                                            <input type="text" className="form-control" id="clinicname" name="clinicname"
                                                                placeholder="Old Password " />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 s-col">
                                                        <div className="form-group mb-5">
                                                            <input type="text" className="form-control" id="clinicname" name="clinicname"
                                                                placeholder="New Password " />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 s-col">
                                                        <div className="form-group mb-5">
                                                            <input type="text" className="form-control" id="clinicname" name="clinicname"
                                                                placeholder="Confirm Password " />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="btn w-100 btn-primary" type="submit" onClick={() => this.submit()}>
                                                    Update
                                                </button>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default ChangePassword;