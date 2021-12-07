import React, { Component } from 'react';

//import nl2br from 'react-newline-to-break';
//import axios from 'axios'

export default class SlideOnesubtwo extends Component {



    render() {

        return (

        <>
        
        <div className="item_main">

        <div className="over_info_col">
            <form action="">
                <h2 className="over_title">Location</h2>
                <div className="overlay_content">
                    <div className="row">
                       
                        <div className="col-12 col-md-12">
                            <div className="form-group">
                                <label className="form-label">City</label>
                                <i className="fa fa-map-marker"></i>
                                <select className="selectoption custom-select form-control" name="" id="">
                                    <option value="">City Name</option>
                                    <option value="">City Name</option>
                                    <option value="">City Name</option>
                                    <option value="">City Name</option>
                                    <option value="">City Name</option>
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