import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";

class Banner extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            userinfo: JSON.parse(localStorage.getItem('user'))
        };
        // const userinfo = JSON.parse(localStorage.getItem('user'));
    }
    
    componentDidMount() {
        axios.get("banners")
                .then(response => {
                    this.setState({
                        isLoaded: true,
                        items: response.data
                    });
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
    }
    render() {
        return (
                <section className="banner">
                  <div className="container">
                      <div className="row">
                          <div className="col-12">
                              <div className="banner_desc_main">
                                  <h2 className="banner_title">Connecting <span>Dental <br/>Professionals and Clinics</span></h2>
                                  <div className="banner_desc_small">
                                      <p> Browse local dental jobs and opportunities. 
                                      <span>Create your profile and save your matches.</span></p>
                                  </div>
                                  <div className="get_started_btn">
                                  <Link className=" btn" to={ this.state.userinfo && this.state.userinfo.type ? (this.state.userinfo.type == '2' ? '/findProfile' : '/searchresult') : '/signupprofile'} aria-haspopup="true" aria-expanded="false">
                                  Get Started</Link>
                                      {/* <a className='btn' href="/signupprofile" title="Get Started">Get Started</a> */}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                </section>
                );
    }
}
export default Banner;