import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Observable from './Observable';

const selectedTags = new Observable();
const serverLink = 'http://localhost:8080/';
const results = {
    tags: [],
    orgs: []
};
const xhr = new XMLHttpRequest;

export default class App extends Component {

    componentDidMount() {
        xhr.open('Get', `${serverLink}search/tags`, true);
        xhr.onreadystatechange = () => {
            if ( xhr.readyState === 4 ) {
                results.tags = JSON.parse(xhr.response);
                xhr.open('Get', `${serverLink}search/orgs`, true);
                xhr.onreadystatechange = () => {
                    if ( xhr.readyState === 4 ) {
                        results.orgs = JSON.parse(xhr.response);
                        selectedTags.subscribe((k,v) => {
                            this.forceUpdate();
                        });
                        this.forceUpdate();
                    }
                }
                xhr.send();
            }
        }
        xhr.send();
    }

    page1() {
        return <div>
            <Link to={`/search`}><button>Newcomers</button></Link>
            <button>Companies</button>
        </div>;
    }

    page2() {
        const matchingOrgsIds = Object.keys(results.orgs).filter(orgId => {
            let tagIds = results.orgs[orgId].tags;
            for (let tagId of tagIds) {
                if (selectedTags.get(tagId)) {
                    return true;
                }
            }
            return false;
        });
        return <main>
            <ul>
                {matchingOrgsIds.map(orgId => <li
                    key = {orgId}
                >{results.orgs[orgId].name}</li>)}
            </ul>
            <section></section>
        </main>;
    }

    render() {
        return (
            <Router>
                <div>
                    <div>
                        {results.tags.map(tag => <label key = {tag.id}>
                            <input
                                type = 'checkbox'
                                onChange = {event => {
                                    selectedTags.set(tag.id, event.target.checked);
                                }}
                            />
                            {tag.name}
                        </label>)}
                    </div>
                    <Route exact path = '/' component = {this.page1}/>
                    <Route path = '/search' component = {this.page2}/>
                </div>
            </Router>
        );
    }
}

