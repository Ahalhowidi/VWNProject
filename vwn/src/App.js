import React, { Component } from 'react';
import Button from './Component/button'
import TagData from './Component/tagdata'
// import Results from './Component/results'
import Map from './Component/map'
import './new_app.css'


export default class App extends Component {
    
     state = {
        tags: [],
        tagSelected: [],
        result:[]
    };

    addTagToState = (index, tag) => {
        
        let tags = this.state.tags,
            tagSelected = this.state.tagSelected ;
            
        tags[index].isActive = !tags[index].isActive;
        this.setState({tags});

        let indexTag = tagSelected.indexOf(tag.id);
        tags[index].isActive ? tagSelected.push(tag.id) : tagSelected.splice(indexTag, 1);
        this.setState({tagSelected})
        
    }
    
    addTags(newTags){   
        const tagArr = Object.values(newTags); 
        let obj={}; 
        let arr=[];
        tagArr.map((e,i)=>{
            obj = {
                id: i+1,
                name: e
            }
            arr.push(obj);
        });
        this.setState({
            tags: arr
        })
    }

    addResult(result){
        const tagArr = Object.values(result); 
        let obj={}; 
        let arr=[];
        tagArr.map((e,i)=>{
            obj = {
                id: i+1,
                name: e
            }
            arr.push(obj);
        });
        this.setState({
            result:arr
        })
    }
    
    render() {
        const head = this.state.tags.map((tag, index) => {
            return(
        <h2 
                key={tag.id}
                className={`tag ${tag.isActive ? 'grow' : 'shrink'}`}
                onClick={() => this.addTagToState(index, tag)}
                id={index}>
                    {tag.name} 
            </h2>)
        })
        
        
        return (
            <div>
                <div className="title">
                    {head}
                </div>
                <div>
                    <div className="bod">
                       <Button 
                            selectedTag={this.state.tagSelected} 
                            newState={(e)=>this.addResult(e)}
                        />
                    </div>
                        <TagData 
                                newOrg={(e)=>this.addResult(e)} 
                                newTag={(e)=>this.addTags(e)} 
                        />
                    
                </div>
                
                <div className='map'>
                    <Map result={this.state}/>
                </div>
            </div>
        )
    }
}
