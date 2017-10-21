import React, { Component } from 'react';
import '../new_app.css';
import Observ from './obs'

export default class CompList extends Component {


    componentWillMount() {
        Observ.all.map((e, i) => {
            e.contacts.map((item, index) => {
                console.log(item.latitude, item.longitude)
                Observ.notify(item.latitude, item.longitude)
            })
        })
    }

    moreList(item) {
        const tagsClass = document.querySelectorAll('.tag');
        for (let i = 0; i < tagsClass.length; i++) {
            tagsClass[i].classList.remove('tagAvail');
        }
        item.tags.map((e, i) => {
            tagsClass[e - 1].classList.add('tagAvail')
        })
        item.contacts.map((e, i) => {
            Observ.notify(e.latitude, e.longitude)
        })
    }

    render() {
        let list;
        if (Observ.all[1]) {
            list = Observ.all.map((e, i) => {
                e.contacts.map((item, index) => {
                    Observ.notify(item.latitude, item.longitude)
                })
                return (
                    <div className="orgItem" key={i} onClick={(e) => this.moreList(Observ.all[i])}>
                        <h3>{e.name}</h3>
                    </div>)
            })
        } else return (
            list = <div className="orgItem" >
                <h3>Loadding...</h3>
            </div>)
        return (
            <div className='orgList'>
                <h3 className="listItem">{list}</h3>
            </div>
        )
    }
}