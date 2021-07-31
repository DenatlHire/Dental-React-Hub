import React, { Component } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

class Testimonial extends Component {
     constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        axios.get("testimonials")
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
        const responsive = {
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 3000 },
              items: 1              
            },
            desktop: {
              breakpoint: { max: 1920, min: 1024 },
              items: 1
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 1
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1              
            }
          };
        return (

            <section className="home_testimonial">
                <div className="position-relative banner_shape">
                    <div className="shape shape-bottom shape-fluid-x text-white">
                        <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z" fill="currentColor"></path></svg>      </div>
                </div>
                  <div className="container" data-aos="fade-up">
                    <h2 className="display-5 main_title text-white mb-5 text-center">Testimonials</h2>
                  </div>
                <div className="card card-row shadow-light-lg mb-6">
                    <div className="row gx-0">
                     
                        <div className="col-12 col-md-12 position-static home_testimonail" data-aos="fade-up">
                        <Carousel responsive={responsive} infinite={true} autoPlay={true} arrows={true}> 
                                 {this.state.items.map((item, key) => (
                                <div className={key === 0 ? "w-100 is-selected" : "w-100" } key={item.id}>
                                    <div className="card-body text-center">
                                    <h3 className="mb-1 main_small_title fw-bold">
                                            {item.title}
                                    </h3>
                                        <p className="mb-0 text-muted">
                                           {item.description}
                                    </p>
                                    </div>
                                    <div className="card-meta mt-auto">
                
                                        <div className="bot_wrap text-center w-100">
                                        
                                        <h4 className="text-uppercase fw-bold d-inline-block ml-0 mb-0">
                                            {item.testimonial_by}
                                        </h4>
                                                <p className="mb-0 text-muted">
                                                {item.designation}
                                                </p>
                                        </div>
                                       
                                    </div>
                                </div>
                                  ))}
                            </Carousel>
                        </div>
                    </div>
                </div>

                <div className="text-center my-2" data-aos="fade-up">
                <Link to="/testimonials" className="btn btn-primary shadow lift">
                  View all
                </Link>
                </div>

            </section>


        );
    }
}

export default Testimonial;