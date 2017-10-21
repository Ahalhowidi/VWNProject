import React, { Component } from 'react';
import Button from './Component/button'
import TagData from './Component/tagdata'
import CompList from './Component/complist'
import Map from './Component/map'
import Observ from './Component/obs'
import './new_app.css'


export default class App extends Component {

    state = {
        tags: [],
        tagSelected: [],
        result: [],
        ready: false
    };

    addTagToState = (index, tag) => {

        let tags = this.state.tags,
            tagSelected = this.state.tagSelected;

        tags[index].isActive = !tags[index].isActive;
        this.setState({ tags });

        let indexTag = tagSelected.indexOf(tag.id);
        tags[index].isActive ? tagSelected.push(tag.id+1) : tagSelected.splice(indexTag, 1);
        this.setState({ tagSelected })

    }

    addTags(newTags) {
        const tagArr = Object.values(newTags);
        let obj = {};
        let arr = [];
        tagArr.map((e, i) => {
            obj = {
                id: i ,
                name: e
            }
            arr.push(obj);
        });
        this.setState({
            tags: arr,
        })
    }

    addResult(result) {
        this.setState({
            result,
            ready: true
        })
    }

    render() {
        const head = this.state.tags.map((tag, index) => {
            return (
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
                            newOrg={(e) => this.addResult(e)}
                        />
                    </div>
                    <TagData
                        newTag={(e) => this.addTags(e)}
                    />
                </div>
                <div className='map'>
                    <Map
                        result={this.state.result}
                        ready={this.state.ready}
                    />
                    <div className="list">
                        <CompList list={Observ.all} tag={this.state.tags} />
                    </div>
                </div>
            </div>
        )
    }
}
