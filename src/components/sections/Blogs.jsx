import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Moment from 'moment';

class Blogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        axios.get("blogs",{
            params: {
              _limit: 3
             }
          })
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
            <section className="py-6 py-md-11 blog_bg blog-section border-bottom">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8 text-center" data-aos="fade-up">

                            <span className="badge rounded-pill bg-success-soft mb-3 px-5 py-2">
                                <span className="h5 text-uppercase font-weight-bold">Latest Blogs</span>
                            </span>



                            <h1 className="display-5 mb-5 text-center main_title">
                                Here’s what we've been up to recently.
                                </h1>

                        </div>
                    </div>
                    <div className="row">

                        {this.state.items.map(item => (
                            <div className="col-12 col-md-6 col-lg-4 d-flex" key={item.id} data-aos="fade-up" data-aos-delay="200">


                                <div className="card shadow-light-lg mb-6 mb-md-0 lift lift-lg">

                                    <Link to="/">
                                        <div className="card-img-top">
                                            <div className="thumbnail-container">
                                                <div className="thumbnail">
                                                     <img className="w-100" src={window.baseURL + item.image[0].formats.thumbnail.url} alt={item.title} title={item.title} />
                                                </div>
                                            </div>
                                         
                                        </div>


                                        <div className="position-relative">
                                            <div className="shape shape-bottom shape-fluid-x svg-shim text-white">
                                                <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z" fill="currentColor"></path></svg>                </div>
                                        </div>
                                    </Link>


                                    <Link className="card-body" to="/">


                                        <h3 className="mb-1 fw-bold mb-3 main_small_title" title={item.title} at={item.title}>
                                            {item.title != '' ? item.title.substring(0, 40)+ "..." : ''}
                                        </h3>


                                        <p className="mb-0 main_small_desc">
                                            {item.description != '' ? item.description.substring(0, 120)+ "..." : ''}
                                        </p>

                                    </Link>


                                    <Link className="card-meta" to="#!">


                                        <hr className="card-meta-divider" />


                                        <p className=" w-100 text-uppercase text-center main_small_desc_grey mb-0 ms-auto">
                                            <time dateTime="{Moment(item.publish_date).format('MMMM DD, YYYY')}">{Moment(item.publish_date).format('MMMM DD, YYYY')}</time>
                                        </p>


                                    </Link>

                                </div>

                            </div>
                        ))}

                    </div>

                    <div className="text-center mt-6" data-aos="fade-up">
                        <Link to="/blogs" className="btn btn-primary shadow lift" type="submit">
                            View all
                            </Link>
                    </div>
                </div>
            </section>

        );
    }
}

export default Blogs;