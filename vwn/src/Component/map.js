import React, { Component } from 'react';
import Observ from './obs';
import '../new_app.css';
const google = window.google;
export default class Map extends Component {
  constructor() {
    super();
    this.infoWindows = [];
    this.markers = [];
  }

  componentDidMount() {

    this.map = new google.maps.Map(this.mapDiv, {
      center: { lat: 52.0705, lng: 4.3007 },
      zoom: 7
    });

  }

  componentDidUpdate() {
    const map = this.map;
    this.markers.forEach((marker) => {
      marker.setMap(null);
    })
    this.markers = [];
    this.props.result.map((e) => {
      e.contacts.map((item) => {
        const marker = new google.maps.Marker({
          position: { lat: item.latitude, lng: item.longitude },
          map: this.map,
          id: item.id
        });
        this.markers.push(marker);
        marker.addListener('click', () => {
          console.log(item);
          Observ.notify(e.name);
          this.infoWindows.forEach((element) => {
            element.setMap(null);
          });

          this.infoWindows = [];
          const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${e.name}</h3>`
          });
          infoWindow.open(this.map, marker);
          this.infoWindows.push(infoWindow);
        });


      });
    });
    console.log(this.markers[1].id)
    const listItem = Observ.selectedListMarker;
    console.log(listItem);
    listItem.map((e) => {
      this.markers.forEach(element => {

        if (e === element.id) element.icon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      })
    })

  }
  render() {

    return (
      <div ref={text => this.mapDiv = text} className="googleMap"></div>
    )
  }
}