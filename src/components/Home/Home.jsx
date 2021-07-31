import React, { Component } from 'react';
import Banner from '../sections/Banner';
import About from '../sections/About';
import Homeblock from '../sections/Homeblock';
import Testimonial from '../sections/Testimonial';
import Blogs from '../sections/Blogs';
import Partner from '../sections/Partner';


class Home extends Component {
    render() {
        return (
            <>
            <Banner/>
            <About/>
            <Homeblock/>
            <Testimonial/>
            <Blogs/>
            <Partner/>
            </>
        );
    }
}

export default Home;