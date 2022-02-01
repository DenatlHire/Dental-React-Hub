import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
const userinfo = JSON.parse(localStorage.getItem('user'));
const isAuthenticated = localStorage.getItem('token');

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
        }
    }

    checkEmailExist() {
        let email = this.state.email;

        axios.get('/newsletter-leads/count?email=' + email)
            .then((response) => {
                if (response.data === 0) {
                    this.submitNewsletter();
                    this.resetFields();
                } else {
                    //if email is already exist in db
                    this.setState({
                        emailError: "You have already subcribed to our newsletter."
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    submitNewsletter() {
        axios.post('/newsletter-leads', {
            email: this.state.email
        })
            .then((response) => {
                alert("Thank you...");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleUserInput = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }

    valid() {
        if (!this.state.email) {
            this.setState({
                emailError: "Please enter email address."
            });
            return false;
        } else if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.setState({
                emailError: "Please enter valid email address."
            });

            return false;
        }
        return true;
    }

    submit = (e) => {
        e.preventDefault();
        if (this.valid()) {
            this.checkEmailExist();
        }

        return false;
    }

    resetFields() {
        this.setState({
            email: '',
            emailError: ''
        })
    }

    render() {
        return (
            <footer>

                {/* <section className="pt-6 pt-md-8 bg-gray-200">
                    <div className="container pb-6 pb-md-8">
                        <div className="row align-items-center">

                            <div className="col-12 col-md" data-aos="fade-left">
                                <h3 className="mb-1 fw-bold main_small_title">
                                    Get our stories delivered
                                </h3>
                                <p className="fs-lg main_big_desc mb-6 mb-md-0">
                                    From us to your inbox weekly.
                                </p>
                            </div>

                            <div className="col-12 col-md-5" data-aos="fade-right">
                                <form onSubmit={this.submit}>
                                    <div className="row">
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="email"
                                                className="form-control"
                                                placeholder="Enter your email"
                                                autoComplete="off"
                                                value={this.state.email}
                                                onChange={this.handleUserInput}
                                            />

                                            <p className="text-danger">{this.state.emailError}</p>
                                        </div>
                                        <div className="col-auto ms-n5">
                                            <button
                                                className="btn btn-primary shadow lift"
                                                type="submit"
                                            >
                                                Subscribe
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </section> */}

                {/* <div className="position-relative">
                    <div className="shape shape-bottom shape-fluid-x svg-shim blue_color">
                        <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z" fill="currentColor" /></svg>
                    </div>
                </div> */}

                <div className="py-md-10  pb-sm-3 pt-6">
                    <div className="container">
                        <div className="row">

                            <div className="col-sm-12 mb-md-0 mb-2 col-md-5 col-lg-7 text-left">
                                <img src="/assets/img/brands/f_logo_new.png" alt="..." className="footer-brand img-fluid " />
                                <div class="footer_social">
                                    <ul>
                    
                                    <li><a href="#" target="_blank"><i class="fa fa-instagram"></i></a></li>
                                    <li><a href="#" target="_blank"><i class="fa fa-facebook"></i></a></li>
                                    <li><a href="#" target="_blank"><i class="fa fa-twitter"></i></a></li>
                                    <li><a href="#" target="_blank"><i class="fa fa-linkedin"></i></a></li>
                                </ul>
                                </div>
                            </div>

                            <div className="col-sm-12 mb-md-0 mb-2 col-md-4 col-lg-3  f_links_main">
                               
                                <ul className="list-unstyled text-muted  mb-md-8 mb-lg-0">
                                    <li className="d-inline-block mx-2">
                                        <Link to="/" className="f_in_links">
                                            Home
                                        </Link>
                                    </li>
                                    {/* <li className="d-inline-block mx-2">
                                        <Link to="/about" className="f_in_links">
                                            About
                                        </Link>
                                    </li> */}
                                    {/* <li className="d-inline-block mx-2">
                                        <Link to="/blogs" className="f_in_links">
                                            Blogs
                                        </Link>
                                    </li> */}
                                    {isAuthenticated && (<li className="d-inline-block mx-2">
                                    <Link className="nav-link" to={ userinfo.type == '2' ? '/findProfile' : '/searchresult'} aria-haspopup="true" aria-expanded="false">
                                            Jobs
                                        </Link>
                                    </li>)}
                                    <li className="d-inline-block mx-2">
                                        <Link to="/contact" className="f_in_links">
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-sm-12 col-md-3 col-lg-2">
                               
                               <div className="foo_contact">
                                   <span className="d-block">Contact Us</span>
                                   <a href="mailto:info@dentalhire.com">info@dentalhire.com</a>
                               </div>
                             
                            </div>

                        </div>
                    </div>
                </div>
                {/* <div className="footer-defoult">
                    <div className="container">
                        <ul className="d-sm-flex text-center justify-content-center list-unstyled mb-0">
                            <li className="mx-2">© 2021 Dental Hire Inc. All Rights Reserved</li>
                            <li className="mx-2"><Link to="/privacy">Privacy</Link></li>
                            <li className="mx-2"><Link to="/terms">Terms of Use</Link></li>
                        </ul>
                    </div>
                </div> */}
            </footer>

        );
    }
}

export default Footer;