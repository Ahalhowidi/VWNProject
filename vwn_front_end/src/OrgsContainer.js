import React, { Component } from 'react';

import Observable from './Observable';
import OrgDetails from './OrgDetails';

export default class OrgsContainer extends Component {

    constructor() {
        super();
        this.state = {
            matchingOrgs: []
        };
    }

    componentWillUnmount() {
        Observable.unsubscribe(this.renderOrgs);
    }

    componentWillMount() {
        Observable.subscribe(this.renderOrgs);
        Observable.notify('tagsSelection');
    }

    renderOrgs = (action, data) => {
        if (action === 'tagsSelection') {
            const matchingOrgs = [];
            const orgs = this.props.orgs;
            Object.keys(orgs).forEach(orgId => {
                let matchingOrg = {};
                const org = orgs[orgId];
                org.tags.forEach(tag => {
                    if (data.selectedTags) {
                        if (data.selectedTags[tag]) {
                            if (!matchingOrg.name) {
                                matchingOrg = JSON.parse(JSON.stringify(org));
                                matchingOrg.id = orgId;
                                matchingOrg.matchingTags = {};
                            }
                            matchingOrg.matchingTags[tag] = true;
                        }
                    }
                });
                if (matchingOrg.name) {
                    matchingOrgs.push(matchingOrg);
                }
            });
            this.setState({
                matchingOrgs: matchingOrgs
            });
        }
    }

    render() {
        return <div>
            <div>
                <h1>MAP</h1>
            </div>
            <div>
                {this.state.matchingOrgs.map(org =>
                    <OrgDetails key = {org.id} org = {org} tags = {this.props.tags} />
                )}
            </div>
        </div>;
    }
}