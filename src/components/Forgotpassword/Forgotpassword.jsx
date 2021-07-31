import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Forgotpassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            hasError: false
        };
    }
    submitForgotPassword() {
        axios.post('auth/forgot-password', {
            email: this.state.email,
            //            url: 'admin/plugins/users-permissions/auth/reset-password',
        })
            .then(response => {
                // Handle success.
                console.log('Your user received an email');
                this.setState({
                    hasError: "A reset password link has been sent to your email account.\
                    Please click on the link to complete the password reset.",
                    forclass: "text-danger text-center success-msg"
                });
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
                this.setState({
                    hasError: error.response.data.message[0].messages[0].message,
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
        return true;
    }
    submit() {
        if (this.valid()) {
            this.submitForgotPassword();
            this.resetFields();
        }
        return false;
    }
    resetFields() {
        this.setState({
            email: '',
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
                                                Forgot Password
                                            </h2>
                                            <div className="mb-6 mt-2 text-center text-muted">
                                                Please enter your email address.
                                            </div>
                                            {this.state.hasError && (
                                                <p className={this.state.forclass}>{this.state.hasError}</p>
                                            )}
                                            <form className="mb-4" onSubmit={(event) => this.preventSubmit(event)}>
                                                <div className="form-group mb-5">

                                                    <input type="email" className="form-control" name="email" id="email"
                                                        value={this.state.email}
                                                        onChange={(event) => this.handleUserInput(event)}
                                                        placeholder="Email address" />
                                                    <p className="text-danger">{this.state.emailError}</p>
                                                </div>

                                                <button className="btn w-100 btn-primary" type="submit" onClick={() => this.submit()}>
                                                    Forgot Password
                                                </button>
                                            </form>

                                            <p className="mb-0 fs-sm text-center text-muted">
                                                Don't have an account yet? <Link to="/signup">Sign up</Link>
                                            </p>

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
export default Forgotpassword;