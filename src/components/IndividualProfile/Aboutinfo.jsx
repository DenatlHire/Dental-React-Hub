import React, { Component } from 'react';
import nl2br from 'react-newline-to-break';
import axios from 'axios';

const userinfo = JSON.parse(localStorage.getItem('user'));

class Aboutinfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            setuser: '',
            about: '',
            userinfoid: '',
            hasError: false,
            resume_file: null,
            resume_path: null
        };
    }

    componentDidMount() {
        axios.get("user-informations",{
            params: {
              user_id: userinfo.id
             }
          }).then(response => {
                this.setState({
                    isLoaded: true,
                    userinfoid: response.data[0].id,
                    about: response.data[0].about,
                    setuser: response.data[0].user_id.id,
                    resume_file: (response.data[0].resume) 
                        ? window.baseURL + response.data[0].resume.url 
                        : null
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    updateAboutInformation() {
        axios.put('user-informations/' + this.state.userinfoid, {
            user_id: this.state.user_id,
            about: this.state.about
        })
            .then(response => {
                // Handle success.
                window.location.href = '/myprofile';
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });
    }
    
    submitAboutInformation() {

        axios.post('user-informations', {
            user_id: this.state.user_id,
            about: this.state.about
        })
            .then(response => {
                // Handle success.
                window.location.href = '/myprofile';
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value,
        });
    }

    valid() {
        if (!this.state.about) {
            this.setState({
                aboutError: "Please enter about information."
            });
            return false;
        }

        return true;
    }

    submit() {
        if (this.valid()) {
            if (this.state.setuser == userinfo.id) {
                this.updateAboutInformation();
            } else {
                this.submitAboutInformation();
            }
        }
        return false;
    }

    preventSubmit = function (e) {
        e.preventDefault();
    }

    handleResumeClick = (e) => {
        this.resumeUpload.click();
    }

    handleResumeChange = (event) => {
        this.setState(
            {
                resume_path: event.target.files[0]
            },
            function () {
                this.handleResumeSubmit()
            }
        );
    }

    handleResumeSubmit = () => {

        const data = new FormData();
        data.append('ref', 'user-information');
        data.append('refId', userinfo.id);
        data.append('field', "resume");
        data.append('files', this.state.resume_path);

        this.sendReq(data);
    }

    sendReq = async (data) => {
        const upload_res = await axios({
            url: window.baseURL + '/upload',
            method: "POST",
            data
        });

        if (upload_res && upload_res.data[0]) {
            console.log("Resume uploaded...")
            this.setState({
                resume_file: window.baseURL + upload_res.data[0].url
            });

        } else {
            alert("Somthing went wrong. Please try again.")
        }
    }

    render() {
        return (
            <div className="shadow card-border resume-box border-primary p-5 mt-8 mb-5 bg-white">
                <div className="d-flex justify-content-between">
                    <h3 className="font-weight-bold">About</h3>
                </div>
                {this.state.about ? (
                    <p>{nl2br(this.state.about)}</p>
                ) : (
                     <div className="fw-bold mb-1 job_desgnation text-center">No Educations Found.</div>
                )}
                <div>

                </div>
                <div className="d-flex align-items-center">
                    <a href="#" className="edit-icon shadow" data-toggle="modal" data-target="#editaboutinformation">
                        <i className="fe fe-edit-2"></i>
                    </a>
                    <div className="modal edit-modal fade" id="editaboutinformation" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="editaboutinformationLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-scrollable" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="editaboutinformationLabel">About Information</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="card-body p-0">
                                        <form onSubmit={(event) => this.preventSubmit(event)}>
                                        <input type="hidden" id="userinfoid" name="userinfoid" value={this.state.userinfoid} />
                                            <div className="row">

                                                <div className="col-12">
                                                    <div className="form-group mb-5">
                                                        <label className="form-label" htmlFor="about">About Info</label>
                                                        <textarea className="form-control" id="about" name="about" rows="7" onChange={(event) => this.handleUserInput(event)} value={this.state.about} placeholder=""></textarea>
                                                        <p className="text-danger">{this.state.aboutError}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 justify-content-end d-flex">
                                                    <button className="btn btn-primary mb-6 mt-6 mb-md-0 lift"  type="submit" onClick={() => this.submit()}>
                                                        Save
                                                    </button>
                                                    <button className="btn btn-danger ml-2 mb-6 mt-6 mb-md-0 lift" data-dismiss="modal" aria-label="Close">
                                                    Cancel
                                                </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="icon text-primary mr-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z" /><path d="M8 3v.5A1.5 1.5 0 009.5 5h5A1.5 1.5 0 0016 3.5V3h2a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h2z" fill="#335EEA" opacity=".3" /><path d="M11 2a1 1 0 012 0h1.5a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-5a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5H11z" fill="#335EEA" /><rect fill="#335EEA" opacity=".3" x="7" y="10" width="5" height="2" rx="1" /><rect fill="#335EEA" opacity=".3" x="7" y="14" width="9" height="2" rx="1" /></g></svg>
                    </div>
                    <div className="ms-5">
                        <div className="icon-list">
                            {this.state.resume_file ? (
                            <a 
                                href={this.state.resume_file} 
                                className="mr-2"
                                target="_blank"
                                title="Download Resume"
                            >
                                <i className="fe fe-download mr-2"></i>
                                Download Resume
                            </a>) : null }
                            
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
                                onChange={this.handleResumeChange}
                                ref={input => this.resumeUpload = input}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Aboutinfo;