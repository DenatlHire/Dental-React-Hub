import React, { Component } from 'react';
import { Link } from "react-router-dom";
//import nl2br from 'react-newline-to-break';
import axios from 'axios';
import Moment from 'moment';

class Blogsin extends Component {

   constructor(props) {
      super(props);
      this.state = {
         error: null,
         isLoaded: false,
         items: []
      };
   }
   componentDidMount() {
      axios.get("blogs")
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
               <h1 className="text-center">Blogs</h1>
            </section>
            <div className="page_section_main blog_in_us">
               <div className="container">
                  <div className="row">
                     {this.state.items.map(item => (
                        <div className="col-12 col-md-6 col-lg-4 d-flex mb-5" key={item.id} data-aos="fade-up" data-aos-delay="200">
                           <div className="card shadow-light-lg mb-6 mb-md-0 lift lift-lg">
                              <Link to={`/blog/case-acceptance:-how-to-win-a-yes-every-time`}>
                                 <div className="card-img-top">
                                    <div className="thumbnail-container">
                                       <div className="thumbnail">
                                          <img className="w-100" src={window.baseURL + item.image[0].formats.thumbnail.url} alt={item.title} title={item.title} />
                                       </div>
                                    </div>
                                 </div>
                                 <div className="position-relative">
                                    <div className="shape shape-bottom shape-fluid-x svg-shim text-white">
                                       <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z" fill="currentColor"></path>
                                       </svg>
                                    </div>
                                 </div>
                              </Link>
                              <Link className="card-body" to={`/blogdetail`}>
                                 <h3 className="mb-1 fw-bold mb-3 main_small_title" title={item.title} at={item.title}>
                                    {
                                       (item.title)
                                          ? item.title.substring(0, 40) + "..."
                                          : ''
                                    }
                                 </h3>
                                 <p className="mb-0 main_small_desc_grey">
                                    {
                                       (item.description)
                                          ? item.description.substring(0, 120) + "..."
                                          : ''
                                    }
                                 </p>
                              </Link>
                              <Link className="card-meta" to={`/blogdetail`}>
                                 <hr className="card-meta-divider" />
                                 <p className="h6 w-100 main_small_desc text-uppercase text-center text-muted mb-0 ms-auto">
                                    <time dateTime="{Moment(item.publish_date).format('MMMM DD, YYYY')}">{Moment(item.publish_date).format('MMMM DD, YYYY')}</time>
                                 </p>
                              </Link>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </>
      );
   }
}
export default Blogsin;