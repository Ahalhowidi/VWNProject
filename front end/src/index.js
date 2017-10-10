import React, { Component } from "react";
import ReactDOM from "react-dom";
//import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
//import _ from "lodash";
import Checkbox from "./components/checkbox";
import Company from "./components/companies";
import {observable,selectedFilters} from "./obs_store";

const ROOT_URL = "http://localhost:3090";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {ready: false}
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
         possibleFilters: resTags.data,
         ready:true
      });
         
    }));
  
  }
  componentDidMount() {
    selectedFilters.subscribe((k,v) => {
      
          this.forceUpdate();
          
    })
  }
  render() {
    if (! this.state.ready){
          return (
            <h1>
               loding.......
            </h1>
          )
    };
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
  //});
    let myNdata = Object.keys(this.state.matchingCompanies).map(key => {
      return this.state.matchingCompanies[key];
      console.log(myNdata);
  })
    let renderCompanies = myNdata.map((e,i) => <Company company={e} key={i} />);
         console.log(myNdata);
    console.log(this.state.matchingCompanies);
     return (
          <div>
           
           <Checkbox possibleFilters = {this.state.possibleFilters} />
            {renderCompanies}
          </div>
    );     
  }
}
ReactDOM.render(<App />, document.querySelector(".container"));
