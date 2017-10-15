import React, { Component } from 'react';

import Observable from './Observable'

export default class TagsContainer extends Component {

    constructor() {
        super();
        this.state = {
            companies: Observable.getDataType('companies')
        };
    }

    componentWillMount() {
        Observable.notify('markActiveMenuBarItem', 0);
    }

    render() {
        return <div className = 'tagsContainer'>
            <div className = 'centeredContainer'>
                {Object.keys(this.props.tags).map(tagId => {
                    let className = `btn btn${tagId % 20}`;
                    if (Observable.get('selectedTags', tagId)) {
                        className += ' btnSelected';
                    }
                    return <button
                        key = {tagId}
                        className = {className}
                        onClick = {e => {
                            e.target.classList.toggle('btnSelected');
                            Observable.set('selectedTags', tagId, !Observable.get('selectedTags', tagId));
                            Observable.notify('tagsSelection');
                        }}
                    >{this.props.tags[tagId]}</button>;
                })}
            </div>
            <div className = 'centeredContainer'>
                <button
                    className = {this.state.companies ?
                        'btn toggleButtonLeft' : 'btn toggleButtonLeft toggleBtnSelected'}
                    onClick = {e => {
                        this.setState({
                            companies: false
                        });
                        Observable.setDataType('companies', false);
                        Observable.notify('tagsSelection');
                    }}
                >New comers</button>
                <button
                    className = {this.state.companies ?
                        'btn toggleButtonRight toggleBtnSelected' : 'btn toggleButtonRight'}
                    onClick = {e => {
                        this.setState({
                            companies: true
                        });
                        Observable.setDataType('companies', true);
                        Observable.notify('tagsSelection');
                    }}
                >Companies</button>
            </div>
        </div>;
    }
}