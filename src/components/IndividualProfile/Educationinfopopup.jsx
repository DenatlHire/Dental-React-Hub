import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
//import ReactAutocomplete, Autocomplete from 'react-autocomplete';
import Autocomplete from 'react-autocomplete';

const isAuthenticated = localStorage.getItem('token');
const userinfo = JSON.parse(localStorage.getItem('user'));

class Educationinfopopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            unicollegeitems: [],
            checked: false,
            title: '',
            university_college_id: '',
            start_month: '',
            start_year: '',
            end_month: '',
            end_year: '',
            is_present: '',
            user_id: userinfo.id,
            yearList: null,
            monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            //            monthList: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'],
            titleError: '',
            universityError: '',
            startmonthError: '',
            startyearError: '',
            endmonthError: '',
            endyearError: '',
            setuser: '',
            uniProgram: [],
            setUniProgram: '',
            getCourse: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if (this.state.checked == false) {
            $('#endid').hide();
        } else {
            $('#endid').show();
        }
        this.setState({
            checked: !this.state.checked
        })
    }


    componentDidMount() {
        this.getUniversityProgram();
        this.getUniversityColleges();
        this.dataInit();
    }

    getUniversityProgram() {
        axios.get("courses")
            .then(response => {

                var p = [];
                response.data.forEach((obj) => {
                    p.push({
                        id: obj.id.toString(),
                        label: obj.title
                    })
                })
                this.setState({
                    isLoaded: true,
                    uniProgram: p
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    };

    getUniversityColleges() {
        axios.get("university-colleges")
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

    submitEducationInformation() {
        
        if (this.state.setUniProgram) {
            this.updateUniPro();        
        } else {
            //add new program/course First
            axios.post('courses', {
                title: this.state.value
            })
            .then(response => {
                // Handle success.
                //console.log(response.data.id)
                this.setState({
                    setUniProgram: response.data.id
                }, this.updateUniPro() 
                );
            })
            .catch(error => {
                // Handle error.
                alert("Please select college from the list.");
                //console.log('An error occurred:', error.response);
            });
        }
        
    }

    updateUniPro() {
        if (this.state.checked == false) {
            var is_present = '1';
            var endmonth = this.state.end_month;
            var endyear = this.state.end_year;
        } else {
            var is_present = '0';
            var endmonth = '';
            var endyear = '';
        }

        axios.post('university-programs', {
            user_id: this.state.user_id,
            //title: this.state.title,
            university_college_id: this.state.university_college_id,
            start_month: this.state.start_month,
            start_year: this.state.start_year,
            end_month: endmonth,
            end_year: endyear,
            is_present: is_present,
            course_id: this.state.setUniProgram
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
            [name]: value
        });
    }

    valid() {
        if (!this.state.title) {
            this.setState({
                titleError: "Please enter course name."
            });
            return false;
        }
        if (!this.state.university_college_id) {
            this.setState({
                universityError: "Please select university/college."
            });
            return false;
        }
        if (!this.state.start_month) {
            this.setState({
                startmonthError: "Please select start month."
            });
            return false;
        }
        if (!this.state.start_year) {
            this.setState({
                startyearError: "Please select start year."
            });
            return false;
        }
        if (!this.state.end_month && this.state.checked == false) {
            this.setState({
                endmonthError: "Please select end month."
            });
            return false;
        }
        if (!this.state.end_year && this.state.checked == false) {
            this.setState({
                endyearError: "Please select end year."
            });
            return false;
        }
        return true;
    }

    submit() {
        if (this.valid()) {
            this.submitEducationInformation();
        }
        return false;
    }


    preventSubmit = function (e) {
        e.preventDefault();
    }

    // this.state.uniProgram

    setAutoComVal = (val) => {
        this.setState({
            setUniProgram: val,
            value: this.state.uniProgram.find(x => x.id == Number(val)).label
        });
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
    render() {
        return (
            <div className="modal edit-modal fade" id="educationinfo" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="educationinfoLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editpersonalinformationLabel">Education Information</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="card-body p-0">
                                <form onSubmit={(event) => this.preventSubmit(event)}>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="company">Course Name</label>
                                                <input className="form-control" id="title" name="title" onChange={(event) => this.handleUserInput(event)} value={this.state.title} type="text" placeholder="Course Name" />
                                                <p className="text-danger">{this.state.titleError}</p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="university_college_id">University/College</label>
                                                <select className="selectoption custom-select form-control" name="university_college_id" onChange={(event) => this.handleUserInput(event)}>
                                                    <option value="">Please Select University/College</option>
                                                    {this.state.unicollegeitems.map(uitem => (
                                                        <option value={uitem.id} selected={uitem.id == this.state.university_college_id} key={uitem.id}>{uitem.name}</option>
                                                    ))}
                                                </select>
                                                <p className="text-danger">{this.state.universityError}</p>

                                                <Autocomplete
                                                    getItemValue={(item) => item.id}
                                                    items={this.state.uniProgram}
                                                    shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                                    renderItem={(item, isHighlighted) =>
                                                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.id} >
                                                            {item.label}
                                                        </div>
                                                    }
                                                    value={this.state.value}
                                                    onChange={e => this.setState({ value: e.target.value })}
                                                    onSelect={value => this.setAutoComVal(value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="start_month">Start Month</label>
                                                <select className="selectoption custom-select form-control" name="start_month" onChange={(event) => this.handleUserInput(event)}>
                                                    <option value="">Please Select Start Month</option>
                                                    {this.state.monthList
                                                        ? this.state.monthList.map((item, index) => (
                                                            <option value={item} key={index} className="li-item">
                                                                {item}
                                                            </option>
                                                        ))
                                                        : ''}
                                                </select>
                                                <p className="text-danger">{this.state.startmonthError}</p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="start_year">Start Year</label>
                                                <select className="selectoption custom-select form-control" name="start_year" onChange={(event) => this.handleUserInput(event)}>
                                                    <option value="">Please Select Start Year</option>
                                                    {this.state.yearList
                                                        ? this.state.yearList.map((item, index) => (
                                                            <option value={item} key={index} selected={item == this.state.start_year} className="li-item">
                                                                {item}
                                                            </option>
                                                        ))
                                                        : ''}
                                                </select>
                                                <p className="text-danger">{this.state.startyearError}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">

                                                <input id="is_present" name="is_present" onChange={this.handleChange} checked={this.state.checked} value={this.state.checked} type="checkbox" />
                                                <label className="form-label d-inline-block" htmlFor="is_present">Present</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" id="endid">
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="end_month">End Month</label>
                                                <select className="selectoption custom-select form-control" name="end_month" onChange={(event) => this.handleUserInput(event)}>
                                                    <option value="">Please Select End Month</option>
                                                    {this.state.monthList
                                                        ? this.state.monthList.map((item, index) => (
                                                            <option value={item} key={index} className="li-item">
                                                                {item}
                                                            </option>
                                                        ))
                                                        : ''}
                                                </select>
                                                <p className="text-danger">{this.state.endmonthError}</p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="end_year">End Year</label>
                                                <select className="selectoption custom-select form-control" name="end_year" onChange={(event) => this.handleUserInput(event)}>
                                                    <option value="">Please Select End Year</option>
                                                    {this.state.yearList
                                                        ? this.state.yearList.map((item, index) => (
                                                            <option value={item} key={index} selected={item == this.state.end_year} className="li-item">
                                                                {item}
                                                            </option>
                                                        ))
                                                        : ''}
                                                </select>
                                                <p className="text-danger">{this.state.endyearError}</p>
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

export default Educationinfopopup;