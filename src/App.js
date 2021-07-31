// import logo from './logo.svg';
// import './App.css';
// import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    //useParams
} from "react-router-dom";
import Home from './components/Home/Home';
import About from './components/About/About';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Forgotpassword from './components/Forgotpassword/Forgotpassword';
import Reset from './components/Reset/Reset';
import Jobs from './components/Jobs/Jobs';
import Contact from './components/Contact/Contact';
import Blogsin from "./components/Blogsin/Blogsin";
import Blogdetail from './components/Blogdetail/Blogdetail';
import Testimonialin from './components/Testimonialin/Testimonialin';
import Privacy from './components/Privacy/Privacy';
import Terms from './components/Terms/Terms';
import Notfound from './components/Notfound/Notfound';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ChangePassword from './components/ChangePassword/ChangePassword';
import IndividualProfile from './components/IndividualProfile/IndividualProfile';
import ProfileOverlay from "./components/ProfileOverlay/ProfileOverlay";

import Header from './components/includes/Header';
import Footer from './components/includes/Footer';

// function Welcome(props) {
//     const {slug}  = useParams();
//     return <Blogdetail slug={`${slug}`} />;
// }

function App() {
    const isAuthenticated = localStorage.getItem('token');

    return isAuthenticated ? (
        <div className="App">
            <Router>
                <ScrollToTop />

                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
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
                    <Route path="/myprofile">
                        <IndividualProfile />
                    </Route>
                    <Route path="/profileoverlay">
                        <ProfileOverlay />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </div>
    ) : (
        <div className="App">
            <Router>
                <ScrollToTop />

                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
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
                    <Route path="/privacy">
                        <Privacy />
                    </Route>
                    <Route path="/terms">
                        <Terms />
                    </Route>
                    <Route path="/notfound">
                        <Notfound />
                    </Route>
                    <Route path="/myprofile">
                        <Home />
                    </Route>
                    <Route path="/profileoverlay">
                        <ProfileOverlay />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
