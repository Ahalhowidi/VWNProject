import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

const f =2;
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: {},
            wait: true
        };
    }
    
    page1 = () => {
        if (this.state.wait) {
            const xhr = new XMLHttpRequest;
            xhr.open('Get', 'http://localhost:8080/tags', true);
            xhr.onreadystatechange = () => {
                if ( xhr.readyState === 4 ) {
                    const tag_names = JSON.parse(xhr.response).tag_names;
                    const tags = {};
                    for (let i=0 ; i<Object.keys(tag_names).length ; i++) {
                        tags[Object.keys(tag_names)[i]] = {};
                        tags[Object.keys(tag_names)[i]].name = tag_names[Object.keys(tag_names)[i]];
                        tags[Object.keys(tag_names)[i]].checked = false;
                    }
                    this.setState({
                        wait: false,
                        tags: tags
                    });
                }
            }
            xhr.send();
            const spinnerStyle = {
                width : Math.min(window.innerWidth, window.innerHeight) / 2,
                height: Math.min(window.innerWidth, window.innerHeight) / 2
            };
            return (
                <div className = {'spinner'} style = {spinnerStyle}/>
            );
        }
        else {
            return (
                <div>
                    <div>
                        <button onClick = {event => {
                            <Redirect push to = '/search' />;
                        }}>Newcomers</button>
                        <Link to={`/search`}><button onClick = {event => {
                            this.setState({
                                wait: true,
                                tags: this.state.tags
                            });
                        }}>
                            Companies
                        </button></Link>
                    </div>
                    <div>
                        {Object.keys(this.state.tags).map(id => {
                            return (
                                <div key = {id} className = 'checkContainer'>
                                    <input
                                        type = 'checkbox'
                                        checked = {this.state.tags[id].checked}
                                        onChange = {event => {
                                            const tags = JSON.parse(JSON.stringify(this.state.tags));
                                            tags[id].checked = event.target.checked;
                                            this.setState({
                                                wait: this.state.wait,
                                                tags: tags
                                            });
                                        }}
                                    /><span>{this.state.tags[id].name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
    }

    page2 = () => {
        let i;
        if(Object.keys(this.state.tags).length === 0) {
            return <Redirect push to = '/' />;
        }
        else if (this.state.wait) {
            let searchTags = '';
            Object.keys(this.state.tags).forEach(id => {
                if (this.state.tags[id].checked) {
                    searchTags += `tag=${id}&`;
                }
            });
            if (searchTags.length === 0) {
                Object.keys(this.state.tags).forEach(id => {
                    searchTags += `tag=${id}&`;
                });
            }
            searchTags = searchTags.slice(0, -1);
            const xhr = new XMLHttpRequest;
            xhr.open('Get', 'http://localhost:8080/search?' + searchTags, true);
            xhr.onreadystatechange = () => {
                if ( xhr.readyState === 4 ) {
                    const response = JSON.parse(xhr.response);
                    const tag_names = response.tag_names;
                    const tags = {};
                    for (i=0 ; i<Object.keys(tag_names).length ; i++) {
                        tags[Object.keys(tag_names)[i]] = {};
                        tags[Object.keys(tag_names)[i]].name = tag_names[Object.keys(tag_names)[i]];
                        tags[Object.keys(tag_names)[i]].checked =
                            this.state.tags[Object.keys(tag_names)[i]].checked || false;
                    }
                    this.setState({
                        wait: false,
                        tags: tags,
                        all_orgs: response.all_orgs,
                        matching_orgs: response.matching_orgs,
                        orgs: response.org_results
                    });
                    console.log(this.state);
                }
            }
            xhr.send();
            const spinnerStyle = {
                width : Math.min(window.innerWidth, window.innerHeight) / 2,
                height: Math.min(window.innerWidth, window.innerHeight) / 2
            };
            return (
                <div className = {'spinner'} style = {spinnerStyle}/>
            );
        }
        else {
            return (
                <div>
                    <header>
                        {Object.keys(this.state.tags).map(id => {
                            return (
                                <div key = {id} className = 'checkContainer'>
                                    <input
                                        type = 'checkbox'
                                        checked = {this.state.tags[id].checked}
                                        onChange = {event => {
                                            const tags = JSON.parse(JSON.stringify(this.state.tags));
                                            tags[id].checked = event.target.checked;
                                            this.setState({
                                                wait: this.state.wait,
                                                tags: tags,
                                                all_orgs: this.state.all_orgs,
                                                matching_orgs: this.state.matching_orgs,
                                                orgs: this.state.orgs
                                            });
                                        }}
                                    /><span>{this.state.tags[id].name}</span>
                                </div>
                            );
                        })}
                    </header>
                    <main>
                        <ul>
                            {Object.keys(this.state.orgs).map(id => {
                                let isNotExist = true;
                                return (this.state.orgs[id].all_tags.map(tagId => {
                                    if (this.state.tags[tagId].checked && isNotExist) {
                                        isNotExist = false;
                                        return (
                                            <li
                                                onClick = {event => {
                                                    this.setState({
                                                        wait: this.state.wait,
                                                        tags: this.state.tags,
                                                        all_orgs: this.state.all_orgs,
                                                        matching_orgs: this.state.matching_orgs,
                                                        orgs: this.state.orgs,
                                                        selected_org_id: id
                                                    });
                                                }}
                                            >{this.state.orgs[id].name}</li>
                                        );
                                    }
                                }));
                            })}
                        </ul>
                        <section>
                            {JSON.stringify(this.state.orgs[this.state.selected_org_id])}
                        </section>
                    </main>
                </div>
            );
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path = '/' component = {this.page1}/>
                    <Route path = '/search' component = {this.page2}/>
                </div>
            </Router>
        );
    }
}

