import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            userinfo: JSON.parse(localStorage.getItem('user'))

        };
    }
    componentDidMount() {
        axios.get("cms-pages/1")
                .then(response => {
                    this.setState({
                        isLoaded: true,
                        items: response.data,
                        image: response.data.Image[0].url
                    });
                })
                .catch(function (error) {
                // handle error
        
                    console.log(error);
                })
    }
    render() {
        return (
            // <section className="border-bottom">
            //     <div className="container">
               
            //         <div className="row align-items-stretch">
            //             <div className="col-12 col-md-6 offset-md-1 order-md-2 pt-5">
                           
            //             <img src={window.baseURL + this.state.image} alt="About DentalPost" className="img-fluid mb-6 mb-md-0"/>

            //             </div>
            //             <div className="col-12 col-md-5 py-8 py-md-10 order-md-1" data-aos="fade-right">


            //                 <h1 className="main_title">
            //                     About DentalPost
            //                 </h1>

                            
            //                 <p className="lead main_big_desc mb-6 mb-md-8">
            //                      {this.state.items != '' ? this.state.items.description.substring(0, 300)+ "..."  : ''}
            //                   </p>

            //                 <Link to="/about" title="About Us" className="btn btn-primary shadow lift">
            //                    About Us
            //                  </Link>



            //             </div>
            //         </div>
            //     </div>
            // </section>

            <section className='build_dental'>
                <div className="container">
                    <h2 className="home_title"><span>Build your Dental Profile</span>
                     and Find a Job in Minutes
                    </h2>
                    <div className="build_desc">
                        <p>Using Dental Hire's smart technology, we instantly match you with clinics and professionals that are always your best match.</p>
                    </div>
                         <div className="build_dental_btn">
                            {/* <a className='theme_btn_default' href="/#" title="Find Your Match">Find Your Match</a> */}
                            <Link className=" theme_btn_default" to={ this.state.userinfo && this.state.userinfo.type ? (this.state.userinfo.type == '2' ? '/findProfile' : '/searchresult') : '/signupprofile'} aria-haspopup="true" aria-expanded="false">
                            Find Your Match</Link>
                         </div>
                </div>
            </section>


        );
    }
}

export default About;