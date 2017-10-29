import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import '../new_app.css';
import Observ from './obs'
import CompList from './complist'

export default class Form extends Component {

    render() {
        
        return (
            <div className='top'>
                <form className="bod">
                    <div>
                        <button
                            className="but"
                            id='1'
                            onClick={this.props.setKind}> 
                            I'm Newcommer
                        </button>
                    </div>
                    <div>
                        <button
                            className='but'
                            id='2'
                            onClick={this.props.setKind}>
                            I'm Provider
                            </button>
                    </div>
                    <div>
                        <button>I'm New Provider</button>
                    </div>
                </form>
            </div>
        )
    }
}