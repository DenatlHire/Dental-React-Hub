import React, { Component } from 'react';
import axios from 'axios'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


class Partner extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        axios.get("featured-companies")
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
              breakpoint: { max: 4000, min: 1921 },
              items: 4              
            },
            desktop: {
              breakpoint: { max: 1920, min: 1024 },
              items: 4
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1              
            }
          };
        
        return (
            <section className="py-6 py-md-8 bg-white partner_sec" data-aos="fade-up">
                <div className="container">
                <Carousel responsive={responsive} infinite={true} autoPlay={true} arrows={false}> 
                {this.state.items.map((item, key) => (
                            <div className="main_img p-5 shadow m-5 border" key={item.id}>
                                <div className="img-fluid svg-shim text-primary">
                                <div className="thumbnail-container">
                                 <div className="thumbnail">
                                <img className="" src={window.baseURL + item.Logo[0].formats.thumbnail.url} alt={item.title} title={item.title} />
                                </div>
                                </div>
                                </div>
                            </div>
                        ))}
                
                </Carousel>
                    {/* <div className="flickity-viewport-visible" data-flickity='{"imagesLoaded": true, "autoPlay": true, "initialIndex": 6, "pageDots": false, "prevNextButtons": false, "contain": true}'>
                        {this.state.items.map((item, key) => (
                            <div className="col-4 col-md-3 col-lg-3" key={item.id}>
                                <div className="img-fluid svg-shim text-primary">
                                <img className="" src={window.baseURL + item.Logo[0].formats.thumbnail.url} alt={item.title} title={item.title} />
                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>
            </section>
        );
    }
}

export default Partner;