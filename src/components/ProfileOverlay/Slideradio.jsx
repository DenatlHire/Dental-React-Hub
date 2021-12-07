import React, { Component } from 'react';

//import nl2br from 'react-newline-to-break';
//import axios from 'axios'

export default class Slideradio extends Component {



    render() {

        return (

        <>
        
        <div className="item_main">

        <div className="over_info_col">
            <form action="">
                <h2 className="over_title">I am</h2>
                <div className="overlay_content">
                    <div className="row">
                        <div className="col-12 col-md-12">
                            
                           <form>
                           
                           <div class="mt-4 mb-6 text-center text-muted rad-group">
                       <div class="form-check mb-2 d-inline-block cus-radio-btn custom-control custom-radio custom-control-inline">
                       <input class="form-check-input custom-control-input" type="radio" name="role" id="Individual" value="1"  />
                       <label class="form-check-label custom-control-label" for="Individual">Candidate looking for a position</label>
                       </div>

                       <div class="form-check mb-2 d-inline-block  cus-radio-btn custom-control custom-radio custom-control-inline">
                       <input class="form-check-input custom-control-input" type="radio" name="role" id="Clinic" value="2" />
                       <label class="form-check-label custom-control-label" for="Clinic">I am Office looking to fill a position</label>
                       </div>
                    </div>

                           </form>

                        </div>
                      
                     
                   

                    </div>

                </div>

            </form>
        </div>

    </div>
    </>
        )

     }

}   