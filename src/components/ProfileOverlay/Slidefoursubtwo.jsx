import React, { Component } from 'react';
//import nl2br from 'react-newline-to-break';
//import axios from 'axios'

export default class Slidefoursubtwo extends Component {



    render() {

        return (

        <>
        
        <div className="item_main">
                                <div className="over_info_col">
                                    <form action="">
                                        <h2 className="over_title">Looking For</h2>
                                        <div className="overlay_content">
                                            <div className="row">
                                            <div className="col-12 col-md-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Clinical Experience</label>
                                                        <i className="fa fa-address-card"></i>
                                                       <select className="selectoption custom-select form-control" name="" id="">
                                                            <option value="">Please Select Clinical Experience</option>
                                                            <option value="">0-1</option>
                                                            <option value="">2</option>
                                                            <option value="">2-3</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Contract Types</label>
                                                        <i className="fa fa-hourglass"></i>
                                                        <select className="selectoption custom-select form-control" name="" id="">
                                                            <option value="">Please Select Contract Types</option>
                                                            <option value="">Full Time</option>
                                                            <option value="">Contract</option>
                                                            <option value="">Locum</option>
                                                        </select>
                                                    </div>
                                                </div>

                                              <div className="col-12 col-md-12">
                                                    <div className="form-group">
                                                        <label className="form-label">What type of office are you looking for?</label>
                                                        <i className="fa fa-building"></i>
                                                        <select className="selectoption custom-select form-control" name="" id="">
                                                            <option value="">Please Select Office Types</option>
                                                            <option value="">Busy/Slower Pace</option>
                                                            <option value="">Social/Quiet</option>
                                                            <option value="">Large/Small Team</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Hours Available</label>
                                                        <div className="s_wrap">
                                                        <i className="fa fa-clock-o"></i>
                                                        <select className="selectoption custom-select form-control" name="" id="">
                                                            <option value="">Please Select</option>
                                                            <option value="">Day</option>
                                                            <option value="">Evening</option>
                                                            <option value="">Both</option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                    
                                                </div>

                                                   <div className="col-12 col-md-12">
                                                    <div className="form-group">
                                                        <div className="s_wrap">
                                                        <i className="fa fa-clock-o"></i>
                                                        <select className="selectoption custom-select form-control" name="" id="">
                                                            <option value="">Please Select</option>
                                                            <option value="">Monday</option>
                                                            <option value="">Tuesday</option>
                                                            <option value="">Wednesday</option>
                                                            <option value="">Thursday</option>
                                                            <option value="">Friday</option>
                                                            <option value="">Saturday</option>
                                                            <option value="">Sunday</option>
                                                        </select>
                                                        </div>
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