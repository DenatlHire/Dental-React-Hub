// import logo from './logo.svg';
// import './App.css';
// import ReactDOM from 'react-dom';
import './App.Messaging.css';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
  //useParams
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

import Home from "./components/Home/Home";
import HomeNew from "./components/Home/HomeNew";
import About from "./components/About/About";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Forgotpassword from "./components/Forgotpassword/Forgotpassword";
import Reset from "./components/Reset/Reset";
import Jobs from "./components/Jobs/Jobs";
import Messaging from './components/Messaging/Messaging';
import Contact from "./components/Contact/Contact";
import Blogsin from "./components/Blogsin/Blogsin";
import Blogdetail from "./components/Blogdetail/Blogdetail";
import Testimonialin from "./components/Testimonialin/Testimonialin";
import Privacy from "./components/Privacy/Privacy";
import Terms from "./components/Terms/Terms";
import Notfound from "./components/Notfound/Notfound";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import IndividualProfile from "./components/IndividualProfile/IndividualProfile";
import ProfileOverlay from "./components/ProfileOverlay/ProfileOverlay";
import LoginProfile from "./components/LoginProfile/LoginProfile";
import Individual from "./components/Individual/Individual";
import IndividualInfoslide from "./components/Individual/IndividualInfoslide";
import Clinic from "./components/Clinic/Clinic";
import ClinicProfileDetails from "./components/Clinic/ClinicProfileDetails";
import ClinicInfoslide from "./components/Clinic/ClinicInfoslide";
import IndividualUser from "./components/Individual/IndividualUser";
import IndividualProfileDetails from "./components/Individual/IndividualProfileDetails";
import ClinicUser from "./components/Clinic/ClinicUser";
import SearchResult from "./components/Individual/SearchResult";
import FindProfile from "./components/Individual/findProfile";
import SavedMatches from "./components/Individual/SavedMatches";
import SavedJobs from "./components/Individual/SavedJobs";
import Notification from "./components/Individual/Notification";
import MyJobs from "./components/MyJobs/MyJobs";
import CreateJob from "./components/MyJobs/CreateJob";
import UpdateJob from "./components/MyJobs/EditJob";
import Header from "./components/includes/Header";
import Footer from "./components/includes/Footer";

const queryClient = new QueryClient()

// function Welcome(props) {
//     const {slug}  = useParams();
//     return <Blogdetail slug={`${slug}`} />;
// }

