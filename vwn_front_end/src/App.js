import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Observable from './Observable'
import Loading from './Loading';
import ServerError from './ServerError';
import TagsContainer from './TagsContainer';
import OrgsContainer from './OrgsContainer';
import SearchButtons from './SearchButtons';

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
                                .filter(selectedTagId => selectedTags[selectedTagId]).toString();
                        }
                    };
                    if (typeof(Storage) !== "undefined") {
                        if (sessionStorage.selectedTags) {
                            const selectedTags = {};
                            sessionStorage.selectedTags.split(',').forEach(selectedTagId => {
                                selectedTags[selectedTagId] = true;
                            });
                            Observable.setDataType('selectedTags', selectedTags);
                            sessionStorage.removeItem('selectedTags');
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
            return <Router>
                <div>
                    <TagsContainer tags = {this.tags} />
                    <Route exact path = '/' component = {() => <SearchButtons />}/>
                    <Route path = '/results' component = {() =>
                        <OrgsContainer orgs = {this.orgs} tags = {this.tags} />
                    }/>
                </div>
            </Router>;
        }
    }
}