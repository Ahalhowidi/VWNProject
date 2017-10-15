import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Observable from './Observable'
import Loading from './Loading';
import ServerError from './ServerError';
import MenuBar from './MenuBar';
import Map from './Map';
import TagsContainer from './TagsContainer';
import OrgsContainer from './OrgsContainer';
import Add from './Add';
import ContactUs from './ContactUs';

export default class App extends Component {

    constructor() {
        super();
        this.serverLink = 'http://localhost:8080/';
        this.adminEmail = 'admin@example.com';
        this.tags = {}
        this.orgs = {};
        this.state = {
            status: 0
        };
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('Get', `${this.serverLink}search`, true);
        xhr.onreadystatechange = () => {
            if ( xhr.readyState === 4 ) {
                if (xhr.status === 200) {
                    this.tags = JSON.parse(xhr.response).tags;
                    this.orgs = JSON.parse(xhr.response).orgs;
                    window.onbeforeunload = e => {
                        if (typeof(Storage) !== "undefined") {
                            const selectedTags = Observable.getDataType('selectedTags');
                            sessionStorage.selectedTags = Object.keys(selectedTags)
                                .filter(selectedTagId => selectedTags[selectedTagId]).join('#');
                            if (Observable.getDataType('companies') === false) {
                                sessionStorage.companies = '0';
                            }
                            else {
                                sessionStorage.companies = '1';
                            }
                        }
                    };
                    if (typeof(Storage) !== "undefined") {
                        if (sessionStorage.selectedTags) {
                            const selectedTags = {};
                            sessionStorage.selectedTags.split('#').forEach(selectedTagId => {
                                selectedTags[selectedTagId] = true;
                            });
                            Observable.setDataType('selectedTags', selectedTags);
                            sessionStorage.removeItem('selectedTags');
                        }
                        if (sessionStorage.companies) {
                            if (sessionStorage.companies === '0') {
                                Observable.setDataType('companies', false);
                            }
                            else {
                                Observable.setDataType('companies', true);
                            }
                            sessionStorage.removeItem('companies');
                        }
                    }
                }
                this.setState({
                    status: xhr.status
                });
            }
        }
        xhr.send();
    }

    render() {
        if (this.state.status === 0) {
            return <Loading />;
        }
        else if (this.state.status === 500) {
            return <ServerError
                adminEmail = {this.adminEmail}
            />;
        }
        else {
            return <Router className = 'route'>
                <div className ='vericalFlexContainer'>
                    <MenuBar/>
                    <Route className = 'route' exact path = '/' component = {() =>
                        <div className = 'horizontalFlexContainer'>
                            <div className = 'vericalFlexContainer horizontalFlexElement'>
                                <TagsContainer tags = {this.tags} />
                                <OrgsContainer orgs = {this.orgs} tags = {this.tags} />
                            </div>
                            <div className = 'horizontalFlexElement'>
                                <Map />
                            </div>
                            <Map />
                        </div>
                    }/>
                    <Route path = '/Add' component = {() =>
                        <Add />
                    }/>
                    <Route path = '/contact-us' component = {() =>
                        <ContactUs />
                    }/>
                </div>
            </Router>;
        }
    }
}