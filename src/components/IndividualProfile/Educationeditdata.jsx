import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
const isAuthenticated = localStorage.getItem('token');
const userinfo = JSON.parse(localStorage.getItem('user'));
class Educationeditdata extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            unicollegeitems: [],
            uniprogramsitems: [],
            unicollegename: [],
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
            titleError: '',

        };
    }


    updateEducationInformation(id) {
        if (this.state.checked == false) {
            var is_present = '1';
            var endmonth = this.state.end_month;
            var endyear = this.state.end_year;
        } else {
            var is_present = '0';
            var endmonth = '';
            var endyear = '';
        }
        axios.put('university-programs/' + id, {
            user_id: this.state.user_id,
            title: this.state.title,
            university_college_id: this.state.university_college_id,
            start_month: this.state.start_month,
            start_year: this.state.start_year,
            end_month: endmonth,
            end_year: endyear,
            is_present: is_present
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
    render() {
        console.log(this.props);
        return (
            <div className="modal edit-modal fade" id={'educationinfo' + this.props.item.id} tabIndex="-1" role="dialog" aria-labelledby="educationinfoLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
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
                                                <select className="selectpicker form-control" name="university_college_id" onChange={(event) => this.handleUserInput(event)}>
                                                    <option value="">Please Select University/College</option>
                                                    {this.props.unicollegeitems && this.props.unicollegeitems.map(uitem => (
                                                        <option value={uitem.id} selected={uitem.id == this.props.item.university_college_id.id} key={uitem.id}>{uitem.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="start_month">Start Month</label>
                                                <select className="selectpicker form-control" name="start_month" onChange={(event) => this.handleUserInput(event)}>
                                                    <option value="">Please Select Start Month</option>
                                                    {this.state.monthList
                                                        ? this.state.monthList.map((mitem, index) => (
                                                            <option value={mitem} key={index} selected={mitem == this.props.item.start_month} className="li-item">
                                                                {mitem}
                                                            </option>
                                                        ))
                                                        : ''}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="start_year">Start Year</label>
                                                <select className="selectpicker form-control" name="start_year" onChange={(event) => this.handleUserInput(event)}>
                                                    <option value="">Please Select Start Year</option>
                                                    {this.state.yearList
                                                        ? this.state.yearList.map((yitem, index) => (
                                                            <option value={yitem} key={index} selected={yitem == this.props.item.start_year} className="li-item">
                                                                {yitem}
                                                            </option>
                                                        ))
                                                        : ''}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="is_present">Present</label>
                                                <input id="is_present" name="is_present" onChange={(e) => this.handleChange(this.props.item.id, e)} checked={this.state.checked ? "checked" : ""} type="checkbox" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row" id={'endid_' + this.props.item.id}>
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="end_month">End Month</label>
                                                <select className="selectpicker form-control" name="end_month" onChange={(event) => this.handleUserInput(event)}>
                                                    <option value="">Please Select End Month</option>
                                                    {this.state.monthList
                                                        ? this.state.monthList.map((eitem, index) => (
                                                            <option value={eitem} key={index} selected={eitem == this.props.item.end_month} className="li-item">
                                                                {eitem}
                                                            </option>
                                                        ))
                                                        : ''}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="end_year">End Year</label>
                                                <select className="selectpicker form-control" name="end_year" onChange={(event) => this.handleUserInput(event)}>
                                                    <option value="">Please Select End Year</option>
                                                    {this.state.yearList
                                                        ? this.state.yearList.map((eyitem, index) => (
                                                            <option value={eyitem} key={index} selected={eyitem == this.props.item.end_year} className="li-item">
                                                                {eyitem}
                                                            </option>
                                                        ))
                                                        : ''}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md">
                                            <button className="btn btn-primary mb-6 mt-6 mb-md-0 lift" type="submit" onClick={() => this.submit(this.props.item.id)}>
                                                Save
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
export default Educationeditdata;