import React, { Component } from 'react';
import Slider from "react-slick";
import "react-multi-carousel/lib/styles.css";
import Slideone from './Slideone';
import Slidetwo from './Slidetwo';
import Slidethree from './Slidethree';
import Slidefour from './Slidefour';
import Slidefifth from './Slidefifth';
import Slidesixth from './Slidesixth';
//import nl2br from 'react-newline-to-break';
//import axios from 'axios'

class ProfileOverlay extends Component {



    render() {

        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight:true,
            infinite:false,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
          };

          function SampleNextArrow(props) {
            const { className, style, onClick } = props;
            return (
              <div
                className={className}
             
                onClick={onClick}
              >Next</div>
            );
          }
          
          function SamplePrevArrow(props) {
            const { className, style, onClick } = props;
            return (
              <div
                className={className}
                
                onClick={onClick}
                
              > Previous </div>
            );
          }


        return (
            <>
                <section className="main_overlay_profile" style={{
                    backgroundImage: "url(" + "http://localhost:1337/uploads/large_Banner3_7eb2bd9e19.png" + ")"
                }}>

                    <div className="main_over_poup">
                    <Slider {...settings}>
                           <Slideone /> 
                           <Slidetwo /> 
                           <Slidesixth/>
                           <Slidethree /> 
                           <Slidefifth />
                           <Slidefour /> 
                  </Slider>
                           
                        
                  
                    </div>

                </section>
            </>

        );
    }

    
      
}

export default ProfileOverlay;