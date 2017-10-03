import React,{Component} from 'react';
// import ReactDOM from 'react-dom';
import '../new_app.css';

export default class Buttons extends Component{
    render(){
        return(
       
            <div className='top'>
                <h1>Welcome to VWN website</h1>
                    <div className="bod">
                    <div>
                            <button >New Commers</button>
                        </div>
                        <div>
                            <button >Provider</button>
                        </div>
                </div>
            </div>
        )
    }
}