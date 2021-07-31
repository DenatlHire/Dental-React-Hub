import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
const isAuthenticated = localStorage.getItem('token');
const userinfo = JSON.parse(localStorage.getItem('user'));

class PersonalInfoPopup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            citiesitems: [],
            userinfoitems: [],
            setuser: '',
            designationsname: '',
            cityname: '',
            stateid: '',
            statename: '',
            user_id: userinfo.id,
            userinfoid: '',
            firstname: userinfo.firstname,
            lastname: userinfo.lastname,
            email: userinfo.email,
            phone: userinfo.phone,
            city_id: '',
            facebook_link: '',
            twitter_link: '',
            linkedin_link: '',
            resume: '',
            firstnameError: '',
            lastnameError: '',
            phoneError: '',
            hasError: false
        };
    }
    componentDidMount() {
        axios.get("cities")
            .then(response => {
                this.setState({
                    citiesitems: response.data
                });
                //  $('select').selectpicker();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

        axios.get("user-informations", {
            params: {
                user_id: userinfo.id
            }
        }).then(response => {
            this.setState({
                isLoaded: true,
                userinfoid: (response.data[0].id) ? response.data[0].id : null,
                city_id: (response.data[0].city_id) ? response.data[0].city_id.id : null,
                facebook_link: response.data[0].facebook_link,
                twitter_link: response.data[0].twitter_link,
                linkedin_link: response.data[0].linkedin_link,
                setuser: response.data[0].user_id.id
            });
            if (response.data[0].designation_id) {
                axios.get("designations/" + response.data[0].designation_id.id)
                    .then(response => {
                        this.setState({
                            isLoaded: true,
                            designationsname: response.data.name
                        });
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })

            }


            if (response.data[0].city_id) {
                axios.get("cities/" + response.data[0].city_id.id)
                    .then(response => {
                        this.setState({
                            isLoaded: true,
                            cityname: response.data.name,
                            stateid: (response.data.state_id) ? response.data.state_id.id : null,
                        });
                        if (response.data.state_id.id) {
                            axios.get("states/" + response.data.state_id.id)
                                .then(response => {
                                    this.setState({
                                        isLoaded: true,
                                        statename: response.data.name
                                    });
                                })
                                .catch(function (error) {
                                    // handle error
                                    console.log(error);
                                })
                        }
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })

            }



        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }

    updateAboutInformation() {

        axios.put('users/' + userinfo.id, {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phone: this.state.phone,
        })
            .then(response => {
                // Handle success.
                localStorage.setItem("user", JSON.stringify(response.data));
                window.location.href = '/myprofile';
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });

        axios.put('user-informations/' + this.state.userinfoid, {
            user_id: userinfo.id,
            city_id: this.state.city_id,
            facebook_link: this.state.facebook_link,
            twitter_link: this.state.twitter_link,
            linkedin_link: this.state.linkedin_link
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
    //    submitAboutInformation() {
    //
    //       axios.put('users/' + userinfo.id, {
    //            firstname: this.state.firstname,
    //            lastname: this.state.lastname,
    //            email: this.state.email,
    //        })
    //            .then(response => {
    //                // Handle success.
    //                localStorage.setItem("user", JSON.stringify(response.data));
    //                window.location.href = '/myprofile';
    //            })
    //            .catch(error => {
    //                // Handle error.
    //                console.log('An error occurred:', error.response);
    //            });
    //
    //        axios.post('user-informations', {
    //            user_id: this.state.user_id,
    //            phone: this.state.phone,
    //            city_id: this.state.city_id,
    //            facebook_link: this.state.facebook_link,
    //            twitter_link: this.state.twitter_link,
    //            linkedin_link: this.state.linkedin_link
    //        })
    //            .then(response => {
    //                // Handle success.
    //                window.location.href = '/myprofile';
    //            })
    //            .catch(error => {
    //                // Handle error.
    //                console.log('An error occurred:', error.response);
    //            });
    //    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value,
        });
    }

    valid() {
        if (!this.state.firstname) {
            this.setState({
                firstnameError: "Please enter first name."
            });
            return false;
        }
        if (!this.state.lastname) {
            this.setState({
                lastnameError: "Please enter last name."
            });
            return false;
        }
        if (!this.state.email) {
            this.setState({
                emailError: "Please enter email address."
            });
            return false;
        }
        if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.setState({
                emailError: "Please enter valid email address."
            });

            return false;
        }
        if (!this.state.phone) {
            this.setState({
                phoneError: "Please enter phone no."
            });
            return false;
        }

        return true;
    }

    submit() {
        if (this.valid()) {
            this.updateAboutInformation();
            //            if (this.state.setuser == userinfo.id) {
            //                this.updateAboutInformation();
            //            } else {
            //                this.submitAboutInformation();
            //            }
        }
        return false;
    }

    preventSubmit = function (e) {
        e.preventDefault();
    }

    render() {

        const str1 = userinfo.firstname;
        const str2 = ' ' + userinfo.lastname;
        const username = str1.concat(str2);
        return (
            <div className="about_info shadow">
                <a href="#" className="edit-icon shadow" data-toggle="modal" data-target="#editpersonalinformation">
                    <i className="fe fe-edit-2"></i>
                </a>
                <div className="row">
                    <div className="col-md-12">
                        {isAuthenticated ? (
                            <h2 className="avatar-name mb-1">{userinfo.type == '2' ? userinfo.clinicname : username}</h2>
                        ) : (
                            <h2 className="avatar-name mb-0">Name </h2>
                        )}
                        {userinfo.email && (
                            <div className="degination mb-1"><i className="fe fe-mail mr-1"></i> {userinfo.email}</div>
                        )}
                        {this.state.designationsname && (
                            <div className="degination mb-1"><i className="fe fe-briefcase mr-1"></i> {this.state.designationsname}</div>
                        )}
                        {this.state.cityname && (
                            <div className="address"><i className="fe fe-map-pin mr-1"></i>  {this.state.cityname}, {this.state.statename}</div>
                        )}
                        <ul className="social-media mt-3 m-0 p-0 list-inline d-flex">
                            {this.state.facebook_link && (
                                <li className="mr-3">
                                    <a href={this.state.facebook_link} target="_blank" title="Facebook"><i className="fe fe-facebook"></i></a>
                                </li>
                            )}
                            {this.state.twitter_link && (
                                <li className="mr-3">
                                    <a href={this.state.twitter_link} target="_blank" title="Twitter"><i className="fe fe-twitter"></i></a>
                                </li>
                            )}
                            {this.state.linkedin_link && (
                                <li className="mr-3">
                                    <a href={this.state.linkedin_link} target="_blank" title="Linkedin"><i className="fe fe-linkedin"></i></a>
                                </li>
                            )}
                        </ul>

                    </div>
                </div>
                <div className="modal edit-modal fade" id="editpersonalinformation" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="editpersonalinformationLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editpersonalinformationLabel">Personal Information</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="card-body p-0">
                                    <form onSubmit={(event) => this.preventSubmit(event)}>
                                        <input type="hidden" id="userinfoid" name="userinfoid" value={this.state.userinfoid} />
                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="firstname">First Name</label>
                                                    <input className="form-control" id="firstname" name="firstname" onChange={(event) => this.handleUserInput(event)} type="text" value={this.state.firstname} placeholder="First Name" />
                                                    <p className="text-danger">{this.state.firstnameError}</p>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="lastname">Last Name </label>
                                                    <input className="form-control" id="lastname" name="lastname" onChange={(event) => this.handleUserInput(event)} type="text" value={this.state.lastname} placeholder="Last Name " />
                                                    <p className="text-danger">{this.state.lastnameError}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="email">Email</label>
                                                    <input className="form-control" id="email" name="email" type="email" onChange={(event) => this.handleUserInput(event)} value={this.state.email} placeholder="Email " />
                                                    <p className="text-danger">{this.state.emailError}</p>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="phone">Phone No</label>
                                                    <input className="form-control" id="phone" name="phone" value={this.state.phone} onChange={(event) => this.handleUserInput(event)} type="tel" placeholder="Phone No " />
                                                    <p className="text-danger">{this.state.phoneError}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="col-12 col-md-6">
                                                <div className="form-group mb-5">
                                                    <label className="form-label" >City </label>
                                                    <select className="selectoption custom-select form-control" name="city_id" id="city_id" onChange={(event) => this.handleUserInput(event)}>
                                                        <option value="">Please Select City</option>
                                                        {this.state.citiesitems.map(citem => (
                                                            <option value={citem.id} selected={citem.id == this.state.city_id} key={citem.id}>{citem.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="facebook_link">Facebook Link</label>
                                                    <input className="form-control" id="facebook_link" name="facebook_link" value={this.state.facebook_link} onChange={(event) => this.handleUserInput(event)} type="text" placeholder="Facebook Link " />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="twitter_link">Twitter Link</label>
                                                    <input className="form-control" id="twitter_link" name="twitter_link" type="text" value={this.state.twitter_link} onChange={(event) => this.handleUserInput(event)} placeholder="Twitter Link " />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="linkedin_link">Linkedin Link</label>
                                                    <input className="form-control" id="linkedin_link" name="linkedin_link" type="text" value={this.state.linkedin_link} onChange={(event) => this.handleUserInput(event)} placeholder="Linkedin Link " />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-12 justify-content-end d-flex">

                                                <button className="btn btn-primary mb-6 mt-6 mb-md-0 lift" type="submit" onClick={() => this.submit()}>
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

            </div>
        );
    }
}

export default PersonalInfoPopup;