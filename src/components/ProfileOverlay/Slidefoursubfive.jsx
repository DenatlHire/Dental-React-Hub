import React, { Component } from 'react';
//import nl2br from 'react-newline-to-break';
//import axios from 'axios'

export default class Slidefoursubfive extends Component {



    render() {

        return (

        <>
        
        <div className="item_main">
                                <div className="over_info_col">
                                    <form action="">
                                        <h2 className="over_title">Looking For</h2>
                                        <div className="overlay_content">
                                            <div className="row">
                                               
                                               

                                                <div className="col-12 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Clinical Experience</label>
                                                        <i className="fa fa-address-card
"></i>
                                                        <input className="form-control" id="" name="" type="text" placeholder="Clinical Experience" value=""></input>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Contract Types</label>
                                                        <i className="fa fa-pencil-square"></i>
                                                        <select className="selectoption custom-select form-control" name="" id="">
                                                            <option value="">Please Select Contract Types</option>
                                                            <option value="">Full Time</option>
                                                            <option value="">Contract</option>
                                                            <option value="">Locum</option>
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