import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import '../new_app.css';
import Observ from './obs'

export default class Buttons extends Component {
    
    newFilter = () => {
        console.log(this.props)
        let obj =[];
        Observ.all.map((e, ind)=>{
            e.name.tags.map((e,i)=>{
                e === this.props.tagSelected[i] ? 
                   obj.push(Observ.all[ind].name) : console.log(false);
            })
        }
    )
    console.log(obj)
    this.props.newOrg(obj)
       }



    render() {
        
        return (

            <div className='top'>
                <h1>Welcome to VWN website</h1>
                <div className="bod">
                    <div>
                            
                        <button
                            onClick={this.newFilter}>
                                New Commers
                        </button>
                            
                    </div>
                    <div>
                        <button  >Provider</button>
                        
                    </div>
                </div>
            </div>
        )
    }
}