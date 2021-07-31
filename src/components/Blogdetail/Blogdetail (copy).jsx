import React, { Component } from 'react';
import { Link, useParams } from "react-router-dom";
//import nl2br from 'react-newline-to-break';
import axios from 'axios';
//import Moment from 'moment';

const Blogdetail = () => {
   let {slug} = useParams();

   console.log(slug);

   return (
      <div>
         <section className="d-flex justify-content-center inner-banner align-items-center">
            <h1 className="text-center">Blogs Detail</h1>
         </section>
         <section className="page_section_main blog_details">
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-12 col-md-10 col-lg-9 col-xl-8">
                     <h1 className="display-4 text-center">
                        Case Acceptance: How to Win a Yes Every Time
                     </h1>
                     <p className="lead mb-7 text-center text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec condimentum quam. Fusce pellentesque faucibus lorem at viverra. Integer at feugiat odio. In placerat euismod risus proin.
                        </p>
                     <img className="figure-img img-fluid rounded lift lift-lg" src="assets/img/photos/photo-27.jpg" alt="..." />
                     <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi reiciendis odio perferendis libero saepe voluptatum fugiat dolore voluptates aut, ut quas doloremque quo ad quis ipsum molestias neque pariatur commodi.
         </p>
                     <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, quidem, earum! Quo fugiat voluptates similique quidem dolorem ex non quibusdam odio suscipit error, maiores, itaque blanditiis vel, sed, cum velit?
         </p>
                     <div className="row align-items-center py-5 border-top border-bottom mt-5">
                        <div className="col ms-n5">
                           <time className="fs-sm text-muted" datetime="2019-05-20">
                              Published on May 20, 2019
               </time>
                        </div>
                        <div className="col-auto">
                           <span className="h6 text-uppercase text-muted d-none d-md-inline mr-4">
                              Share:
               </span>
                           <ul className="d-inline list-unstyled list-inline list-social">
                              <li className="list-inline-item list-social-item mr-3">
                                 <Link href="#!" className="text-decoration-none">
                                    <img src="./assets/img/icons/social/instagram.svg" className="list-social-icon" alt="..." />
                                 </Link>
                              </li>
                              <li className="list-inline-item list-social-item mr-3">
                                 <Link href="#!" className="text-decoration-none">
                                    <img src="./assets/img/icons/social/facebook.svg" className="list-social-icon" alt="..." />
                                 </Link>
                              </li>
                              <li className="list-inline-item list-social-item mr-3">
                                 <Link href="#!" className="text-decoration-none">
                                    <img src="./assets/img/icons/social/twitter.svg" className="list-social-icon" alt="..." />
                                 </Link>
                              </li>
                              <li className="list-inline-item list-social-item mr-3">
                                 <Link href="#!" className="text-decoration-none">
                                    <img src="./assets/img/icons/social/whatsapp.svg" className="list-social-icon" alt="..." />
                                 </Link>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}

// class Blogdetail extends Component {
//    //const { slug } = useParams();

//    constructor(props) {
      
//       super(props);

//       this.state = {
//          error: null,
//          isLoaded: false,
//          items: [],
//          //slug: props.slug
//       };
//    }

//    // componentDidMount() {
//    //    axios.get("blogs?slug="+this.state.slug)
//    //       .then(response => {
//    //          this.setState({
//    //             isLoaded: true,
//    //             items: response.data
//    //          });
//    //       })
//    //       .catch(function (error) {
//    //          // handle error
//    //          console.log(error);
//    //       })
//    // }

//    render() {

      
//    }
// }
export default Blogdetail;