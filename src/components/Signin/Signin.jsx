import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userinfoid: '',
            hasError: false
        };
    }
    componentDidMount() {
        axios.get("user-informations")
            .then(response => {
                this.setState({
                    userinfoid: response.data.user_id
                });
                //  $('select').selectpicker();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    submitUserLogin() {
        var user_id = null;
        axios.post('auth/local', {
            identifier: this.state.email,
            password: this.state.password
        })
            .then(response => {

                // Handle success.
                // console.log('User profile', response.data.user);
                // console.log('User token', response.data.jwt);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("token", response.data.jwt);
                user_id = response.data.user.id;
                axios.get("user-informations", {
                    params: {
                        user_id: user_id
                    }
                })
                    .then(response => {
                        if (response.data.length === 0) {
                            this.submitUserInformation(user_id);
                        } else {
                            window.location.href = '/profileoverlay';
                        }
                    })


            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
                this.setState({
                    hasError: 'Username and Password is invalid.',
                    forclass: "text-danger text-center error-msg"
                });
            });
    }


    submitUserInformation(id) {
        axios.post('user-informations', {
            user_id: id
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
            [name]: value,
        });
    }
    valid() {
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
        if (!this.state.password) {
            this.setState({
                passwordError: "Please enter password."
            });
            return false;
        }
        return true;
    }
    submit() {
        if (this.valid()) {
            this.submitUserLogin();
            this.resetFields();
        }
        return false;
    }
    resetFields() {
        this.setState({
            email: '',
            password: '',
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
                                    <div className="col-12 col-md-6 d-none d-md-block bg-cover card-img-start" style={{ backgroundImage: 'url(./assets/img/photos/photo-8.jpg)' }}>
                                        <img src="/assets/img/photos/photo-8.jpg" alt="..." className="img-fluid d-md-none invisible" />
                                        <div className="shape shape-end shape-fluid-y svg-shim text-white d-none d-md-block">
                                            <svg viewBox="0 0 112 690" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M116 0H51v172C76 384 0 517 0 517v173h116V0z" fill="currentColor" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="card-body">

                                            <h2 className="mb-0 fw-bold text-center main_title" id="">
                                                Login
                                            </h2>
                                            <p className="mb-6 mt-2 text-center text-muted">
                                                Simplify your workflow in minutes.
                                            </p>
                                            {this.state.hasError && (
                                                <p className={this.state.forclass}>{this.state.hasError}</p>
                                            )}
                                            <form className="mb-4" onSubmit={(event) => this.preventSubmit(event)}>
                                                <div className="form-group mb-5">

                                                    <input type="email" className="form-control" name="email" id="email"
                                                        value={this.state.email}
                                                        onChange={(event) => this.handleUserInput(event)}
                                                        placeholder="Your Email" />
                                                    <p className="text-danger">{this.state.emailError}</p>
                                                </div>
                                                <div className="form-group mb-5">

                                                    <input type="password" className="form-control" name="password" id="password"
                                                        value={this.state.password}
                                                        onChange={(event) => this.handleUserInput(event)}
                                                        placeholder="Your Password" />
                                                    <p className="text-danger">{this.state.passwordError}</p>
                                                </div>
                                                <button className="btn w-100 btn-primary" type="submit" onClick={() => this.submit()}>
                                                    Login
                                                </button>
                                            </form>
                                            <p className="mb-3  fs-sm text-center text-muted">
                                                <Link to="/forgotpassword">Forgot Password?</Link>
                                            </p>
                                            <p className="mb-0 fs-sm text-center text-muted">
                                                Don't have an account yet? <Link to="/signup">Sign Up</Link>
                                            </p>
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
export default Signin;