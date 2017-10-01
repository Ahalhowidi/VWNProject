import React, { Component } from 'react';
import './App.css';
import Button from './Component/button'
import Filters from './Component/filter'
import TagData from './Component/tagdata'

class App extends Component {
  constructor() {
    super();
    this.state = { 
      tags : []

     };
    // this.onSubmit = this.handleSubmit.bind(this);
  }

addtag(tags){

  this.setState({
    tags
  })

}

  render() {
    return (
      <div className="App">
        <Button />
        <TagData tagState={this.state.tags} newTag={(e)=>this.addtag(e)}/>
        <Filters tags={this.state.tags} />
      </div>
    );
  }
}

export default App;
