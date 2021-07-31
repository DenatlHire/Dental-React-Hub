import React, { Component } from 'react';

//import nl2br from 'react-newline-to-break';
//import axios from 'axios'

export default class Slidesixth extends Component {



    render() {

        return (

            <>

                <div className="item_main">

                    <div className="over_info_col resume-box">
                        <form action="">
                            <h2 className="over_title">Upload Resume</h2>
                            <div className="overlay_content deignation_col">
                                <div className="row">
                                   
                                 <div className="col-12">
                                   
                                   <div className="overlay_resume">
                                   <div className="icon text-primary mr-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z" /><path d="M8 3v.5A1.5 1.5 0 009.5 5h5A1.5 1.5 0 0016 3.5V3h2a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h2z" fill="#335EEA" opacity=".3" /><path d="M11 2a1 1 0 012 0h1.5a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-5a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5H11z" fill="#335EEA" /><rect fill="#335EEA" opacity=".3" x="7" y="10" width="5" height="2" rx="1" /><rect fill="#335EEA" opacity=".3" x="7" y="14" width="9" height="2" rx="1" /></g></svg>
                                    </div>
                                    <div className="ms-5">
                                        <div className="icon-list">
                                            <a
                                                href="#"
                                                className=""
                                                title="Upload Resume"
                                                onClick={this.handleResumeClick}
                                            >
                                                <i className="fe fe-upload mr-2"></i>
                                                Upload Resume
                                            </a>
                                            <input
                                                hidden
                                                name="resumeupload"
                                                id="resumeupload"
                                                type="file"
                                            />
                                        </div>
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