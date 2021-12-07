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
                                <i className="fa fa-user"></i>
                                <input className="form-control" type="text" placeholder="First Name"></input>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Last Name</label>
                                <i className="fa fa-user"></i>
                                <input className="form-control" id="" name="" type="text" placeholder="Last Name" value=""></input>
                            </div>
                        </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <i className="fa fa-envelope"></i>
                                <input className="form-control" id="" name="" type="text" placeholder="Email" value=""></input>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Phone No</label>
                                <i className="fa fa-phone-square  "></i>
                                <input className="form-control" id="" name="" type="text" placeholder="Phone No" value=""></input>
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