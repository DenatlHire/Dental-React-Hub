import React, { Component } from 'react';

//import nl2br from 'react-newline-to-break';
//import axios from 'axios'

export default class SlideOne extends Component {



    render() {

        return (

        <>
        
        <div className="item_main">

        <div className="over_info_col">
            <form action="">
                <h2 className="over_title">Personal Information</h2>
                <div className="overlay_content">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label className="form-label">First Name</label>
                                <i className="fe fe-user"></i>
                                <input className="form-control" type="text" placeholder="First Name"></input>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Last Name</label>
                                <i className="fe fe-user"></i>
                                <input className="form-control" id="" name="" type="text" placeholder="Last Name" value=""></input>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <i className="fe fe-mail"></i>
                                <input className="form-control" id="" name="" type="text" placeholder="Email" value=""></input>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Phone No</label>
                                <i className="fe fe-phone-call"></i>
                                <input className="form-control" id="" name="" type="text" placeholder="Phone No" value=""></input>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label className="form-label">City</label>
                                <i className="fe fe-map-pin"></i>
                                <select className="selectoption custom-select form-control" name="" id="">
                                    <option value="">City Name</option>
                                    <option value="">City Name</option>
                                    <option value="">City Name</option>
                                    <option value="">City Name</option>
                                    <option value="">City Name</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Facebook Link</label>
                                <i className="fe fe-facebook"></i>
                                <input className="form-control" id="" name="" type="text" placeholder="https://www.facebook.com/" value=""></input>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Twitter Link</label>
                                <i className="fe fe-twitter"></i>
                                <input className="form-control" id="" name="" type="text" placeholder="https://twitter.com/" value=""></input>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label className="form-label">LinkedIn Link</label>
                                <i className="fe fe-linkedin"></i>
                                <input className="form-control" id="" name="" type="text" placeholder="https://www.linkedin.com/" value=""></input>
                            </div>
                        </div>
                    </div>

                </div>

            </form>
        </div>

    </div>
    </>
        )

     }

}   