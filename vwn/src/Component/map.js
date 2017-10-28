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
      zoom: 6
    });
    
  }

  componentDidUpdate() {
    const map = this.map;
    this.markers.forEach((marker)=>{
      marker.setMap(null);
    })
    this.markers = [];
    this.props.result.map((e) => {
      e.contacts.map((item) => {
        const marker = new google.maps.Marker({
          position: { lat: item.latitude, lng: item.longitude },
          map: this.map
        });
        this.markers.push(marker);
        marker.addListener('click', () => {
          console.log(item);
          Observ.notify(item.id);
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

    //     if(e === element.id) element.icon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    //   })
    // })
    // console.log(markers)
  }
  render() {

    return (
      <div ref={text => this.mapDiv = text} className="googleMap"></div>
    )
  }
}