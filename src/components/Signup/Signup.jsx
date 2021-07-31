import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Base64 } from 'js-base64';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: '1',
            clinicname: '',
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            password: '',
            confirmpassword: '',
            clinicnameError: '',
            firstnameError: '',
            lastnameError: '',
            emailError: '',
            phoneError: '',
            passwordError: '',
            roleError: '',
            confirmpasswordError: '',
            notmatchpasswordError: '',
            Individual: false,
            Clinic: false,
            hasError: false
        }
    }

    submitUserRegistration() {
        axios.post('auth/local/register', {
            type: this.state.role,
            clinicname: this.state.clinicname,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.firstname,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            blocked: 0,
            confirmed: 1
        })
            .then(response => {
                // Handle success.
                console.log('Well done!');
                console.log('User profile', response.data.user);
                console.log('User token', response.data.jwt);
                this.setState({
                    hasError: "A confirmation link has been sent to your email account. \
                        Please click on the link to complete the registration process.",
                    forclass: "text-danger text-center success-msg"
                });
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
                this.setState({
                    hasError: "Registration process is incompelete.",
                    forclass: "text-danger text-center error-msg"
                });
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
        if (!this.state.clinicname && this.state.role == 2) {
            this.setState({
                clinicnameError: "Please enter clinic name."
            });
            return false;
        }
        if (!this.state.firstname && this.state.role == 1) {
            this.setState({
                firstnameError: "Please enter first name."
            });
            return false;
        }
        if (!this.state.lastname && this.state.role == 1) {
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
        if (!this.state.password) {
            this.setState({
                passwordError: "Please enter password."
            });
            return false;
        }

        if (!this.state.confirmpassword) {
            this.setState({
                confirmpasswordError: "Please enter confirm password."
            });
            return false;
        }

        if (this.state.password != this.state.confirmpassword) {
            this.setState({
                notmatchpasswordError: "Passwords don't match."
            });
            return false;
        }
        return true;
    }

    submit() {
        if (this.valid()) {
            this.submitUserRegistration();
            this.resetFields();
        }
        return false;
    }

    resetFields() {
        this.setState({
            role: '1',
            clinicname: '',
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            password: '',
            confirmpassword: '',
            clinicnameError: '',
            firstnameError: '',
            lastnameError: '',
            emailError: '',
            phoneError: '',
            passwordError: '',
            roleError: '',
            confirmpasswordError: '',
            notmatchpasswordError: '',
            hasError: false
        })
    }

    preventSubmit = function (e) {
        e.preventDefault();
    }

    render() {
        return (
            <section className="pt-4 py-md-10">
                <div className="container">
                    <div className="row align-items-center shadow">
                        <div className="col-md-12 common-form">
                            <div className="card card-row ">
                                <div className="row gx-0">
                                    <div className="col-12 col-md-5 d-none d-md-block bg-cover card-img-start" style={{ backgroundImage: 'url(./assets/img/photos/photo-8.jpg)' }}>
                                        <img src="/assets/img/photos/photo-8.jpg" alt="..." className="img-fluid d-md-none invisible" />
                                        <div className="shape shape-end shape-fluid-y svg-shim text-white d-none d-md-block">
                                            <svg viewBox="0 0 112 690" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M116 0H51v172C76 384 0 517 0 517v173h116V0z" fill="currentColor" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-7">
                                        <div className="card-body">

                                            <h2 className="mb-4 fw-bold text-center  main_title" id="modalSignupHorizontalTitle">
                                                Sign Up
                                            </h2>
                                            {this.state.hasError && (
                                                <p className={this.state.forclass}>{this.state.hasError}</p>
                                            )}
                                            <form className="mb-4" onSubmit={(event) => this.preventSubmit(event)}>
                                                <div className="mt-4 mb-6 text-center text-muted rad-group">
                                                    <div className="form-check mb-2 d-inline-block cus-radio-btn custom-control custom-radio custom-control-inline">
                                                        <input className="form-check-input custom-control-input" type="radio" name="role" onChange={(event) => this.handleUserInput(event)} id="Individual" value="1" checked={this.state.role == 1} />
                                                        <label className="form-check-label custom-control-label" htmlFor="Individual">
                                                            Individual
                                                        </label>
                                                    </div>
                                                    <div className="form-check mb-2 d-inline-block ml-4 cus-radio-btn custom-control custom-radio custom-control-inline">
                                                        <input className="form-check-input custom-control-input" type="radio" name="role" onChange={(event) => this.handleUserInput(event)} id="Clinic" value="2" checked={this.state.role == 2} />
                                                        <label className="form-check-label custom-control-label" htmlFor="Clinic">
                                                            Clinic
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="row signup-form">
                                                    {this.state.role == 2 && (
                                                        <div className="col-md-12 s-col">
                                                            <div className="form-group mb-5">
                                                                <input type="text" className="form-control" id="" id="clinicname" name="clinicname"
                                                                    value={this.state.clinicname}
                                                                    onChange={(event) => this.handleUserInput(event)}
                                                                    placeholder="Your Clinic Name " />
                                                                <p className="text-danger">{this.state.clinicnameError}</p>
                                                            </div>

                                                        </div>
                                                    )}
                                                    {this.state.role == 1 && (
                                                        <div className="col-md-6 s-col">
                                                            <div className="form-group mb-5">
                                                                <input type="text" className="form-control" id="firstname" name="firstname"
                                                                    value={this.state.firstname}
                                                                    onChange={(event) => this.handleUserInput(event)}
                                                                    placeholder="Your First Name" />
                                                                <p className="text-danger">{this.state.firstnameError}</p>
                                                            </div>

                                                        </div>
                                                    )}
                                                    {this.state.role == 1 && (
                                                        <div className="col-md-6 s-col">
                                                            <div className="form-group mb-5">
                                                                <input type="text" className="form-control" id="lastname" name="lastname"
                                                                    value={this.state.lastname}
                                                                    onChange={(event) => this.handleUserInput(event)}
                                                                    placeholder="Your Last Name" />
                                                                <p className="text-danger">{this.state.lastnameError}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="col-md-6 s-col">
                                                        <div className="form-group mb-5">
                                                            <input type="text" className="form-control" name="email" id="email"
                                                                value={this.state.email}
                                                                onChange={(event) => this.handleUserInput(event)}
                                                                placeholder="Your Email" />
                                                            <p className="text-danger">{this.state.emailError}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 s-col">
                                                        <div className="form-group mb-5">
                                                            <input type="tel" className="form-control" id="phone" name="phone"
                                                                value={this.state.phone}
                                                                onChange={(event) => this.handleUserInput(event)}
                                                                placeholder="Your Phone No" />
                                                            <p className="text-danger">{this.state.phoneError}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 s-col">
                                                        <div className="form-group mb-5">
                                                            <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={(event) => this.handleUserInput(event)} placeholder="Your Password" />
                                                            <p className="text-danger">{this.state.passwordError}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 s-col">
                                                        <div className="form-group mb-5">
                                                            <input type="password" className="form-control" id="confirmpassword" name="confirmpassword" value={this.state.confirmpassword} onChange={(event) => this.handleUserInput(event)} placeholder="Your Confirm Password" />
                                                            <p className="text-danger">{this.state.confirmpasswordError}</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-danger">{this.state.notmatchpasswordError}</p>
                                                </div>
                                                <button className="btn w-100 btn-primary" type="submit" onClick={() => this.submit()}>
                                                    Sign Up
                                                </button>
                                            </form>

                                            <div className="mb-0 fs-sm text-center text-muted">
                                                Already have an account? <Link to="/signin">Login</Link>
                                            </div>
                                            <div className="mt-5 sign-social mb-0 fs-sm text-center text-muted">
                                                Or Login With
                                                <ul className="list-inline d-inline-block ml-3 mb-0">
                                                    <li className="d-inline-block mr-2">
                                                        <Link to="/" className="py-3 px-4 shadow facebook">
                                                            <img src="assets/img/social/fb_icon.png" alt="" />
                                                        </Link>
                                                    </li>
                                                    <li className="d-inline-block mr-2">
                                                        <Link to="/" className="py-3 px-4 shadow google">
                                                            <img src="assets/img/social/gmail_icon.png" alt="" />
                                                        </Link>
                                                    </li>
                                                    <li className="d-inline-block mr-2">
                                                        <Link to="/" className="py-3 px-4 shadow apple">
                                                            <img src="assets/img/social/apple_icon.png" alt="" />
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default Signup;