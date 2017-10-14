import React,{Component} from 'react';

export default class Results extends Component{

  componentDidMount(){
    let comp = [];
    comp = this.props.results[1];
    console.log(comp);
  }
  
  render(){
    
    {this.comp}
    
    return(
      <div>{this.comp}</div>
    )
  }
}