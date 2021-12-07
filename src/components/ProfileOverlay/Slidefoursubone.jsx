import React, { Component } from 'react';
//import nl2br from 'react-newline-to-break';
//import axios from 'axios'

export default class Slidefoursubone extends Component {



    render() {

        return (

        <>
        
        <div className="item_main">
                                <div className="over_info_col">
                                    <form action="">
                                        <h2 className="over_title">Work Experience</h2>
                                        <div className="overlay_content">
                                            <div className="row">
                                               
                                                <div className="col-12 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Year of Graduation</label>
                                                        <i className="fa fa-graduation-cap"></i>
                                                        <select className="selectoption custom-select form-control" name="" id="">
                                                            <option value="">Please Select Year of Graduation</option>
                                                            <option value="">2021</option>
                                                            <option value="">2020</option>
                                                            <option value="">2019</option>
                                                            <option value="">2018</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Year of Post Graduation</label>
                                                        <i className="fa fa-graduation-cap"></i>
                                                       <input className="form-control" id="" name="" type="text" placeholder="Year of Post Graduation" value=""></input>
                                                    </div>
                                                </div>
                                                 <div className="col-12 col-md-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Skillset/Proficiencies</label>
                                                        <i className="fa fa-cog"></i>
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