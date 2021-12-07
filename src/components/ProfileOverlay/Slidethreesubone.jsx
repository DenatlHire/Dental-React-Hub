import React, { Component } from 'react';

//import nl2br from 'react-newline-to-break';
//import axios from 'axios'

export default class Slidethreesubone extends Component {



    render() {

        return (

        <>
        
        <div className="item_main">
                                <div className="over_info_col">
                                    <form action="">
                                        <h2 className="over_title">Education Information</h2>
                                        <div className="overlay_content">
                                            <div className="row">
                                                  <div className="col-12 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Start Month</label>
                                                        <i className="fa fa-calendar-check-o"></i>
                                                        <select className="selectoption custom-select form-control" name="" id="">
                                                            <option value="">Please Select Start Month</option>
                                                            <option value="">12</option>
                                                            <option value="">12</option>
                                                            <option value="">12</option>
                                                            <option value="">12</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Start Year</label>
                                                        <i className="fa fa-calendar-check-o"></i>
                                                        <select className="selectoption custom-select form-control" name="" id="">
                                                            <option value="">Please Select Start Year</option>
                                                            <option value="">2000</option>
                                                            <option value="">2000</option>
                                                            <option value="">2000</option>
                                                            <option value="">2000</option>
                                                        </select>
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