import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import _ from "lodash";
import TagsButtons from "./components/tags_buttons";
import Company from "./components/companies";
import {observable,selectedFilters} from "./obs_store";
import GoogleMap from "./components/google_map";
const ROOT_URL = "http://localhost:3090";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      er:""
    }
  }  
  fetchAllTags(){
    return axios.get(`${ROOT_URL}`)
  }
  fetchAllOrg(){
    return axios.get(`${ROOT_URL}/search`)
  }
  componentWillMount() {
    const self = this;
    axios.all([self.fetchAllTags(), self.fetchAllOrg()])
    .then(axios.spread(function (resTags, resOrg) {
      // Both requests are now complete
      self.setState({
         allCompanies: resOrg.data.orgs,
         matchingCompanies: resOrg.data.orgs,
         allTags: resTags.data,
         ready:true
      });
    }))
    .catch((error) => {
      // Error
      if (error.response) {
        self.setState({
          ready:true,
         er:`${error.response.status} `
        })
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //  console.log(error.response.data);
          //  console.log(error.response.status);
          //  console.log(error.response.headers);
      } else if (error.request) {
        self.setState({
          ready:true,
          er:`${error.request}`
         })
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          //console.log(error.request);
      } else {
        self.setState({
          ready:true,
          er:`${error.message}`
         })
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
      }
      console.log(error.config);
      
  });
}
  render() {
    if ( this.state.er.length!== 0 && this.state.ready ){
      return (
        <h1>
           Internal Server Error... {this.state.er}
        </h1>
      )
    }
    else if (! this.state.ready ){
          return (
            <h1>
               loding.......
            </h1>
          );
    }
    selectedFilters.subscribe((k,v) => {
      let raw = this.state.allCompanies;
      const matchingCompanies = Object.keys(raw)
      .filter(key => {for (let tag of raw[key].tags) {
        if (selectedFilters.get(tag))
          return true
      }
      return false } )
      .reduce((obj, key) => {
        obj[key] = raw[key];
        return obj;
      }, {});
      
      this.setState({
        matchingCompanies: matchingCompanies
      })
    })
    let myNdata = Object.keys(this.state.matchingCompanies).map(key => {
      return this.state.matchingCompanies[key];
  })
    let allTags = _.mapKeys(this.state.allTags,'id');
    let renderCompanies = myNdata.map((o,i) => <Company key={i} org={o}  allTags = {allTags}/>);
     return (
          <div className = 'app'>
              <div className = 'goomap '> <GoogleMap/> </div >
              <div className = ' tags'>  <TagsButtons allTags = {this.state.allTags} /> </div>
              <div className = 'companies'>     {renderCompanies}          </div>
          </div>
    ); 
  }    
}
ReactDOM.render(<App />, document.querySelector(".maimdiv"));
