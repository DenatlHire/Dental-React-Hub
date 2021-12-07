import React, { Component } from 'react';

//import nl2br from 'react-newline-to-break';
//import axios from 'axios'

export default class SlideOnesubthree extends Component {



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
                                <label className="form-label">Twitter Link</label>
                                <i className="fa fa-twitter"></i>
                                <input className="form-control" id="" name="" type="text" placeholder="https://twitter.com/" value=""></input>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label className="form-label">LinkedIn Link</label>
                                <i className="fa fa-linkedin"></i>
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