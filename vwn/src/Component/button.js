import React,{Component} from 'react';
// import ReactDOM from 'react-dom';
import '../App.css';

export default class Buttons extends Component{
    render(){
        return(
       
            <div className='top'>
                <h1>Welcome to VWN website</h1>
                    <div className="bot">
                        <div>
                            <button type="button">New Commers</button>
                        </div>
                        <div>
                            <button>Providers</button>
                        </div>
                </div>
            </div>
        )
    }
}