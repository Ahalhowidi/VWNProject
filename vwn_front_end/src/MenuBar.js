import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Observable from './Observable'

export default class MenuBar extends Component {

    constructor() {
        super();
        this.state = {
            activeMenuBarItemIndex: 0
        }
    }

    componentWillMount() {
        Observable.subscribe(this.markActiveMenuBarItem);
    }

    componentWillUnmount() {
        Observable.unsubscribe(this.markActiveMenuBarItem);
    }

    markActiveMenuBarItem = (action, value) => {
        if (action === 'markActiveMenuBarItem') {
            this.setState({
                activeMenuBarItemIndex: value
            });
        }
    }

    render() {
        return <ul className = 'menuBar'>
            {this.state.activeMenuBarItemIndex === 0 ?
                <li className = 'menuBarItem activeMenuBarItem'>Search</li> :
                <Link to={'/'}><li className = 'menuBarItem'>Search</li></Link>
            }
            {this.state.activeMenuBarItemIndex === 1 ?
                <li className = 'menuBarItem activeMenuBarItem'>Add</li> :
                <Link to={'/add'}><li className = 'menuBarItem'>Add</li></Link>
            }
            {this.state.activeMenuBarItemIndex === 2 ?
                <li className = 'menuBarItem activeMenuBarItem'>Contact us</li> :
                <Link to={'/contact-us'}><li className = 'menuBarItem'>Contact us</li></Link>
            }
        </ul>;
    }
}