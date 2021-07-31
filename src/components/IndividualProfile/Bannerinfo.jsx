import axios from 'axios';
import { event } from 'jquery';
import React, { Component } from 'react';
import PersonalInfoPopup from './PersonalInfoPopup';

const userinfo = JSON.parse(localStorage.getItem('user'));
const df_profile_photo = "/uploads/avatar.jpeg";
const df_banner_photo = "/uploads/background.jpg";

class Bannerinfo extends Component {

    constructor() {
        super();

        this.state = {
            name: "",
            userinfoid: '',
            profile_file: null,
            banner_file: null,
            profile_photo: window.baseURL + df_profile_photo,
            banner_photo: window.baseURL + df_banner_photo,
        }
    }

    componentDidMount() {
        axios.get("user-informations", {
            params: {
                user_id: userinfo.id
            }
        })
            .then(response => {
                this.setState({
                    name: userinfo.firstname + ' ' + userinfo.lastname,
                    userinfoid: response.data[0].id,
                    profile_photo: (response.data[0].profile_photo)
                        ? window.baseURL + response.data[0].profile_photo.formats.thumbnail.url
                        : window.baseURL + df_profile_photo,
                    banner_photo: (response.data[0].banner_photo)
                        ? window.baseURL + response.data[0].banner_photo.url
                        : window.baseURL + df_banner_photo,
                });
            })
    }

    handleChange = (event) => {

        if (event.target.name == "profileimage") {
            this.setState(
                {
                    profile_file: event.target.files[0]
                },
                function () {
                    this.handleProfileSubmit("profile")
                }
            );
        }

        if (event.target.name == "bannerimage") {
            this.setState(
                {
                    banner_file: event.target.files[0]
                },
                function () {
                    this.handleProfileSubmit("banner")
                }
            );
        }
    }

    handleProfileSubmit = (type) => {

        const data = new FormData();

        let photo = "";
        let file = null;

        if (type == "profile") {
            photo = "profile_photo";
            file = this.state.profile_file;
        }

        if (type == "banner") {
            photo = "banner_photo";
            file = this.state.banner_file;
        }

        data.append('ref', 'user-information');
        data.append('refId', this.state.userinfoid);
        data.append('field', photo);
        data.append('files', file);

        this.sendReq(data, type);
    }

    sendReq = async (data, type) => {
        const upload_res = await axios({
            url: window.baseURL + '/upload',
            method: "POST",
            data
        });

        if (upload_res && upload_res.data[0]) {
            if (type == "profile") {
                this.setState({
                    profile_photo: window.baseURL + upload_res.data[0].formats.thumbnail.url
                });
            }

            if (type == "banner") {
                this.setState({
                    banner_photo: window.baseURL + upload_res.data[0].url
                });
            }

        } else {
            alert("Somthing went wrong. Please try again.")
        }
    }

    triggerBannerClick = (event) => {
        document.getElementById('bannerimage').click();
    }

    triggerProfileClick = (event) => {
        document.getElementById('profileimage').click();
    }

    render() {

        return (
            <div className="profile-banner mt-5">


                <div className="top-cover pb-5">
                    <form>
                        <img className="up_img" src={this.state.banner_photo} alt={this.state.name} />
                        <input
                            className="file-upload"
                            name="bannerimage"
                            id="bannerimage"
                            type="file"
                            accept="image/*"
                            onChange={this.handleChange}
                        />
                    </form>
                    <div className="contasiners_banner">
                        <div className="input">

                        </div>
                    </div>
                    <a href="#" className="edit-icon" onClick={this.triggerBannerClick}>
                        <i className="fe fe-camera"></i>
                    </a>

                    <div className="d-flex w-100 align-items-end">
                        <div className="col-md-8">
                            <div className="d-flex align-items-end">
                                <div className="avatar">
                                    <div className="circle">
                                        <img
                                            className="profile-pic"
                                            src={this.state.profile_photo}
                                            title={this.state.name}
                                            alt={this.state.name}
                                        />
                                    </div>
                                    <form>
                                        <input type="hidden" id="userinfoid" name="userinfoid" value={this.state.userinfoid} />
                                        <div className="p-image">
                                            <i className="fe fe-camera upload-button" onClick={this.triggerProfileClick}></i>
                                            <input
                                                className="file-upload"
                                                name="profileimage"
                                                id="profileimage"
                                                type="file"
                                                accept="image/*"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <PersonalInfoPopup />

            </div>
        );
    }
}

export default Bannerinfo;