import React, { Component } from 'react';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = props.store.data.tags;
    }
    render() {
        return <div>
            {Object.keys(this.state).map(key => {
                return <label key = {key}><input type = 'checkbox' />
                    {this.state[key]}
                </label>;
            })}
        </div>;
    }
}