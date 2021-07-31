import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Reset extends Component {

    constructor(props) {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const urlcode = params.get('code');
        super(props);

        this.state = {
            code: urlcode,
            password: '',
            confirmpassword: '',
            passwordError: '',
            confirmpasswordError: ''
        }
    }

    submitRestPassword() {

        axios
            .post('auth/reset-password', {
                code: this.state.code, // code contained in the reset link of step 3.
                password: this.state.password,
                passwordConfirmation: this.state.confirmpassword,
            })
            .then(response => {
                console.log("Your user's password has been reset.");
                this.setState({
                    hasError: "Password updated successfully. You can now use it to log in to your account.",
                    forclass: "text-danger text-center success-msg"
                });

            })
            .catch(error => {
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
            this.submitRestPassword();
            this.resetFields();
        }
        return false;
    }

    resetFields() {
        this.setState({
            password: '',
            confirmpassword: '',
            passwordError: '',
            confirmpasswordError: ''
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

                                            <h2 className="mb-0 fw-bold text-center" id="">
                                                Reset Password
                                            </h2>
                                            <p className="mb-6 mt-2 text-center text-muted">
                                                Please fill below details.
                                            </p>
                                            {this.state.hasError && (
                                                <p className={this.state.forclass}>{this.state.hasError}</p>
                                            )}
                                            <form className="mb-4" onSubmit={(event) => this.preventSubmit(event)}>
                                                <div className="form-group mb-5">

                                                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={this.state.password} onChange={(event) => this.handleUserInput(event)} />
                                                    <p className="text-danger">{this.state.passwordError}</p>
                                                </div>
                                                <div className="form-group mb-5">

                                                    <input type="password" className="form-control" id="confirmpassword" name="confirmpassword" value={this.state.confirmpassword} onChange={(event) => this.handleUserInput(event)} placeholder="Confirm Password" />
                                                    <p className="text-danger">{this.state.confirmpasswordError}</p>
                                                </div>
                                                <p className="text-danger">{this.state.notmatchpasswordError}</p>
                                                <button className="btn w-100 btn-primary" type="submit" onClick={() => this.submit()}>
                                                    Reset Password
                                                </button>
                                            </form>

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
export default Reset;