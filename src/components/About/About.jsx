import React, { Component } from 'react';
import nl2br from 'react-newline-to-break';
import axios from 'axios'

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
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
            <>
            <section className="d-flex justify-content-center inner-banner align-items-center">
            <h1 className="text-center">About</h1>
            </section>
            <section className="page_section_main about_us">
                <div className="container">
               
                    <div className="row align-items-stretch">
                        
                        <div className="col-12 col-md-12" data-aos="fade-up">

                            <div className="about_img_div float-right">
                             <img src={window.baseURL + this.state.image} alt="About DentalPost" className="img-fluid mx-100 mb-6 mb-md-0"/> 
                            </div>
                            <h1 className="main_title">
                                About DentalPost
                            </h1>

                            
                            <p className="main_big_desc">
                                 {nl2br(this.state.items.description)}
                              </p>

                        </div>
                    </div>
                </div>
            </section>
          </>

        );
    }
}

export default About;