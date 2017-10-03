import React, { Component } from 'react';
import './new_app.css'
import Button from './Component/button'

export default class App extends Component {
    state = {
        tags: [
            { id: 1, name: 'Account', isActive:false },
            { id: 2, name: 'Art' },
            { id: 3, name: 'ICT' },
            { id: 4, name: 'Computer' },
            { id: 5, name: 'Trade' },
            { id: 6, name: 'Music' },
            { id: 7, name: 'Sport' },
            { id: 8, name: 'Eat' },
            { id: 9, name: 'Politic' },
            
            
        ],
        tagSelected:[]
    };


    componentDidMount() {
        
        // var tag =  document.querySelectorAll(".tag");
        // tag.forEach((tag)=> {
        //     tag.addEventListener("click", this.style);
        // });
    }

     

    style(){
        
        var selectedId =[];
        var tag = this.classList;
         if (tag.contains('grow')){
             tag.remove('grow');
             tag.add('shrink');
             ///////
        }else{
            if (tag.contains('shrink')){
                tag.remove('shrink');
            } 
            tag.add('grow');  
            // this.setState({
            //     selectedId: selectedId.push(tag.id)
            // })
            // console.log(this.state.selectedId);       
        }
    }

     test(x){
         console.log(x);
     }


    render() {
        var head = this.state.tags.map((tag, index) => 
            <h1 key={index} className={`tag ${tag.isActive ? 'grow' : ''}`} onClick={()=>{
                this.setState({ })
            }} id={tag.id}>{tag.name} </h1>)

        return (
            <div>
                <div className="title">
                    {head}
                </div>
                <div className=''>
                    <div className="bod">
                       <Button />
                    </div>
                </div>
            </div>
        )
    }
}