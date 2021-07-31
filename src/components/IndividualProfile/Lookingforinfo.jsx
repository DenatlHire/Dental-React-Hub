import React, { Component } from 'react';
import BuyPracticePopup from './BuyPracticePopup';

import axios from 'axios';
import $ from 'jquery';
const isAuthenticated = localStorage.getItem('token');
const userinfo = JSON.parse(localStorage.getItem('user'));
const separator = ' | ';

class Lookingforinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            yearList: null,
            designationsitems: [],
            unicollegeitems: [],
            contractitems: [],
            travellingitems: [],
            officeitems: [],
            skillsetitems: [],
            timeitems: [],
            daystems: [],
            roleitems: [],
            administrativerolesitems: [],
            clinicalexperiencesitems: [],
            //            postgraduatesitems: [],
            user_id: userinfo.id,
            year_graduation: '',
            role_id: '',
            year_post_graduation: '',
            clinical_experience: '',
            administrative_experience: '',
            total_experience: '',
        };

    }

    componentDidMount() {

        axios.get("user-informations", {
            params: {
                user_id: this.state.user_id
            }
        })
            .then(response => {

                this.setState({
                    isLoaded: true,
                    id: response.data[0].id,
                    setuserid: response.data[0].user_id.id,
                    designation_id: response.data[0].designation_id.id,
                    role_id: response.data[0].role_id.id,
                    year_graduation: response.data[0].year_graduation,
                    university_id: response.data[0].university_id.id,
                    year_post_graduation: response.data[0].year_post_graduation,
                    clinical_experience: response.data[0].clinical_experience.id,
                    administrative_experience: response.data[0].administrative_experience,
                    total_experience: response.data[0].total_experience,
                    // contract_type_id: response.data[0].contract_type_id.id,
                    // travel_type_id: response.data[0].travel_type_id.id,
                    // office_type_id: response.data[0].office_type_id.id,
                    // skillset_type_id: response.data[0].skillset_type_id.id,
                    hours_time: response.data[0].hours_time,
                    hours_day: response.data[0].hours_day,
                    latitude: "" + response.data[0].latitude + "",
                    longitude: "" + response.data[0].longitude + ""
                });

                this.getDesignations(response.data[0].designation_id.id);
                //                    this.getYearofPostGraduation(response.data.year_post_graduation);
                this.getClinicalExperiences(response.data[0].clinical_experience);
                this.getUniversityColleges(response.data[0].university_id.id);
                this.getContractTypes(response.data[0].contract_type_id);
                this.getTravellingOptions(response.data[0].travel_type_id);
                this.getOfficeTypes(response.data[0].office_type_id);
                this.getSkillsetTypes(response.data[0].skillset_type_id);
                this.getTime(response.data[0].hours_time);
                this.getDays(response.data[0].hours_day);
                if (response.data[0].designation_id.id != '5') {
                    this.getDentistRoles(response.data[0].role_id.id);
                } else {
                    this.getAdministrativeRoles(response.data[0].role_id.id);
                }

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    //    getYearofPostGraduation(id){
    //         axios.get("years-of-post-graduates/"+id)
    //            .then(response => {
    //                this.setState({
    //                    isLoaded: true,
    //                    postgraduatesitems: response.data
    //                });
    //               // $('select').selectpicker();
    //            })
    //            .catch(function (error) {
    //                // handle error
    //                console.log(error);
    //            })
    //    }

    getClinicalExperiences(id) {
        axios.get("clinical-experiences/" + (id ? id : ''))
            .then(response => {
                this.setState({
                    isLoaded: true,
                    clinicalexperiencesitems: response.data
                });
                // $('select').selectpicker();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getAdministrativeRoles(id) {
        axios.get("administrative-roles/" + (id ? id : ''))
            .then(response => {
                this.setState({
                    isLoaded: true,
                    administrativerolesitems: response.data
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getDesignations(id) {
        axios.get("designations/" + (id ? id : ''))
            .then(response => {
                this.setState({
                    isLoaded: true,
                    designationsitems: response.data
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getDentistRoles(id) {
        axios.get("dentist-roles/" + (id ? id : ''))
            .then(response => {
                this.setState({
                    isLoaded: true,
                    roleitems: response.data
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getUniversityColleges(id) {
        axios.get("university-colleges/" + (id ? id : ''))
            .then(response => {
                this.setState({
                    isLoaded: true,
                    unicollegeitems: response.data
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getContractTypes(ids) {
        var idArr = ids.split(",");
        var param = '';
        idArr.forEach((item) => {
            param += 'id_in=' + item + '&';
        })
        axios.get("contract-types?" + param)
            .then(response => {
                var str = '';
                var i = response.data.length;
                if (i) {
                    response.data.forEach((obj, index) => {
                        str += obj.title + (index + 1 === i ? '' : separator)
                    });
                }
                this.setState({
                    isLoaded: true,
                    contractitems: str
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getTravellingOptions(ids) {
        var idArr = ids.split(",");
        var param = '';
        idArr.forEach((item) => {
            param += 'id_in=' + item + '&';
        })
        axios.get("travelling-options?" + param)
            .then(response => {
                var str = '';
                var i = response.data.length;
                if (i) {
                    response.data.forEach((obj, index) => {
                        str += obj.title + (index + 1 === i ? '' : separator)
                    });
                }
                this.setState({
                    isLoaded: true,
                    travellingitems: str
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getOfficeTypes(ids) {
        var idArr = ids.split(",");
        var param = '';
        idArr.forEach((item) => {
            param += 'id_in=' + item + '&';
        })
        axios.get("office-types?" + param)
            .then(response => {
                var str = '';
                var i = response.data.length;
                if (i) {
                    response.data.forEach((obj, index) => {
                        str += obj.title + (index + 1 === i ? '' : separator)
                    });
                }
                this.setState({
                    isLoaded: true,
                    officeitems: str
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getSkillsetTypes(ids) {
        var idArr = ids.split(",");
        var param = '';
        idArr.forEach((item) => {
            param += 'id_in=' + item + '&';
        })

        axios.get("skillset-types?" + param)
            .then(response => {
                var str = '';
                var i = response.data.length;
                if (i) {
                    response.data.forEach((obj, index) => {
                        str += obj.title + (index + 1 === i ? '' : separator)
                    });
                }

                this.setState({
                    isLoaded: true,
                    skillsetitems: str
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getTime(ids) {
        var idArr = ids.split(",");
        var param = '';
        idArr.forEach((item) => {
            param += 'id_in=' + item + '&';
        })

        axios.get("working-times?" + param)
            .then(response => {
                var str = '';
                var i = response.data.length;
                if (i) {
                    response.data.forEach((obj, index) => {
                        str += obj.title + (index + 1 === i ? '' : separator)
                    });
                }

                this.setState({
                    isLoaded: true,
                    timeitems: str
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getDays(ids) {
        var idArr = ids.split(",");
        var param = '';
        idArr.forEach((item) => {
            param += 'id_in=' + item + '&';
        })

        axios.get("working-days?" + param)
            .then(response => {
                var str = '';
                var i = response.data.length;
                if (i) {
                    response.data.forEach((obj, index) => {
                        str += obj.title + (index + 1 === i ? '' : separator)
                    });
                }

                this.setState({
                    isLoaded: true,
                    daysitems: str
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    preventDefault = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <div className="looking_for_info text-center">
                    <div className="shadow card-border looking_for_box border-primary p-6 mt-8 mb-5 bg-white">
                        {this.state.setuserid == userinfo.id ? (
                            <div className="l_list">
                                <h3 className="font-weight-bold">
                                    Your Preferences
                                </h3>
                                <div className="list-group list-group-flush">
                                    <a href onClick={this.preventDefault} className="edit-icon icon-plus shadow" data-toggle="modal" data-target="#lookingforinfo"  ><i className="fe fe-edit-2"></i></a>
                                    <a className="list-group-item text-reset text-decoration-none" href onClick={this.preventDefault}>
                                        {this.state.designationsitems && (
                                            <div className="l_list"><a className="fw-bold" href onClick={this.preventDefault}>Designation:</a> <br/> {this.state.designationsitems.name}</div>
                                        )}
                                        {this.state.designation_id == 1 && (
                                            <div className="l_list"><a className="fw-bold" href onClick={this.preventDefault}>Role:</a> <br/> {this.state.roleitems.role}</div>
                                        )}

                                        {this.state.designation_id == 5 && (
                                            <div className="l_list"><a className="fw-bold" href onClick={this.preventDefault}>Role:</a> <br/> {this.state.administrativerolesitems.role}</div>
                                        )}
                                        {this.state.year_graduation && (
                                            <div className="l_list"><a className="fw-bold" href onClick={this.preventDefault}>Year of Graduation / Residency Completion:</a> <br/> {this.state.year_graduation}</div>
                                        )}
                                        {this.state.unicollegeitems && (
                                            <div className="l_list"><a className="fw-bold" href onClick={this.preventDefault}>University/College:</a> <br/> {this.state.unicollegeitems.name}</div>
                                        )}
                                        {this.state.year_post_graduation && (
                                            <div className="l_list"><a className="fw-bold" href onClick={this.preventDefault}>Year of Post Graduation:</a> <br/> {this.state.year_post_graduation}</div>
                                        )}

                                        {this.state.administrative_experience && this.state.designation_id == 5 && (
                                            <div className="l_list"><a className="fw-bold" href onClick={this.preventDefault}>Years of administrative work experience:</a> <br/> {this.state.administrative_experience}</div>
                                        )}
                                        {this.state.total_experience && this.state.designation_id == 5 && (
                                            <div className="l_list"><a className="fw-bold" href onClick={this.preventDefault}>Years of any work experience:</a> <br/> {this.state.total_experience}</div>
                                        )}
                                        {this.state.clinicalexperiencesitems && (
                                            <div className="l_list"><a className="fw-bold" href onClick={this.preventDefault}>Clinical Experience:</a> <br/> {this.state.clinicalexperiencesitems.title}</div>
                                        )}
                                        {this.state.contractitems && (
                                            <div className="l_list"><a className="fw-bold" href onClick={this.preventDefault}>Contract Types:</a> <br/> {this.state.contractitems}</div>
                                        )}
                                        {this.state.travellingitems && (
                                            <div className="l_list"><a className="fw-bold" href onClick={this.preventDefault}>How far are you willing to travel to work?:</a> <br/> {this.state.travellingitems}</div>
                                        )}
                                        {this.state.officeitems && (
                                            <div className="l_list"><a className="fw-bold" href onClick={this.preventDefault}>What type of office are you looking for?:</a> <br/> {this.state.officeitems}</div>
                                        )}
                                        {this.state.skillsetitems && (
                                            <div className="l_list"><a className="fw-bold" href onClick={this.preventDefault}>Skillset/Proficiencies:</a> <br/> {this.state.skillsetitems}</div>
                                        )}
                                        {this.state.timeitems && (
                                            <div className="l_list"><a className="fw-bold" href onClick={this.preventDefault}>Preferred Working Time:</a> <br/> {this.state.timeitems}</div>
                                        )}
                                        {this.state.daysitems && (
                                            <div className="l_list"><a className="fw-bold" href onClick={this.preventDefault}>Preferred Working Days:</a> <br/> {this.state.daysitems}</div>
                                        )}

                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2 className="mb-1 lable_title">
                                    Are you looking for a position?
                                </h2>
                                <div className="mt-4">
                                    <a className="btn btn-primary btn-xs font-weight-500" href onClick={this.preventDefault} data-toggle="modal" data-target="#lookingforinfo" title="Setup Your Profile">Setup Your Profile</a>
                                </div>
                            </div>
                        )}
                        <div className="divider">
                            <div className="or_divider">OR</div>
                        </div>


                        <h2 className="mb-1 lable_title">
                            Looking to buy a practice?
                        </h2>

                        <div className="mt-4">
                            <a className="btn btn-primary btn-xs font-weight-500" href onClick={this.preventDefault} data-toggle="modal" data-target="#buypractice" title="Yes, I want to buy a practice">Yes, I want to buy a practice</a>
                        </div>
                    </div>
                </div>
                <BuyPracticePopup />
            </div>

        );
    }
}

export default Lookingforinfo;