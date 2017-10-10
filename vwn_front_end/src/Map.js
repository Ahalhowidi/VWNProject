import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import Observable from './Observable';

const MyMapComponent = withScriptjs(withGoogleMap(props =>
    <GoogleMap
        defaultZoom={7}
        defaultCenter={{ lat: 52.153406, lng: 5.292707 }}
    >
        {props.isMarkerShown && props.markers.map((marker, index) =>
            <Marker
                key = {index}
                position = {{lat: marker.lat, lng: marker.lng}}
            />
        )}
    </GoogleMap>
));


export default class Map extends Component {

    constructor() {
        super();
        this.state = {};
    }

    componentWillUnmount() {
        Observable.unsubscribe(this.showOnMap);
    }

    componentWillMount() {
        Observable.subscribe(this.showOnMap);
    }

    showOnMap = (action, selectedOrgId) => {
        if (action === 'showOnMap') {
            this.setState({
                selectedOrgId: selectedOrgId
            });
        }
    }

    render() {
        let isMarkerShown = false;
        let markers = [];
        if (this.state.selectedOrgId) {
            const selectedOrg = this.props.matchingOrgs[this.state.selectedOrgId];
            isMarkerShown = true;
            markers = selectedOrg.contacts.map(contact => ({
                lat: contact.latitude,
                lng: contact.longitude,
            }))
        }
        return <MyMapComponent
            isMarkerShown = {isMarkerShown}
            googleMapURL = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement = {<div style={{ height: `100%` }} />}
            containerElement = {<div style={{ height: `500px` }} />}
            mapElement = {<div style={{ height: `100%` }} />}
            markers = {markers}
        />;
    }
}