import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import '../new_app.css';

export default class Buttons extends Component {
    
    newRequest = () => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                var parsedInfo = JSON.parse(request.response);
               
                 this.props.newState(parsedInfo);
            } else {
                console.warn('errodr');
            }
        };
        const searchTags = this.props.selectedTag;
        
        let x = 'search?';
        searchTags.map((tag, index) =>
            x += `tag=${tag}&`
        )
        

        request.open('GET', `http://localhost:8080/${x}`, true);
        request.send();
    }



    render() {
        
        return (

            <div className='top'>
                <h1>Welcome to VWN website</h1>
                <div className="bod">
                    <div>
                            
                        <button
                            onClick={this.newRequest}>
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