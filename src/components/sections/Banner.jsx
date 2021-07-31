import React, { Component } from 'react';
import axios from 'axios';

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
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
                
                    <div className="container-fluid p-0">
                        <div className="carousel slide" id="main-carousel" data-ride="carousel">
                            <div className="carousel-inner">
                                {this.state.items.map((item, key) => (
                                                <div className={key === 0 ? "carousel-item active" : "carousel-item" } key={item.id}>
                                                    <img className="" src={window.baseURL + item.image[0].formats.large.url} alt={item.title} />
                                                    <div className="carousel-caption d-none d-md-block">
                                                        <h1 title={item.title} at={item.title}>{item.title}</h1>
                                                        <p className="lead mb-0 text-white">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                 ))}
                            </div>
                            <a href="#main-carousel" className="carousel-control-prev" data-slide="prev">
                                <button className="flickity-button flickity-prev-next-button previous" type="button" aria-label="Previous"><svg className="flickity-button-icon" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow"></path></svg></button>
                            </a>
                            <a href="#main-carousel" className="carousel-control-next" data-slide="next">
                                <button className="flickity-button flickity-prev-next-button next" type="button" aria-label="Next"><svg className="flickity-button-icon" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow" transform="translate(100, 100) rotate(180) "></path></svg></button>
                            </a>
                        </div>
                    </div>
                
                    <div className="banner-search position-absolute ">
                        <div className="container">
                            <div className="baner-search-box bg-white p-2 pr-5 shadow">
                                <div className="row align-items-center">
                                    <div className="col-md-4 col-lg-5">
                                        <div className="input-group input-group-lg">
                                            <span className="input-group-text border-0 pe-1">
                                                <i className="fe fe-search"></i>
                                            </span>
                                            <input type="text" className="form-control border-0 px-1" placeholder="Search by Job Type, skill, or company..." />
                
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-lg-5">
                                        <div className="input-group input-group-lg">
                                            <span className="input-group-text border-0 pe-1">
                                                <i className="fe fe-map-pin"></i>
                                            </span>
                                            <input type="text" className="form-control border-0 px-1" placeholder="Location..." />
                
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-lg-2 ml-auto text-right">
                                        <button type="submit" className="btn btn-sm btn-primary w-100">
                                            Search
                                        </button>
                                    </div>
                
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="position-relative banner_shape">
                        <div className="shape shape-bottom shape-fluid-x text-white">
                            <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z" fill="currentColor"></path></svg>      </div>
                    </div>
                </section>
                );
    }
}
export default Banner;