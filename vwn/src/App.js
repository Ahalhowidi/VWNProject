import React, { Component } from 'react';
import Button from './Component/button';
// import TagData from './Component/tagdata';
import CompList from './Component/complist';
import Map from './Component/map';
import Observ from './Component/obs';
import './new_app.css';


export default class App extends Component {

    state = {
        tags: [],
        tagSelected: [],
        result: [],
        ready: false,
        type: 0
    };

    addAll(result) {
        const orgArr = Object.values(result);
        Observ.all = orgArr;
        Observ.ready = true;
        this.setState({result: orgArr})
    
    
      }
    
      componentWillMount() {
        const request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
          if (request.readyState !== 4) {
    
            return;
          }
          if (request.status === 200) {
            const parsedInfo = JSON.parse(request.response);
            this.addAll(parsedInfo.orgs);
            // this.props.newOrg(parsedInfo.orgs);
            this.addTags(parsedInfo.tags);
          } else {
            console.warn('Error');
          }
        };
        request.open('GET', 'http://localhost:8080/search', true);
        // request.open('GET', 'http://www.taalmap.nl:3008/search', true);
        // request.open('GET', 'http://52.10.252.171:3008/search', true);
    
        request.send();
      }

    
    // componentWillMount(){
    //     this.setState({result: Observ.all});
    // }
    addTagToState = (index, tag) => {
        this.setState({result:[]});
        const res = [];
        const tags = this.state.tags,
            tagSelected = this.state.tagSelected;

        tags[index].isActive = !tags[index].isActive;
        this.setState({ tags });
        const indexTag = tagSelected.indexOf(tag.id);

        
        tags[index].isActive ? tagSelected.push(tag.id+1) : tagSelected.splice(indexTag, 1);
        // console.log(indexTag, tagSelected, tag.id)
        this.setState({ tagSelected });
        ///////////////////////////////////////////
        Observ.all.map((e, ind) => {
            e.tags.map((item) => {
                 this.state.tagSelected.forEach((element)=>{
                     element === item ?
                     res.push(Observ.all[ind]) : console.log(false);
                    });
                 }); 
            });
        
        // this.addResult(obj)
        // Observ.result=obj;
        this.setState({result: res})
        }

    addTags(newTags) {
        const tagArr = Object.values(newTags);
        let obj = {};
        const arr = [];
        tagArr.map((e, i) => {
            obj = {
                id: i ,
                name: e
            };
            arr.push(obj);
        });
        this.setState({
            tags: arr,
        });
    }

    addResult(result) {

        this.setState({
            result,
            ready: true
        });
        console.log(result);
    }

    setType(type){
        this.setState({type});
    }

    render() {
        const head = this.state.tags.map((tag, index) => {
            return (
                <h5
                    key={tag.id}
                    className={`tag ${tag.isActive ? 'grow' : 'shrink'}`}
                    onClick={() => this.addTagToState(index, tag)}
                    id={index}>
                    {tag.name}
                </h5>);
        });
        if(Observ.ready){

        return (
            <div>
                <div className="haeder">
                    <h1>Welcome to VWN website</h1>
                    <div className="tags">
                        {head}
                    </div>
                </div>
                <div>
                    <div className="bod">
                        <Button
                            tagSelected={this.state.tagSelected}
                            result={this.state.result}
                            type = {this.state.type}
                            setType ={(e)=>this.setType(e)}
                            newOrg={(e) => this.addResult(e)}
                        />
                    </div>
                    {/* <TagData
                        newTag={(e) => this.addTags(e)}
                    /> */}
                </div>
                <div className='map'>
                    <Map
                        result={this.state.result}
                        ready={this.state.ready}
                    />
                    <div className="list">
                        <CompList result={this.state.result} tag={this.state.tags} />
                    </div>
                </div>
            </div>
        );
    }else return 'loading....'
    }
}
