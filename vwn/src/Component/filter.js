import React,{Component} from 'react';
import '../App.css';


export default class Filter extends Component {



    tagBox(){  
           
        return(
            this.props.tags.map((tag)=>{
                return(
                    <div>
                        <input type="checkbox" key={tag.id} className="chBox" name="tag" vale={tag.name}/>{tag.name}
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div>
                <form >
                    {this.tagBox()}
                </form>
            </div>
        );
     }
}