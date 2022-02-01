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
            <section className="main_login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 common-form">
                            <div className="in_card">
                                <div className="row">
                                <div className="col-12 col-md-5 d-none d-md-block bg-cover card-img-start in_card-left">
                                        
                                        <div className="form_left">
                                           <div className="banner_desc_main">
                                                <h2 className="banner_title">Connecting <span>Dental <br/>Professionals and Clinics</span></h2>
                                                <div className="banner_desc_small">
                                                    <p> Browse local dental jobs and opportunities. 
                                                    <span>Create your profile and save your matches.</span></p>
                                                </div>
                                             
                                           </div>
                                        </div>
                                      
                                    </div>
                                    <div className="col-12 col-md-7">
                                        <div className="card-body">

                                            <h2 className="mb-0 fw-bold main_title" id="">
                                                Forgot Password
                                            </h2>
                                          
                                            {this.state.hasError && (
                                                <p className={this.state.forclass}>{this.state.hasError}</p>
                                            )}
                                            <form className="mb-4" onSubmit={(event) => this.preventSubmit(event)}>
                                                <div className="form-group mb-5">
                                                  <label>Email Address</label>
                                                    <input type="email" className="form-control" name="email" id="email"
                                                        value={this.state.email}
                                                        onChange={(event) => this.handleUserInput(event)}
                                                        placeholder="Email address" />
                                                    <p className="text-danger">{this.state.emailError}</p>
                                                </div>

                                                
                                            <p className="mb-0 bottom_link fs-sm text-center text-muted">
                                                Don't have an account yet? <Link to="/signup">Sign up</Link>
                                            </p>

                                             <div className="clearfix"></div>

                                                <button className="theme_btn_default" type="submit" onClick={() => this.submit()}>
                                                    Forgot Password
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
export default Forgotpassword;