function App() {
  const isAuthenticated = localStorage.getItem("token");
  const userType = JSON.parse(localStorage.getItem("user"));

  return (
    <QueryClientProvider client={queryClient}>
      {isAuthenticated ? (
        <div className="App">
          {/* {console.log("userapp", userType.type)} */}
          <Router>
            <ScrollToTop />

            <Route
              path="/"
              render={props =>
                props.location.pathname !== "/signupprofile" &&
                props.location.pathname !== "/individual" &&
                props.location.pathname !== "/clinic" &&
                props.location.pathname !== "/register" &&
                props.location.pathname !== "/clinicregister" && <Header />
              }
            ></Route>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about">
                <About />
              </Route>

              <Route path="/jobs">
                <Jobs />
              </Route>
              {userType?.type === 2 && (
                <Route path="/myjobs">
                  <MyJobs />
                </Route>
              )}
              {userType?.type === 2 && (
                <Route path="/createjob">
                  <CreateJob />
                </Route>
              )}
              {userType?.type === 2 && (
                <Route path="/updatejob/:id">
                  <UpdateJob />
                </Route>
              )}
              {userType?.type === 1 && (
                <Route path="/clinicProfileDetails/:id">
                  <ClinicProfileDetails />
                </Route>
              )}
              {userType?.type === 2 && (
                <Route path="/individualProfileDetails/:urlid">
                  <IndividualProfileDetails />
                </Route>
              )}
              {userType?.type === 2 && (
                <Route path="/savedmatches">
                  <SavedMatches />
                </Route>
              )}
              {userType?.type === 1 && (
                <Route path="/savedjob">
                  <SavedJobs />
                </Route>
              )}

              <Route path="/news">
                <Home />
              </Route>
              <Route path="/blogs">
                <Blogsin />
              </Route>
              <Route path="/signin">
                <Redirect to="/" push={true} />
              </Route>
              <Route path="/signup">
                <Redirect to="/" push={true} />
              </Route>
              <Route path="/forgotpassword">
                <Redirect to="/" push={true} />
              </Route>
              <Route path="/reset">
                <Redirect to="/" push={true} />
              </Route>
              <Route path="/changepassword">
                <ChangePassword />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="/messaging/:id?">
                <Messaging />
              </Route>
              <Route path="/blogdetail">
                <Blogdetail />
              </Route>
              <Route path="/blog/:slug">
                <Blogdetail />
              </Route>
              <Route path="/testimonials">
                <Testimonialin />
              </Route>
              <Route path="/privacy">
                <Privacy />
              </Route>
              <Route path="/terms">
                <Terms />
              </Route>
              <Route path="/notfound">
                <Notfound />
              </Route>
              {/* <Route path="/myprofile">
                            <IndividualProfile />
                        </Route> */}
              <Route path="/profileoverlay">
                <Redirect to="/" push={true} />
              </Route>
              <Route path="/signupprofile">
                <Redirect to="/" push={true} />
              </Route>
              <Route path="/individual">
                <Redirect to="/" push={true} />
              </Route>
              <Route path="/clinic">
                <Redirect to="/" push={true} />
              </Route>
              <Route path="/register">
                <Redirect to="/" push={true} />
              </Route>

              <Route path="/clinicregister">
                <Redirect to="/" push={true} />
              </Route>

              <Route path="/myprofile">
                <IndividualUser />
              </Route>
              <Route path="/clinicprofile">
                <ClinicUser />
              </Route>

              <Route path="/searchresult">
                <SearchResult />
              </Route>
              <Route path="/findProfile">
                <FindProfile />
              </Route>
              
              

              <Route path="/notification">
                <Notification />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/jobs">
                <Jobs />
              </Route>
              <Route path="/news">
                <Home />
              </Route>
              <Route path="/blogs">
                <Blogsin />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="/blogdetail">
                <Blogdetail />
              </Route>
              <Route path="/blog/:slug">
                <Blogdetail />
              </Route>
              <Route path="/testimonials">
                <Testimonialin />
              </Route>
              <Route path="/savedmatches">
                <SavedMatches />
              </Route>

              <Route path="/notification">
                <Notification />
              </Route>
            </Switch>
            <Route
              path="/"
              render={props =>
                props.location.pathname !== "/signupprofile" &&
                props.location.pathname !== "/individual" &&
                props.location.pathname !== "/clinic" &&
                props.location.pathname !== "/register" &&
                props.location.pathname !== "/clinicregister" && <Footer />
              }
            ></Route>
          </Router>
        </div>
      ) : (
        <div className="App">
          <Router>
            <ScrollToTop />

            <Route
              path="/"
              render={props =>
                props.location.pathname !== "/signupprofile" &&
                props.location.pathname !== "/individual" &&
                props.location.pathname !== "/clinic" &&
                props.location.pathname !== "/register" &&
                props.location.pathname !== "/clinicregister" && <Header />
              }
            ></Route>
            <Switch>
              <Route exact path="/" component={HomeNew} />
              <Route path="/signin">
                <Signin />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/forgotpassword">
                <Forgotpassword />
              </Route>
              <Route path="/reset">
                <Reset />
              </Route>
              <Route path="/changepassword">
                <Redirect to="/signup" push={true} />
              </Route>
          
            
              <Route path="/privacy">
                <Privacy />
              </Route>
              <Route path="/terms">
                <Terms />
              </Route>
              <Route path="/notfound">
                <Notfound />
              </Route>
              {/* <Route path="/myprofile">
                            <Home />
                        </Route> */}
              <Route path="/profileoverlay">
                <ProfileOverlay />
              </Route>
              <Route path="/signupprofile">
                <LoginProfile />
              </Route>
              <Route path="/individual">
                <Individual />
              </Route>
              <Route path="/clinic">
                <Clinic />
              </Route>
              <Route path="/register">
                <IndividualInfoslide />
              </Route>
              <Route path="/clinicregister">
                <ClinicInfoslide />
              </Route>
              {/* <Route path="/myprofile">
                            <IndividualUser />
                        </Route> */}
              {/* <Route path="/clinicprofile">
                            <ClinicUser />
                        </Route> */}
            

            </Switch>
            <Route
              path="/"
              render={props =>
                props.location.pathname !== "/signupprofile" &&
                props.location.pathname !== "/individual" &&
                props.location.pathname !== "/clinic" &&
                props.location.pathname !== "/register" &&
                props.location.pathname !== "/clinicregister" && <Footer />
              }
            ></Route>
          </Router>
        </div>
      )}
    </QueryClientProvider>
  )
}

export default App;
