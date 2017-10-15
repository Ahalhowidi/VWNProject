import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

import Observable from './Observable';

const MyMapComponent = withScriptjs(withGoogleMap(({contacts, name, infoWindow, setInfoWindow}) =>
    <GoogleMap
        defaultZoom={7}
        defaultCenter={{ lat: 52.153406, lng: 5.292707 }}
    >
        {contacts.map(contact =>
            <Marker
                key = {contact.id}
                position = {{lat: contact.latitude, lng: contact.longitude}}
                title = 'Click for more details'
                onClick = {() => setInfoWindow(contact.id)}
            >
            {infoWindow[contact.id] && <InfoWindow><div>
                <strong>{name}</strong><br/>
                <strong>Post code:</strong> {contact.post_code} {contact.city}<br/>
                <strong>House number:</strong> {contact.house_number}
                    {contact.extension ? contact.extension : null}<br/>
                {contact.latitude}, {contact.longitude}
            </div></InfoWindow>}
            </Marker>
        )}
    </GoogleMap>
));


export default class Map extends Component {

    constructor() {
        super();
        this.state = {
            infoWindow : {}
        };
    }

    componentWillUnmount() {
        Observable.unsubscribe(this.showOnMap);
    }

    componentWillMount() {
        Observable.subscribe(this.showOnMap);
    }

    showOnMap = (action, {org, contactId}) => {
        if (action === 'showOnMap') {
            this.setState({
                selectedOrg: org,
                contactId: contactId,
                infoWindow: {}
            });
        }
    }

    setInfoWindow = (contactId) => {
        const infoWindow = {};
        infoWindow[contactId] = true;
        this.setState({
            selectedOrg: this.state.selectedOrg,
            contactId: this.state.contactId,
            infoWindow: infoWindow
        });
    }

    render() {
        let contacts = [];
        let name = '';
        if (this.state.selectedOrg) {
            name = this.state.selectedOrg.name;
            contacts = this.state.selectedOrg.contacts;
            const contactId = this.state.contactId;
            if (contactId) {
                for (let i in contacts) {
                    if (contacts[i].id === contactId) {
                        contacts = [contacts[i]]
                        break;
                    }
                }
            }
        }
        return <MyMapComponent
            googleMapURL = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement = {<div style={{ height: `100%` }} />}
            containerElement = {<div style={{ height: `100%` }} />}
            mapElement = {<div style={{ height: `100%` }} />}
            contacts = {contacts}
            name = {name}
            infoWindow = {this.state.infoWindow}
            setInfoWindow = {this.setInfoWindow}
        />;
    }
}