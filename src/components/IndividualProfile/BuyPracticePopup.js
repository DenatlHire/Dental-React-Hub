import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Multiselect from 'multiselect-react-dropdown';

const isAuthenticated = localStorage.getItem('token');
const userinfo = JSON.parse(localStorage.getItem('user'));

export default class BuyPracticePopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            cityError: '',
            user_id: userinfo.id,
            hasError: false,
            cityItems: [],
            selectedCityIds: [],
            userinfoid: '',
            selectedCityList: null,
        };

    }

    componentDidMount() {

        axios.get("user-informations", {
            params: {
                user_id: userinfo.id
            }
        })
            .then(response => {
                this.setState({
                    isLoaded: true,
                    setuserid: response.data[0].user_id,
                    userinfoid: response.data[0].id,
                    selectedCityIds: (response.data[0].buy_practice_city_ids) ? response.data[0].buy_practice_city_ids.split(",").map((val) => {
                        return parseInt(val)
                    }) : []
                }, function () {
                    this.getCityList()
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }

    getCityList() {
        axios.get("cities")
            .then(response => {
                this.setState({
                    isLoaded: true,
                    cityItems: response.data
                });
                var state = this.state;
                var t = [];
                response.data.forEach(function (item) {
                    if (state.selectedCityIds.indexOf(item.id) !== -1) {
                        t.push(item);
                    }
                });

                this.setState({
                    selectedCityList: t,
                })


            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    updateBuyPracticeCity() {
        var city_ids = (this.state.selectedCityList)
        var cityArr = [];

        city_ids.forEach(function (item) {
            cityArr.push(item.id)
        })

        axios.put('user-informations/' + this.state.userinfoid, {
            buy_practice_city_ids: cityArr.join(),
        })
            .then(response => {
                // Handle success.
                window.location.href = '/myprofile';
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        });
    }

    valid() {
        if (!this.state.selectedCityList.length) {
            this.setState({
                cityError: "Please select city."
            });
            return false;
        }
        return true;
    }

    submit() {
        if (this.valid()) {
            this.updateBuyPracticeCity();
        }

        return false;
    }

    preventSubmit = function (e) {
        e.preventDefault();
    }

    onSelect = (selectedList, selectedItem) => {
        this.setState({
            selectedCityList: selectedList
        })
    }

    onRemove = (selectedList, selectedItem) => {
        this.setState({
            selectedCityList: selectedList
        })
    }

    render() {

        return (
            <div className="modal edit-modal fade" id="buypractice" tabIndex="-1" role="dialog" aria-labelledby="buypracticeLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editpersonalinformationLabel">Buy Practice</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="card-body p-0">
                                <form onSubmit={(event) => this.preventSubmit(event)}>
                                    <input type="hidden" id="userinfoid" name="userinfoid" value={this.state.userinfoid} />
                                    <div className="row">
                                        <div className="col-12 col-md-12">
                                            <div className="form-group main_content">
                                                <label className="form-label" htmlFor="city_ids">Please select city</label>
                                                <Multiselect
                                                    options={this.state.cityItems} // Options to display in the dropdown
                                                    selectedValues={this.state.selectedCityList} // Preselected value to persist in dropdown
                                                    displayValue="name" // Property name to display in the dropdown options
                                                    onSelect={this.onSelect} // Function will trigger on select event
                                                    onRemove={this.onRemove} // Function will trigger on remove event
                                                />
                                                <p className="text-danger">{this.state.cityError}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 justify-content-end d-flex">
                                            <button className="btn btn-primary mb-6 mt-6 mb-md-0 lift" type="submit" onClick={() => this.submit()}>
                                                Save
                                            </button>
                                            <button className="btn btn-danger ml-2 mb-6 mt-6 mb-md-0 lift" data-dismiss="modal" aria-label="Close">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}