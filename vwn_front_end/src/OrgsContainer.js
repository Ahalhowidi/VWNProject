import React, { Component } from 'react';

import Observable from './Observable';
import OrgDetails from './OrgDetails';
import Map from './Map';

export default class OrgsContainer extends Component {

    constructor() {
        super();
        this.state = {
            matchingOrgs: {}
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
            const matchingOrgs = {};
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
                    matchingOrgs[orgId] = matchingOrg;
                }
            });
            this.setState({
                matchingOrgs: matchingOrgs
            });
        }
    }

    render() {
        const tags = this.props.tags;
        const matchingOrgs = this.state.matchingOrgs;
        return <div>
            <Map matchingOrgs = {matchingOrgs} />
            <div>
                {Object.keys(matchingOrgs).map(orgId =>
                    <OrgDetails key = {orgId} org = {matchingOrgs[orgId]} tags = {tags} />
                )}
            </div>
        </div>;
    }
}