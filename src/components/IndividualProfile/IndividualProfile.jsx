import React, { Component } from 'react';
import Bannerinfo from './Bannerinfo';
import Aboutinfo from './Aboutinfo';
import SidebarSection from './SidebarSection';
import LookingforPopup from './LookingforPopup';
import Lookingforinfo from './Lookingforinfo';
import Educationinfo from './Educationinfo';
import Educationinfopopup from './Educationinfopopup';

class IndividualProfile extends Component {
    render() {
        return (
            <>
                <section className="bg-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9">
                                <Bannerinfo />
                                <Aboutinfo />
                                <Educationinfo />
                                <Lookingforinfo />
                            </div>
                            <SidebarSection />
                        </div>
                    </div>
                    <LookingforPopup />
                    <Educationinfopopup />
                </section>
            </>
        );
    }
}

export default IndividualProfile;