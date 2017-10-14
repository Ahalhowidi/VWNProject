import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
export default class Map extends Component {
  static defaultProps = {
    center: {lat: 52.0907, lng: 5.1214},
    zoom: 7
  };
 
  render() {
    
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={51.441642}
          lng={5.469722}
          text={'Kreyser Avrora'}
        />
      </GoogleMapReact>
    );
  }
}
