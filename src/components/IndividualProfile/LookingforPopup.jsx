import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Multiselect from 'multiselect-react-dropdown';
import { min } from 'moment';

const isAuthenticated = localStorage.getItem('token');
const userinfo = JSON.parse(localStorage.getItem('user'));

class LookingforPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            yearList: null,
            value: '',
            designationsitems: [],
            unicollegeitems: [],
            contractitems: [],
            selectedContractList: null,
            selectedTravelList: null,
            selectedOfficeList: null,
            selectedSkillsetList: null,
            selectedHoursTime: null,
            selectedHoursDay: null,
            travellingitems: [],
            officeitems: [],
            skillsetitems: [],
            timeItems: [],
            dayItems: [],
            clinicalexperiencesitems: [],
            postgraduatesitems: [],
            roleitems: [],
            administrativerolesitems: [],
            id: '',
            setuserid: '',
            collageiditems: '',
            user_id: userinfo.id,
            designation_id: '',
            role_id: '',
            year_graduation: '',
            university_id: '',
            year_post_graduation: '',
            clinical_experience: '',
            contract_type_id: [],
            travel_type_id: [],
            office_type_id: [],
            skillset_type_id: [],
            hourTimeArr: [],
            hourDayArr: [],
            latitude: 0,
            longitude: 0,
            DesignationError: '',
            designationdataid: '',
            administrative_experience: '',
            total_experience: '',
            skilldataid: 1,
            hasError: false,
            hours_time: '',
            hours_day: '',
            userinfoid: '',

        };

        this.getDesignationData = this.getDesignationData.bind(this);
    }

    getDesignationData(event) {
        if (event.target.value == '5') {
            $("#adminroleid").show();
            $("#administrativeid").show();
            $("#totalexperienceid").show();
            $("#roleid").hide();
            $("#yearpostid").hide();
        } else if (event.target.value == '1') {
            $("#adminroleid").hide();
            $("#administrativeid").hide();
            $("#totalexperienceid").hide();
            $("#roleid").show();
            $("#yearpostid").show();
        } else {
            $("#roleid").hide();
            $("#yearpostid").show();
            $("#adminroleid").hide();
            $("#administrativeid").hide();
            $("#totalexperienceid").hide();
        }
        // this.getContractTypes(event.target.value);
        // this.getSkillsetTypes(event.target.value);
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
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
                    userinfoid: response.data[0].id,
                    setuserid: response.data[0].user_id.id,
                    designation_id: (response.data[0].designation_id) ? response.data[0].designation_id.id : null,
                    role_id: (response.data[0].role_id) ? response.data[0].role_id.id : null,
                    year_graduation: (response.data[0].year_graduation) ? response.data[0].year_graduation : null,
                    university_id: (response.data[0].university_id) ? response.data[0].university_id.id : null,
                    year_post_graduation: (response.data[0].year_post_graduation) ? response.data[0].year_post_graduation : null,
                    clinical_experience: (response.data[0].clinical_experience) ? response.data[0].clinical_experience : null,
                    administrative_experience: (response.data[0].administrative_experience) ? response.data[0].administrative_experience : null,
                    total_experience: (response.data[0].total_experience) ? response.data[0].total_experience : null,
                    contract_type_id: (response.data[0].contract_type_id) ? response.data[0].contract_type_id.split(",").map((val) => {
                        return parseInt(val)
                    }) : [],
                    travel_type_id: (response.data[0].travel_type_id) ? response.data[0].travel_type_id.split(",").map((val) => {
                        return parseInt(val)
                    }) : [],
                    office_type_id: (response.data[0].office_type_id) ? response.data[0].office_type_id.split(",").map((val) => {
                        return parseInt(val)
                    }) : [],
                    skillset_type_id: (response.data[0].skillset_type_id) ? response.data[0].skillset_type_id.split(",").map((val) => {
                        return parseInt(val)
                    }) : [],
                    latitude: "" + response.data[0].latitude + "",
                    longitude: "" + response.data[0].longitude + "",
                    hourTimeArr: (response.data[0].hours_time) ? response.data[0].hours_time.split(",").map((val) => {
                        return parseInt(val)
                    }) : [],
                    hourDayArr: (response.data[0].hours_day) ? response.data[0].hours_day.split(",").map((val) => {
                        return parseInt(val)
                    }) : [],
                });

                if (response.data[0].designation_id) {
                    // this.getContractTypes(response.data[0].designation_id.id);
                    // this.getSkillsetTypes(response.data[0].designation_id.id);
                    
                     if (response.data[0].designation_id.id == '5') {
                    $("#adminroleid").show();
                    $("#administrativeid").show();
                    $("#totalexperienceid").show();
                    $("#yearpostid").hide();
                    $("#roleid").hide();
                    } else if (response.data[0].designation_id.id == '1') {
                        $("#adminroleid").hide();
                        $("#yearpostid").show();
                        $("#administrativeid").hide();
                        $("#totalexperienceid").hide();
                        $("#roleid").show();
                    } else {
                        $("#roleid").show();
                        $("#yearpostid").show();
                        $("#adminroleid").hide();
                        $("#administrativeid").hide();
                        $("#totalexperienceid").hide();
                    }
                }else{
                     $("#roleid").show();
                        $("#yearpostid").show();
                        $("#adminroleid").hide();
                        $("#administrativeid").hide();
                        $("#totalexperienceid").hide();
                }

               
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        this.getDesignations();
        this.getDentistRoles();
        this.getUniversityColleges();
        this.getContractTypes();
        this.getTravellingOptions();
        this.getOfficeTypes();
        this.getSkillsetTypes();
        this.getAdministrativeRoles();
        this.getYearofPostGraduation();
        this.getClinicalExperiences();
        this.dataInit();
        this.getTimeOptions();
        this.getDayOptions();

        const success = position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.setState({
                latitude: latitude,
                longitude: longitude
            });
        };
        navigator.geolocation.getCurrentPosition(success);

    }

    getDesignations() {
        axios.get("designations")
            .then(response => {
                this.setState({
                    isLoaded: true,
                    designationsitems: response.data
                });
                // $('select').selectpicker();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getYearofPostGraduation() {
        axios.get("years-of-post-graduates")
            .then(response => {
                this.setState({
                    isLoaded: true,
                    postgraduatesitems: response.data
                });
                // $('select').selectpicker();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getClinicalExperiences() {
        axios.get("clinical-experiences")
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

    getDentistRoles() {
        axios.get("dentist-roles")
            .then(response => {
                this.setState({
                    isLoaded: true,
                    roleitems: response.data
                });
                // $('select').selectpicker();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getAdministrativeRoles() {
        axios.get("administrative-roles")
            .then(response => {
                this.setState({
                    isLoaded: true,
                    administrativerolesitems: response.data
                });
                //  $('select').selectpicker();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getUniversityColleges() {
        axios.get("university-colleges")
            .then(response => {
                this.setState({
                    isLoaded: true,
                    unicollegeitems: response.data
                });
                //  $('select').selectpicker();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getContractTypes(id) {
        axios.get("contract-types", {
            params: {
                designation_id: id
            }
        })
            .then(response => {
                this.setState({
                    isLoaded: true,
                    contractitems: response.data
                });

                var state = this.state;
                var t = [];
                response.data.forEach(function (item) {
                    if (state.contract_type_id.indexOf(item.id) !== -1) {
                        t.push(item);
                    }
                });

                this.setState({
                    selectedContractList: t,
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getTravellingOptions() {
        axios.get("travelling-options")
            .then(response => {
                this.setState({
                    isLoaded: true,
                    travellingitems: response.data
                });
                var state = this.state;
                var t = [];

                response.data.forEach(function (item) {
                    if (state.travel_type_id.indexOf(item.id) !== -1) {
                        t.push(item);
                    }
                });

                this.setState({
                    selectedTravelList: t,
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getOfficeTypes() {
        axios.get("office-types")
            .then(response => {
                this.setState({
                    isLoaded: true,
                    officeitems: response.data
                });
                var state = this.state;
                var t = [];

                response.data.forEach(function (item) {
                    if (state.office_type_id.indexOf(item.id) !== -1) {
                        t.push(item);
                    }
                });

                this.setState({
                    selectedOfficeList: t,
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getSkillsetTypes(id) {
        axios.get("skillset-types", {
            params: {
                designation_id: id
            }
        })
            .then(response => {
                this.setState({
                    isLoaded: true,
                    skillsetitems: response.data
                });
                var state = this.state;
                var t = [];

                response.data.forEach(function (item) {
                    if (state.skillset_type_id.indexOf(item.id) !== -1) {
                        t.push(item);
                    }
                });

                this.setState({
                    selectedSkillsetList: t,
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getTimeOptions() {
        axios.get("working-times")
            .then(response => {
                this.setState({
                    isLoaded: true,
                    timeItems: response.data
                });
                var state = this.state;
                var t = [];

                response.data.forEach(function (item) {
                    if (state.hourTimeArr.indexOf(item.id) !== -1) {
                        t.push(item);
                    }
                });

                this.setState({
                    selectedHoursTime: t,
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getDayOptions() {
        axios.get("working-days")
            .then(response => {
                this.setState({
                    isLoaded: true,
                    dayItems: response.data
                });
                var state = this.state;
                var t = [];

                response.data.forEach(function (item) {
                    if (state.hourDayArr.indexOf(item.id) !== -1) {
                        t.push(item);
                    }
                });

                this.setState({
                    selectedHoursDay: t,
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    updateLookingInformation() {
        //        this.postUniversityColleges();

        var contractArr = [];
        if (this.state.selectedContractList) {
            this.state.selectedContractList.forEach(function (item) {
                contractArr.push(item.id)
            })
        }

        var officeArr = [];
        if (this.state.selectedOfficeList) {
            this.state.selectedOfficeList.forEach(function (item) {
                officeArr.push(item.id)
            })
        }

        var travelArr = [];
        if (this.state.selectedTravelList) {
            this.state.selectedTravelList.forEach(function (item) {
                travelArr.push(item.id)
            })
        }

        var skillArr = [];
        if (this.state.selectedSkillsetList) {
            this.state.selectedSkillsetList.forEach(function (item) {
                skillArr.push(item.id)
            })
        }

        var timeArr = [];
        if (this.state.selectedHoursTime) {
            this.state.selectedHoursTime.forEach(function (item) {
                timeArr.push(item.id)
            })
        }

        var dayArr = [];
        if (this.state.selectedHoursDay) {
            this.state.selectedHoursDay.forEach(function (item) {
                dayArr.push(item.id)
            })
        }
        axios.put('user-informations/' + this.state.userinfoid, {
            user_id: this.state.user_id,
            designation_id: (this.state.designation_id) ? this.state.designation_id : null,
            role_id: (this.state.role_id) ? this.state.role_id : null,
            year_graduation: (this.state.year_graduation) ? this.state.year_graduation : null,
            university_id: (this.state.university_id) ? this.state.university_id : null,
            year_post_graduation: (this.state.year_post_graduation) ? this.state.year_post_graduation : null,
            clinical_experience: (this.state.clinical_experience) ? this.state.clinical_experience : null,
            administrative_experience: (this.state.administrative_experience) ? this.state.administrative_experience : null,
            total_experience: (this.state.total_experience) ? this.state.total_experience : null,
            contract_type_id: (contractArr) ? contractArr.join() : null,
            travel_type_id: (travelArr) ? travelArr.join() : null,
            office_type_id: (officeArr) ? officeArr.join() : null,
            skillset_type_id: (skillArr) ? skillArr.join() : null,
            latitude: "" + this.state.latitude + "",
            longitude: "" + this.state.longitude + "",
            hours_time: (timeArr) ? timeArr.join() : null,
            hours_day: (dayArr) ? dayArr.join() : null,
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

    postUniversityColleges() {
        const cvalue = this.state.value;
        axios.post('university-colleges', {
            name: cvalue
        }).then(response => {
            this.setState({
                isLoaded: true,
                collageiditems: response.data.id
            });
        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        });
    }

    valid() {
        //        if (!this.state.designation_id) {
        //            this.setState({
        //                DesignationError: "Please select designation."
        //            });
        //            return false;
        //        }
        return true;
    }

    submit() {
        if (this.valid()) {
            this.updateLookingInformation();
        }

        return false;
    }

    preventSubmit = function (e) {
        e.preventDefault();
    }

    dataInit() {
        let date = new Date();
        let current_year = date.getFullYear();
        let yearList = [];
        let dayList = [];
        new Promise((resolve, reject) => {
            for (let i = 0; i < 100; i++) {
                let y = current_year - i;
                yearList.push(y);
            }
            for (let k = 1; k < 32; k++) {
                dayList.push(k);
            }
            resolve();
        }).then((...e) => {
            this.setState({
                yearList,
                dayList,
            });
        });
    }

    onSelect = (selectedList, selectedItem) => {
        this.setState({
            selectedContractList: selectedList
        })
    }
    onSelectOffice = (selectedList, selectedItem) => {
        this.setState({
            selectedOfficeList: selectedList
        })
    }
    onSelectTravel = (selectedList, selectedItem) => {
        this.setState({
            selectedTravelList: selectedList
        })
    }
    onSelectSkills = (selectedList, selectedItem) => {
        this.setState({
            selectedSkillsetList: selectedList
        })
    }

    onSelectTime = (selectedList, selectedItem) => {
        this.setState({
            selectedHoursTime: selectedList
        })
    }

    onSelectDay = (selectedList, selectedItem) => {
        this.setState({
            selectedHoursDay: selectedList
        })
    }

    onRemove = (selectedList, selectedItem) => {
        this.setState({
            selectedContractList: selectedList
        })
    }

    onRemoveOffice = (selectedList, selectedItem) => {
        this.setState({
            selectedOfficeList: selectedList
        })
    }
    onRemoveTravel = (selectedList, selectedItem) => {
        this.setState({
            selectedTravelList: selectedList
        })
    }
    onRemoveSkills = (selectedList, selectedItem) => {
        this.setState({
            selectedSkillsetList: selectedList
        })
    }

    onRemoveTime = (selectedList, selectedItem) => {
        this.setState({
            selectedHoursTime: selectedList
        })
    }

    onRemoveDay = (selectedList, selectedItem) => {
        this.setState({
            selectedHoursDay: selectedList
        })
    }

    render() {

        return (
            <div className="modal edit-modal fade" id="lookingforinfo" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="lookingforinfoLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editpersonalinformationLabel">Looking For</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="card-body p-0">
                                <form onSubmit={(event) => this.preventSubmit(event)}>
                                    <input type="hidden" id="userinfoid" name="userinfoid" value={this.state.userinfoid} />
                                    <div className="row">
                                        <div className="col-12 col-md-12">
                                            <div className="form-group main_content">
                                                <label className="form-label" htmlFor="designation_id">Designation</label>
                                                <select className="selectoption custom-select form-control" name="designation_id" onChange={this.getDesignationData}>
                                                    <option value="">Please Select Designation</option>
                                                    {this.state.designationsitems.map(ditem => (
                                                        <option value={ditem.id} key={ditem.id} selected={ditem.id == this.state.designation_id}>{ditem.name}</option>
                                                    ))}
                                                </select>
                                                <p className="text-danger">{this.state.DesignationError}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="map">
                                                <label className="form-label" htmlFor="headline">Map</label>
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30703867.071679905!2d64.40183608457193!3d20.04915895569306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1624108464524!5m2!1sen!2sin" width="100%" height="450" allowFullScreen="" loading="lazy"></iframe>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6" id="roleid">
                                            <div className="form-group main_content">
                                                <label className="form-label" htmlFor="role_id">Select Role</label>
                                                <select className="selectoption custom-select form-control" name="role_id" onChange={(event) => this.handleUserInput(event)}>
                                                    <option value="">Please Select Role</option>
                                                    {this.state.roleitems.map(ritem => (
                                                        <option value={ritem.id} key={ritem.id} selected={ritem.id == this.state.role_id}>{ritem.role}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 hide" id="adminroleid" >
                                            <div className="form-group main_content">
                                                <label className="form-label" htmlFor="role_id">Select Role</label>
                                                <select className="selectoption custom-select form-control" name="role_id" onChange={(event) => this.handleUserInput(event)}>
                                                    <option value="">Please Select Role</option>
                                                    {this.state.administrativerolesitems.map(aitem => (
                                                        <option value={aitem.id} key={aitem.id} selected={aitem.id == this.state.role_id}>{aitem.role}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="year_graduation">Year of Graduation / Residency Completion</label>
                                                <select className="selectoption custom-select form-control" name="year_graduation" onChange={(event) => this.handleUserInput(event)}>
                                                    <option value="">Please Select Year of Graduation</option>
                                                    {this.state.yearList
                                                        ? this.state.yearList.map((item, index) => (
                                                            <option value={item} key={index} selected={item == this.state.year_graduation} className="li-item">
                                                                {item}
                                                            </option>
                                                        ))
                                                        : ''}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="form-group main_content">
                                                <label className="form-label" htmlFor="university_id">University/College</label>
                                                <select className="selectoption custom-select form-control" name="university_id" onChange={(event) => this.handleUserInput(event)}>
                                                    <option value="">Please Select University/College</option>
                                                    {this.state.unicollegeitems.map(uitem => (
                                                        <option value={uitem.id} key={uitem.id} selected={uitem.id == this.state.university_id}>{uitem.name}</option>
                                                    ))}
                                                </select>

                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6" id="yearpostid">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="year_post_graduation">Year of Post Graduation</label>
                                                <input className="form-control" id="year_post_graduation" name="year_post_graduation" type="text" value={this.state.year_post_graduation} onChange={(event) => this.handleUserInput(event)} placeholder="Year of Post Graduation" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6" id="administrativeid">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="administrative_experience">Years of administrative work experience</label>
                                                <input className="form-control" id="administrative_experience" name="administrative_experience" type="text" value={this.state.administrative_experience} onChange={(event) => this.handleUserInput(event)} placeholder="Years of administrative work experience" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6" id="totalexperienceid">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="total_experience">Years of any work experience</label>
                                                <input className="form-control" id="total_experience" name="total_experience" type="text" value={this.state.total_experience} onChange={(event) => this.handleUserInput(event)} placeholder="Years of any work experience" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="clinical_experience">Clinical Experience</label>
                                                <select className="selectoption custom-select form-control" name="clinical_experience" onChange={(event) => this.handleUserInput(event)}>
                                                    <option value="">Please Select Clinical Experience</option>
                                                    {this.state.clinicalexperiencesitems.map(ceitem => (
                                                        <option value={ceitem.id} key={ceitem.id} selected={ceitem.id == this.state.clinical_experience}>{ceitem.title}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="contract_type_id">Contract Types</label>
                                                <Multiselect
                                                    name="contract_type_id"
                                                    options={this.state.contractitems} // Options to display in the dropdown
                                                    selectedValues={this.state.selectedContractList} // Preselected value to persist in dropdown
                                                    displayValue="title" // Property name to display in the dropdown options
                                                    onSelect={this.onSelect} // Function will trigger on select event
                                                    onRemove={this.onRemove} // Function will trigger on remove event
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="travel_type_id">How far are you willing to travel to work?</label>
                                                <Multiselect
                                                    name="travel_type_id"
                                                    options={this.state.travellingitems} // Options to display in the dropdown
                                                    selectedValues={this.state.selectedTravelList} // Preselected value to persist in dropdown
                                                    displayValue="title" // Property name to display in the dropdown options
                                                    onSelect={this.onSelectTravel} // Function will trigger on select event
                                                    onRemove={this.onRemoveTravel} // Function will trigger on remove event
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="office_type_id">What type of office are you looking for?</label>
                                                <Multiselect
                                                    name="office_type_id"
                                                    options={this.state.officeitems} // Options to display in the dropdown
                                                    selectedValues={this.state.selectedOfficeList} // Preselected value to persist in dropdown
                                                    displayValue="title" // Property name to display in the dropdown options
                                                    onSelect={this.onSelectOffice} // Function will trigger on select event
                                                    onRemove={this.onRemoveOffice} // Function will trigger on remove event
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-12">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="skillset_type_id">Skillset/Proficiencies</label>
                                                <Multiselect
                                                    name="skillset_type_id"
                                                    options={this.state.skillsetitems} // Options to display in the dropdown
                                                    selectedValues={this.state.selectedSkillsetList} // Preselected value to persist in dropdown
                                                    displayValue="title" // Property name to display in the dropdown options
                                                    onSelect={this.onSelectSkills} // Function will trigger on select event
                                                    onRemove={this.onRemoveSkills} // Function will trigger on remove event
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-12">
                                            <div className="form-group hour_class">
                                                <label className="form-label" htmlFor="hours_time">Hours Available</label>
                                                
                                                <Multiselect
                                                    name="hourTimeArr"
                                                    options={this.state.timeItems} // Options to display in the dropdown
                                                    selectedValues={this.state.selectedHoursTime} // Preselected value to persist in dropdown
                                                    displayValue="title" // Property name to display in the dropdown options
                                                    onSelect={this.onSelectTime} // Function will trigger on select event
                                                    onRemove={this.onRemoveTime} // Function will trigger on remove event
                                                />
                                                
                                                <Multiselect
                                                    name="hourDayArr"
                                                    options={this.state.dayItems} // Options to display in the dropdown
                                                    selectedValues={this.state.selectedHoursDay} // Preselected value to persist in dropdown
                                                    displayValue="title" // Property name to display in the dropdown options
                                                    onSelect={this.onSelectDay} // Function will trigger on select event
                                                    onRemove={this.onRemoveDay} // Function will trigger on remove event
                                                />

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
        );
    }
}

export default LookingforPopup;