import React, { Component } from 'react';

import Observable from './Observable'

export default class Add extends Component {

    componentWillMount() {
        Observable.notify('markActiveMenuBarItem', 1);
    }

    render() {
        return <div>Add</div>;
    }
}