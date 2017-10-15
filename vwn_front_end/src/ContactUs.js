import React, { Component } from 'react';

import Observable from './Observable'

export default class ContactUs extends Component {

    componentWillMount() {
        Observable.notify('markActiveMenuBarItem', 2);
    }

    render() {
        return <div>Contact us</div>;
    }
}