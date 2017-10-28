import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import '../new_app.css';
import Observ from './obs'
import CompList from './complist'

export default class Buttons extends Component {

    // newFilter = () => {
        
    //     let obj = [];
    //     Observ.all.map((e, ind) => {
    //         e.tags.map((e, i) => {
    //             e === this.props.tagSelected[i] ?
    //                 obj.push(Observ.all[ind]) : console.log(false);
    //         })
    //     })
    //     this.props.newOrg(obj)
    //    Observ.all=obj;
       

    // }

   


    render() {
        return (
            <div className='top'>
                <div className="bod">
                    <div>
                        <button
                            className="but"
                            onClick={this.newFilter}>
                            New Commers
                        </button>
                    </div>
                    <div>
                        <button  
                            className='but'
                        >
                        Provider</button>
                    </div>
                </div>
            </div>
        )
    }
}