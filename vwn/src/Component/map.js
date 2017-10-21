import React, { Component } from 'react';
import Observ from './obs'
import '../new_app.css'
const google = window.google;

export default class Map extends Component {
  componentDidMount() {
    let map = new google.maps.Map(this.refs.maps, {
      center: { lat: 52.0705, lng: 4.3007 },
      zoom: 7,
    });
    
    let showMark = (lat, lng) => {
      const pos = new google.maps.LatLng(lat, lng)
      
      return new google.maps.Marker({
        position: pos,
        map: map,
      })
    }
   Observ.subscribe(showMark)
  }
  render() {
    return (
      <div ref="maps" className="googleMap"></div>

    )
  }
}
