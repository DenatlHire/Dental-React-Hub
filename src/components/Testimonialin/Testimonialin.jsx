import React, { Component } from 'react';
import { Link } from "react-router-dom";
import nl2br from 'react-newline-to-break';
import axios from 'axios';
import Moment from 'moment';
class TestimonialList extends Component {
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
        return (
            <>
                <section className="d-flex justify-content-center inner-banner align-items-center">
                    <h1 className="text-center">Testimonials</h1>
                </section>
                <section className="page_section_main testimonials_detail">
                    <div className="container">
                        <div className="row justify-content-center">
                            {this.state.items.map((item, key) => (
                                <div className="w-100 col-12 shadow mb-6 test-col-main" key={item.id}>
                                    <div className="test_img">
                                        <img src="/assets/img/testimonial.svg" className="list-social-icon" alt="..." />
                                    </div>
                                    <div className="card-body text-center">
                                        <h3 className="mb-1 fw-bold"> {item.title}</h3>
                                        <p className="mb-0 text-muted">{item.description}</p>
                                    </div>
                                    <div className="card-meta mt-auto">
                                        <div className="bot_wrap text-center w-100">
                                            <h4 className="text-uppercase fw-bold d-inline-block ml-0 mb-0">{item.testimonial_by}</h4>
                                            <p className="mb-0 text-muted">{item.designation}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </>
        );
    }
}
export default TestimonialList;