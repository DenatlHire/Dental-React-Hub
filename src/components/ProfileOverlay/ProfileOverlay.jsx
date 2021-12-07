import React, { Component } from 'react';
import Slider from "react-slick";
import "react-multi-carousel/lib/styles.css";
import Slideone from './Slideone';
import Slideonesubone from './Slideonesubone';
import Slideonesubtwo from './Slideonesubtwo';
import Slideonesubthree from './Slideonesubthree';
import Slidetwo from './Slidetwo';
import Slidethree from './Slidethree';
import Slideradio from './Slideradio';
import Slidethreesubone from './Slidethreesubone';
import Slidethreesubtwo from './Slidethreesubtwo';
import Slidefour from './Slidefour';

import Slidefoursubone from './Slidefoursubone';
import Slidefoursubtwo from './Slidefoursubtwo';
import Slidefoursubthree from './Slidefoursubthree';
import Slidefoursubfour from './Slidefoursubfour';
import Slidefoursubfive from './Slidefoursubfive';
import Slidefoursubsix from './Slidefoursubsix';
import Slidefoursubseven from './Slidefoursubseven';

import Slidefifth from './Slidefifth';
import Slidefifthsubone from './Slidefifthsubone';
import Slidefifthsubtwo from './Slidefifthsubtwo';
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
                    backgroundImage: "url(" + window.baseURL +"/uploads/large_Banner3_7eb2bd9e19.png" + ")"
                }}>

                    <div className="main_over_poup">
                    <Slider {...settings}>
                           <Slideone /> 
                         
                           <Slideonesubtwo />

                           <Slideradio />
                          
                           <Slidefifth />
                          
                           <Slidethree /> 
                         
                           <Slidefoursubone />
                           <Slidefoursubtwo />
                           <Slidefoursubthree />

                          
                  </Slider>
                           
                        
                  
                    </div>

                </section>
            </>

        );
    }

    
      
}

export default ProfileOverlay;