import React,{Component} from 'react';
import Observ from './obs';


export default class TagData extends Component{

  addAll(result){
    const orgArr = Object.values(result); 
    // let obj={}; 
    // let arr=[];
    // tagArr.map((e,i)=>{
    //     obj = {
    //         name: e
    //     }
    //     arr.push(obj);
    // });
    Observ.all= orgArr
}
  
  componentWillMount(){
    const request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        var parsedInfo = JSON.parse(request.response);
        this.addAll(parsedInfo.orgs);
        // this.props.newOrg(parsedInfo.orgs);
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