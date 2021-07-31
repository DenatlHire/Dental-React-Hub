import React, { Component } from 'react';
import { Link } from "react-router-dom";
class SidebarSection extends Component {
    render() {
        return (
            <div className="col-12 col-md-3 mt-5">
                <div className="card card-bleed border-bottom border-bottom-md-0 shadow-light-lg">
                    <div className="collapse d-md-block" id="sidenavCollapse">
                        <div className="card-body">
                            <h6 className="fw-bold text-uppercase mb-3">
                                Account
                            </h6>
                            <ul className="card-list list text-gray-700 m-0 p-0">
                                <li className="list-item">
                                    <Link className="list-link text-reset" to="/changepassword" aria-haspopup="true" aria-expanded="false">
                                        Change Password </Link>
                                </li>
                                <li className="list-item">
                                    <a className="list-link text-reset" href="#">
                                        Saved Jobs
                                    </a>
                                </li>
                                <li className="list-item">
                                    <a className="list-link text-reset" href="#">
                                        Applied Jobs
                                    </a>
                                </li>

                            </ul>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SidebarSection;