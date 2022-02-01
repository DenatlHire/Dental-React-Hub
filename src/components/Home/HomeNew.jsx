import React, { Component } from 'react';
import Banner from '../sections/Banner';
import About from '../sections/About';
import Homeblock from '../sections/Homeblock';
import Testimonial from '../sections/Testimonial';
import Blogs from '../sections/Blogs';
import Partner from '../sections/Partner';


class HomeNew extends Component {
    
    componentDidMount(prevProps) {
        // Typical usage (don't forget to compare props):
        document.body.classList.remove('foo_shape_img');
        document.body.classList.add('home_body');
      }
      componentWillUnmount(){
        document.body.classList.remove('home_body');
      }
    render() {
        return (
            <>
            <Banner/>
            <About/>
            <Homeblock/>
           
            </>
        );
    }
}

export default HomeNew;