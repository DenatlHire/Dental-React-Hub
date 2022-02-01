import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";
class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userinfoid: '',
            hasError: false,
            lookingFor: ''
        };
        console.log(this.props)
    }

    componentDidMount(prevProps) {
        // Typical usage (don't forget to compare props):
        document.body.classList.add('foo_shape_img');
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
                if(response.data.user.type == 1){
                    console.log("response ====>",response.data);
                    axios
                        .get("user-informations", {
                            params: {
                            user_id: user_id
                            }
                        })
                        .then(response => {
                            localStorage.setItem("user-info", JSON.stringify(response?.data[0]));
                            this.setState({
                                lookingFor: response?.data[0]?.looking_for
                              });
                            // lookingFor = response.data[0].looking_for;
                            window.location.href = '/';
                          
                            
                        })
                }else{
                    console.log("response ====>",response.data);
                    axios
                        .get("user-informations", {
                            params: {
                            user_id: user_id
                            }
                        })
                        .then(response => {
                            localStorage.setItem("user-info", JSON.stringify(response?.data[0]));
                            console.log("rrrrrrrrrrr",response?.data.designation_id);
                            this.setState({
                                lookingFor: response?.data[0]?.looking_for
                              });
                            // lookingFor = response.data[0].looking_for;
                            console.log("lookingFor",this.state.lookingFor);
                            window.location.href = '/findProfile';
                            console.log("lookingFor",this.state.lookingFor);
                            
                        })
                }
                
                // axios.get("user-informations", {
                //     params: {
                //         user_id: user_id
                //     }
                // })
                //     .then(response => {
                //         if (response.data.length === 0) {
                //             this.submitUserInformation(user_id);
                //         } else {
                            // window.location.href = '/myprofile';
                //         }
                //     })


            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error);
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
                                                Login
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
                                                        placeholder="Your Email" />
                                                    <p className="text-danger">{this.state.emailError}</p>
                                                </div>
                                                <div className="form-group mb-5">
                                                    <label>Password</label>
                                                    <input type="password" className="form-control" name="password" id="password"
                                                        value={this.state.password}
                                                        onChange={(event) => this.handleUserInput(event)}
                                                        placeholder="Your Password" />
                                                    <p className="text-danger">{this.state.passwordError}</p>
                                                </div>
                                                 
                                                <p className="mb-3 bottom_link  fs-sm text-center text-muted">
                                                <Link to="/forgotpassword">Forgot Password?</Link>
                                            </p>
                                            <p className="mb-0 bottom_link fs-sm text-center text-muted">
                                                Don't have an account yet? <Link to="/signupprofile">Sign Up</Link>
                                            </p>

                                                <button className="theme_btn_default" type="submit" onClick={() => this.submit()}>
                                                    Login
                                                </button>
                                            </form>
                                          
                                            {/* <div className="mt-5 sign-social mb-0 fs-sm text-left text-muted">
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
                                            </div> */}
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