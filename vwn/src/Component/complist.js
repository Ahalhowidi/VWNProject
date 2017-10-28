import React, { Component } from 'react';
import '../new_app.css';
import Observ from './obs';

export default class CompList extends Component {

selectlist=(id)=>{
    console.log(id)
}
    componentWillMount() {
        Observ.subscribe(this.selectlist)
    }

    componentWillUnmount(){
        Observ.unsubscribe(this.selectlist)
    }
    

    moreList(item, x) {
        
        x.target.lastChild.classList.toggle('more')
        const tagsClass = document.querySelectorAll('.tag');
        for (let i = 0; i < tagsClass.length; i++) {
            tagsClass[i].classList.remove('tagAvail');
        }
        item.tags.map((e) => {
            tagsClass[e - 1].classList.add('tagAvail')
        });
        // Observ.selectedListMarker =[];
        // item.contacts.map((e)=>{
        //     Observ.selectedListMarker.push(e.id)
        // })
        //  console.log(Observ.selectedListMarker)

    }

    list() {
        let listItem;
            listItem = this.props.result.map((e, i) => {
                return (
                    <div
                        className="orgItem"
                        onClick={(e) => this.moreList(this.props.result[i], e)}
                        key={i}>
                        <div className="listTitle">
                            <h4>{e.name}<img className='logo' src={e.logo}/></h4>                         
                            <div className="desc">
                                <p>{e.tags}{e.description_company}</p>
                                <p>Phone: {e.contacts[0].phone}</p>
                                <p>{e.contacts[0].email}</p>
                                <a href={e.contacts[0].web} target="_blank">{e.contacts[0].web}</a>
                            </div>
                        </div>
                    </div>
                );
            });
            return listItem;
        } 
    


    render() {

        return (
            <div className='orgList'>
                {this.list()}
            </div>

        )
    }
}