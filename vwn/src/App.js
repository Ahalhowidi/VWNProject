import React, { Component } from 'react';
import Button from './Component/button';
// import TagData from './Component/tagdata';
import CompList from './Component/complist';
import Map from './Component/map';
import Form from './Component/form'
import Observ from './Component/obs';
import './new_app.css';


export default class App extends Component {

    state = {
        tags: [],
        tagSelected: [],
        result: [],
        ready: false,
        type: 1
    };

    addAll(result) {
        const orgArr = Object.values(result);
        Observ.all = orgArr;
        Observ.ready = true;
        this.setState({ result: orgArr })
    }

    componentWillMount() {
        // document.documentElement.style.overflow = 'hidden';
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


    addTagToState = (index, tag) => {
        // this.setState({result:[]});
        let res = [];
        const tags = this.state.tags;
        const tagSelected = this.state.tagSelected;

        const tagsClass = document.querySelectorAll('.tag');
        for (let i = 0; i < tagsClass.length; i++) {
            tagsClass[i].classList.remove('tagAvail');
        }

        tags[index].isActive = !tags[index].isActive;
        this.setState({ tags });
        const indexTag = tagSelected.indexOf(tag.id + 1);
        tags[index].isActive ? tagSelected.push(tag.id + 1) : tagSelected.splice(indexTag, 1);
        this.setState({ tagSelected });
        ///////////////////////////////////////////
        Observ.all.map((e, ind) => {
            e.tags.map((item) => {
                tagSelected.forEach((element) => {
                    element === item ?
                        res.push(Observ.all[ind]) : console.log(false);
                });
            });
        });

        if (!res[0] && !tagSelected[0]) {
            res = Observ.all.slice(0)
        }
        this.setState({ result: res })
    }

    addTags(newTags) {
        const tagArr = Object.values(newTags);
        let obj = {};
        const arr = [];
        tagArr.map((e, i) => {
            obj = {
                id: i,
                name: e
            };
            arr.push(obj);
        });
        this.setState({
            tags: arr,
        });
    }

    // addResult(result) {
    //     this.setState({
    //         result,
    //         ready: true
    //     });
    //     console.log(result);
    // }

    setType(type) {
        // this.setState({ type });
        this.setState({type:type.target.id})
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
        if (Observ.ready) {

            return (
                <div>
                    <div className="haeder" id="top">
                        <h1>Newcommer Helper</h1>
                        <div className="tags">
                            {head}
                        </div>
                    </div>
                    <div>
                        <div className="bod">
                            <Button   
                                type={this.state.type}
                                setKind={(e) => this.setType(e)}
                            />
                        </div>

                    </div>
                    <div className='map'>
                        <Map
                            result={this.state.result}
                            ready={this.state.ready}
                        />
                        <div className="list">
                            <CompList result={this.state.result} tag={this.state.tags} type={this.state.type}/>
                        </div>
                    </div>
                    <div className="form">
                        <Form />
                    </div>
                </div>
            );
        } else return 'loading....'
    }
}
