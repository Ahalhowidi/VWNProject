import React, { Component } from "react";
import {selectedOrg,selectedcoords,selectedFilters} from "../obs_store";
let map;
let markers = [];
class GoogleMap extends Component {
  componentWillMount(){
    selectedcoords.subscribe((k,v) => {
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {  
          markers[i].setMap(map);
        }
      }
      function clearMarkers() {
        setMapOnAll(null);
      }
      function deleteMarkers() {
        clearMarkers();
       // markers = [];
      }  

      deleteMarkers();
  });
    selectedFilters.subscribe((k,v) => {
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {  
          markers[i].setMap(map);
        }
      }
      function clearMarkers() {
        setMapOnAll(null);
      }
      function deleteMarkers() {
        clearMarkers();
      }  
     deleteMarkers();  
    });
  }
  componentDidMount() {
    map = new google.maps.Map(this.refs.map, {
      zoom: 6,
      center: {
          lat:52.0905, 
          lng: 5.11974
      }
    });
    selectedcoords.subscribe((k,v) => {
      
      selectedcoords.get('coords');
      for(let i=0; i<selectedcoords.get('coords').length ;i++){
          addMarker(selectedcoords.get('coords')[i],selectedOrg.get('oneOrg'));
      }
      function addMarker(coord,org){
        let marker = new google.maps.Marker({
          position:coord,
          map:map,
        })
        markers.push(marker);
        let info =`<h2>${org.name}</h2><br/> <h3>${org.description_company}</h3>`
        if(org.name){
          let infoWindow = new google.maps.InfoWindow({
              content:info
          });
          marker.addListener('click', function(){
            infoWindow.open(map, marker);
          });
        }
      }
    });
  }
  render() {
      return <div  className = 'sizmap center-block' ref="map"/>;
  }
}
export default GoogleMap;
