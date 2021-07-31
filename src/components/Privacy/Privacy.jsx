import React, { Component } from 'react';
import nl2br from 'react-newline-to-break';
import axios from 'axios'

class Privacy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        axios.get("cms-pages/2")
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
            <h1 className="text-center">Privacy</h1>
            </section>
            <section className="page_section_main about_us">
                <div className="container">
               
                    <div className="row align-items-stretch">
                        
                        <div className="col-12 col-md-12" data-aos="fade-up">

                            <p className="lead text-muted">
                                 {nl2br(this.state.items.description)}
                              </p>

                        </div>
                    </div>
                </div>
            </section>
          </>

        );
    }
}

export default Privacy;