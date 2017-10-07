import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Tags from './Tags';
import Observable from './Observable';

const store = new Observable();

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: {},
            wait: true
        };
    }

    page1 = () => {
        return <div></div>;
    }

    page2 = () => {
        return <div></div>;
    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path = '/' component = {this.page1}/>
                    <Route path = '/search' component = {this.page2}/>
                    <Tags
                        store = {store}
                    />
                </div>
            </Router>
        );
    }
}

