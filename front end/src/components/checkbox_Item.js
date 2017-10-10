import React from "react";
import {observable,selectedFilters} from "../obs_store";

const CheckboxItem = (props) => {
    let checked = selectedFilters.get(props.id)
    console.log(Object.keys(selectedFilters.data));
    return (
        <div className="checkbox">
            <label>
                <input type="checkbox" checked={checked} onChange={() => selectedFilters
                .put(props.id, !checked)}/>
                {props.name}
                -  {checked ? 'checked' : ''}
            </label>
        </div>
    );
};
export default CheckboxItem;
