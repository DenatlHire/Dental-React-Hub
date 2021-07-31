import React, { Component } from 'react';
import { Link, useParams } from "react-router-dom";
import nl2br from 'react-newline-to-break';
import axios from 'axios';
import Moment from 'moment';
//import Moment from 'moment';

import { withRouter } from 'react-router-dom'
class Blogdetail extends Component {

   constructor(props) {
      // const { slug } = useParams();

      super(props);


      this.state = {
         error: null,
         isLoaded: false,
         item: null,
      };
   }

   componentDidMount() {
      axios.get("blogs?slug=" + this.props.match.params.slug)
         .then(response => {
            console.log(response.data[0])
            if (response.data[0]) {
               this.setState({
                  isLoaded: true,
                  item: response.data[0]
               });
            } else {
               alert('No blog found.');
               window.location.href = '/';
            }
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
               <h1 className="text-center">Blog Details</h1>
            </section>
            <section className="page_section_main blog_details">
               <div className="container">
                  <div className="row justify-content-center">
                     <div className="col-12 col-md-10 col-lg-9 col-xl-8">
                        <h1 className="display-4 text-center main_title">
                           {(this.state.item) ? this.state.item.title : ''}
                        </h1>
                        {/* <p className="lead mb-7 text-center text-muted">
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec condimentum quam. Fusce pellentesque faucibus lorem at viverra. Integer at feugiat odio. In placerat euismod risus proin.
                        </p> */}
                        {
                           (this.state.item && this.state.item.image[0])
                              ?
                              <img className="figure-img img-fluid rounded lift lift-lg"
                                 src={window.baseURL + this.state.item.image[0].url}
                                 alt={(this.state.item) ? this.state.item.title : ''}
                                 title={(this.state.item) ? this.state.item.title : ''}
                              />
                              : ""
                        }

                        <br />


                        {(this.state.item) ? nl2br(this.state.item.description) : ''}
                        <div className="row align-items-center py-5 border-top border-bottom mt-5">
                           <div className="col ms-n5">
                              <time className="fs-sm text-muted" datetime="2019-05-20">
                                 Published on {(this.state.item) ? Moment(this.state.item.publish_date).format('MMM DD, YYYY') : ""}

                              </time>
                           </div>
                           <div className="col-auto">
                              <span className="h6 text-uppercase text-muted d-none d-md-inline mr-4">
                                 Share:
                              </span>
                              <ul className="d-inline list-unstyled list-inline list-social">
                                 <li className="list-inline-item list-social-item mr-3">
                                    <Link href="#!" className="text-decoration-none">
                                       <img src="/assets/img/icons/social/instagram.svg" className="list-social-icon" alt="..." />
                                    </Link>
                                 </li>
                                 <li className="list-inline-item list-social-item mr-3">
                                    <Link href="#!" className="text-decoration-none">
                                       <img src="/assets/img/icons/social/facebook.svg" className="list-social-icon" alt="..." />
                                    </Link>
                                 </li>
                                 <li className="list-inline-item list-social-item mr-3">
                                    <Link href="#!" className="text-decoration-none">
                                       <img src="/assets/img/icons/social/twitter.svg" className="list-social-icon" alt="..." />
                                    </Link>
                                 </li>
                                 <li className="list-inline-item list-social-item mr-3">
                                    <Link href="#!" className="text-decoration-none">
                                       <img src="/assets/img/icons/social/whatsapp.svg" className="list-social-icon" alt="..." />
                                    </Link>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </>
      );
   }
}
export default withRouter(Blogdetail);