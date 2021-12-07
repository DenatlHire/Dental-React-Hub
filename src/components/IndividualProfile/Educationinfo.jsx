import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
const isAuthenticated = localStorage.getItem("token");
const userinfo = JSON.parse(localStorage.getItem("user"));
class Educationinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      unicollegeitems: [],
      uniprogramsitems: [],
      unicollegename: [],
      checked: false,
      title: "",
      university_college_id: "",
      start_month: "",
      start_year: "",
      end_month: "",
      end_year: "",
      is_present: "",
      user_id: userinfo.id,
      yearList: null,
      monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      titleError: "",
      universityError: "",
      startmonthError: "",
      startyearError: "",
      endmonthError: "",
      endyearError: ""
    };
  }

  handleChange(id, e) {
    console.log(this.state.checked);
    if (e.target.checked) {
      $("#endid_" + id).hide();
      this.setState({ checked: true });
    } else {
      $("#endid_" + id).show();
      this.setState({ checked: false });
    }
  }

  componentDidMount() {
    this.getUniversityColleges();
    this.getUniversityPrograms(userinfo.id);
    this.dataInit();
  }

  getUniversityColleges(id) {
    axios
      .get("university-colleges")
      .then(response => {
        this.setState({
          isLoaded: true,
          unicollegeitems: response.data
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  getUniversityPrograms(id) {
    axios
      .get("university-programs", {
        params: {
          user_id: id
        }
      })
      .then(response => {
        this.setState({
          isLoaded: true,
          uniprogramsitems: response.data
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  updateEducationInformation(id) {
    if (this.state.checked == false) {
      var is_present = "1";
      var endmonth = this.state.end_month;
      var endyear = this.state.end_year;
    } else {
      var is_present = "0";
      var endmonth = "";
      var endyear = "";
    }
    axios
      .put("university-programs/" + id, {
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
        window.location.href = "/myprofile";
      })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  }

  getEduPopup(id) {
    axios
      .get("university-programs/" + id)
      .then(response => {
        this.setState({
          isLoaded: true,
          title: response.data.course_id ? response.data.course_id.title : "",
          university_college_id: response.data.university_college_id.id,
          start_month: response.data.start_month,
          start_year: response.data.start_year,
          end_month: response.data.end_month,
          end_year: response.data.end_year,
          is_present: response.data.is_present,
          checked: response.data.is_present == "0" ? true : false
        });
        if (response.data.is_present == 0) {
          $("#endid_" + id).hide();
        } else {
          $("#endid_" + id).show();
        }

        // $('select').selectpicker();
      })
      .catch(function(error) {
        // handle error
        console.log(error);
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

  submit(id) {
    if (this.valid()) {
      this.updateEducationInformation(id);
    }
    return false;
  }

  preventSubmit = function(e) {
    e.preventDefault();
  };

  preventDefault = function(e) {
    e.preventDefault();
  };

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
        dayList
      });
    });
  }
  render() {
    const subTaskEducation = this.state.uniprogramsitems.map(item => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const d = new Date(item.start_month);
      const monthName = months[d.getMonth()];

      const ed = new Date(item.end_month);
      const endmonthName = months[ed.getMonth()];

      return (
        <div className="list-group list-group-flush" key={item.id}>
          <a
            href
            className="edit-icon icon-plus shadow"
            data-toggle="modal"
            onClick={e => this.getEduPopup(item.id, e)}
            data-target={"#educationinfo" + item.id}
          >
            <i className="fe fe-edit-2"></i>
          </a>
          <a
            className="list-group-item text-reset text-decoration-none"
            href
            onClick={this.preventDefault}
          >
            {item.course_id &&
              item.course_id.length > 0 &&
              item.course_id.title && (
                <h2 className="fw-bold mb-1 job_desgnation">
                  <a
                    href
                    data-toggle="modal"
                    onClick={e => this.getEduPopup(item.id, e)}
                    data-target={"#educationinfo" + item.id}
                  >
                    {item.course_id.title}
                  </a>
                </h2>
              )}
            {item.university_college_id && (
              <span className="comp_name">
                {item.university_college_id.name}
              </span>
            )}
            {item.is_present == "0" ? (
              <p className="fs-sm text-muted mb-0">
                {monthName} {item.start_year} - Present
              </p>
            ) : (
              <p className="fs-sm text-muted mb-0">
                {monthName} {item.start_year} - {endmonthName} {item.end_year}
              </p>
            )}
          </a>

          <div
            className="modal edit-modal fade"
            id={"educationinfo" + item.id}
            data-backdrop="static"
            data-keyboard="false"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="educationinfoLabel"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-scrollable"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editpersonalinformationLabel">
                    Education Information
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="card-body p-0">
                    <form onSubmit={event => this.preventSubmit(event)}>
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="company">
                              Course Name
                            </label>
                            <input
                              className="form-control"
                              id="title"
                              name="title"
                              onChange={event => this.handleUserInput(event)}
                              value={this.state.title}
                              type="text"
                              placeholder="Course Name"
                            />
                            <p className="text-danger">
                              {this.state.titleError}
                            </p>
                          </div>
                        </div>
                        {/* <div className="col-12 col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label" htmlFor="university_college_id">University/College</label>
                                                        <select className="selectoption custom-select form-control" name="university_college_id" onChange={(event) => this.handleUserInput(event)}>
                                                        {console.log("abx", this.state.unicollegeitems)
                                                        }
                                                            <option value="">Please Select University/College</option>
                                                            {this.state.unicollegeitems && this.state.unicollegeitems.length > 0 && this.state.unicollegeitems.map((uitem) => (
                                                                <option value={uitem.id} selected={uitem.id == uitem.university_college_id.id} key={uitem.id}>{uitem.name}</option>
                                                            ))}
                                                        </select>
                                                        <p className="text-danger">{this.state.universityError}</p>
                                                    </div>
                                                </div> */}
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="start_month">
                              Start Month
                            </label>
                            <select
                              className="selectoption custom-select form-control"
                              name="start_month"
                              onChange={event => this.handleUserInput(event)}
                            >
                              <option value="">
                                Please Select Start Month
                              </option>
                              {this.state.monthList
                                ? this.state.monthList.map((mitem, index) => (
                                    <option
                                      value={mitem}
                                      key={index}
                                      selected={mitem == item.start_month}
                                      className="li-item"
                                    >
                                      {mitem}
                                    </option>
                                  ))
                                : ""}
                            </select>
                            <p className="text-danger">
                              {this.state.startmonthError}
                            </p>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="start_year">
                              Start Year
                            </label>
                            <select
                              className="selectoption custom-select form-control"
                              name="start_year"
                              onChange={event => this.handleUserInput(event)}
                            >
                              <option value="">Please Select Start Year</option>
                              {this.state.yearList
                                ? this.state.yearList.map((yitem, index) => (
                                    <option
                                      value={yitem}
                                      key={index}
                                      selected={yitem == item.start_year}
                                      className="li-item"
                                    >
                                      {yitem}
                                    </option>
                                  ))
                                : ""}
                            </select>
                            <p className="text-danger">
                              {this.state.startyearError}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <input
                              id="is_present"
                              name="is_present"
                              onChange={e => this.handleChange(item.id, e)}
                              checked={this.state.checked ? "checked" : ""}
                              type="checkbox"
                            />
                            <label
                              className="form-label d-inline-block"
                              htmlFor="is_present"
                            >
                              Present
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row" id={"endid_" + item.id}>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="end_month">
                              End Month
                            </label>
                            <select
                              className="selectoption custom-select form-control"
                              name="end_month"
                              onChange={event => this.handleUserInput(event)}
                            >
                              <option value="">Please Select End Month</option>
                              {this.state.monthList
                                ? this.state.monthList.map((eitem, index) => (
                                    <option
                                      value={eitem}
                                      key={index}
                                      selected={eitem == item.end_month}
                                      className="li-item"
                                    >
                                      {eitem}
                                    </option>
                                  ))
                                : ""}
                            </select>
                            <p className="text-danger">
                              {this.state.endmonthError}
                            </p>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="end_year">
                              End Year
                            </label>
                            <select
                              className="selectoption custom-select form-control"
                              name="end_year"
                              onChange={event => this.handleUserInput(event)}
                            >
                              <option value="">Please Select End Year</option>
                              {this.state.yearList
                                ? this.state.yearList.map((eyitem, index) => (
                                    <option
                                      value={eyitem}
                                      key={index}
                                      selected={eyitem == item.end_year}
                                      className="li-item"
                                    >
                                      {eyitem}
                                    </option>
                                  ))
                                : ""}
                            </select>
                            <p className="text-danger">
                              {this.state.endyearError}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 justify-content-end d-flex">
                          <button
                            className="btn btn-primary mb-6 mt-6 mb-md-0 lift"
                            type="submit"
                            onClick={() => this.submit(item.id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-danger ml-2 mb-6 mt-6 mb-md-0 lift"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
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
    });
    return (
      <div className="shadow card-border resume-box edu_info border-primary p-5 mt-8 mb-5 bg-white">
        <div className="d-flex justify-content-between">
          <h3 className="font-weight-bold">Education</h3>
        </div>

        <a
          href
          className="edit-icon shadow"
          data-toggle="modal"
          data-target="#educationinfo"
        >
          <i className="fe fe-plus"></i>
        </a>
        {this.state.uniprogramsitems.length > 0 ? (
          <div>{subTaskEducation}</div>
        ) : (
          <div className="fw-bold mb-1 job_desgnation text-center">
            No Educations Found.
          </div>
        )}
      </div>
    );
  }
}
export default Educationinfo;
