import React, { Component } from 'react';

class AboutinfoPoup extends Component {
    render() {
        return (
            <div className="modal edit-modal fade" id="editinformation" tabindex="-1" role="dialog" aria-labelledby="editinformationLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editinformationLabel">Edit intro</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="card-body p-0">
                                <form>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" for="fname">First Name</label>
                                                <input className="form-control" id="fname" type="text" placeholder="First Name" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label" for="lname">Last Name </label>
                                                <input className="form-control" id="lname" type="text" placeholder="Last Name " />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="form-group mb-5">
                                                <label className="form-label">Cover letter</label>
                                                <input className="form-control" id="applyCover" type="file" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="form-group mb-5">
                                                <div className="form-group mb-5">
                                                    <label className="form-label">Resume</label>
                                                    <input className="form-control" id="applyResume" type="file" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group mb-5">
                                                <label className="form-label" for="headline">Headline</label>
                                                <textarea className="form-control" id="headline" rows="3" placeholder=""></textarea>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group mb-5">
                                                <select className="selectpicker form-control" multiple>
                                                    <option value="weekly">Daily</option>
                                                    <option value="weekly">Weekly</option>
                                                    <option value="weekly">Monthly</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <ul className="list-inline">
                                                <li className="mb-3">
                                                    <input id="c1" type="checkbox" />
                                                    <label for="c1">Checkbox</label>
                                                </li>

                                                <li className="mb-3">
                                                    <input id="r1" type="radio" name="radio" value="1" />
                                                    <label for="r1">Radio</label>
                                                </li>
                                                <li className="mb-3">
                                                    <input id="r2" type="radio" name="radio" value="2" checked />
                                                    <label for="r2">Radio</label>
                                                </li>
                                                <li className="mb-3">
                                                    <input id="s1" type="checkbox" className="switch" />
                                                    <label for="s1">Switch</label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="map">
                                                <label className="form-label" for="headline">Map</label>
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30703867.071679905!2d64.40183608457193!3d20.04915895569306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1624108464524!5m2!1sen!2sin" width="100%" height="450" allowfullscreen="" loading="lazy"></iframe>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md">
                                            <button className="btn btn-primary mb-6 mt-6 mb-md-0 lift">
                                                Apply now <i className="fe fe-arrow-right ms-3"></i>
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

export default AboutinfoPoup;