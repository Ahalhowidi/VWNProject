import React from "react";
import {observable,selectedFilters} from "../obs_store";
const ButtonItem = (props) => {
    let checked = selectedFilters.get(props.id)
    return (

          <button 
                className = {selectedFilters.get(props.id) ? 'btn btn-primary active' : 'btn btn-info'}
                key = {props.id}
                onClick = {(e) => {
                    selectedFilters.put(props.id, !checked);
                }} >
                {props.name}
            </button>
    );
};
export default ButtonItem;
