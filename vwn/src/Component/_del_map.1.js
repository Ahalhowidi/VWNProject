import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import Observ from './obs'
import '../new_app.css'
 
const AnyReactComponent = ({ text }) => 
<div className='bulb'>
  <h3>{text}</h3>
</div>;
 
export default class Map extends Component {
  static defaultProps = {
    center: {lat: 52.0705, lng: 4.3007},
    zoom: 7
  };

showdata(){
  this.props.result ? 
    this.props.result.map((e, i)=>{
      console.log(e)
    }) : console.log(false)
}
componentDidmount(){
  let lat, long;
  this.props.result.map((e, i)=>{
    e.contacts.map((e, i)=>{
      lat= e.latitude;
      long = e.longitude;
    })
  })
}
 
  render() {
    // let t= 52.0907;
    // let g= 5.1214;
    // let lat;
    // let long;
    // if(this.props.ready){ 
    //   console.log(this.props.result[1].contacts[1].latitude)
    //   lat= this.props.result[1].contacts[1].latitude;
    //   long = this.props.result[1].contacts[1].longitude;
    // }
    return (
      <GoogleMap
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={this.lat}
          lng={this.long}
          text={'George'}
        />
        {/* <AnyReactComponent
          lat={t}
          lng={g}
          text={'Kreyser Avrora'}
        /> */}
        {/* <AnyReactComponent
          lat={t}
          lng={g+1}
          text={'Kreyser Avrora'}
        /> */}
      </GoogleMap>
    );
  }
}
