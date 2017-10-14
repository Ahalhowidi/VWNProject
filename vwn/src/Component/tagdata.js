import React,{Component} from 'react';

export default class TagData extends Component{

  
  componentDidMount(){
    const request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
          if (request.readyState !== 4) {
            return;
          }
          if (request.status === 200) {
            var parsedInfo = JSON.parse(request.response);
            this.props.newOrg(parsedInfo.orgs);
            this.props.newTag(parsedInfo.tags);
          } else {
            console.warn('errodr');
          }
        };       
        request.open('GET', 'http://localhost:8080/search', true);
        
        request.send();
   }

    render(){
               
        return(
            
            <div> </div>
        )
    }
}