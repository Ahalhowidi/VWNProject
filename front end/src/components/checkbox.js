import React from "react";
import CheckboxItem from "./checkbox_Item";

const Checkbox = (props) => {
//console.log(props.possibleFilters);
let checkboxes = props.possibleFilters.map(tag => <CheckboxItem key={tag.id} id={tag.id} name={tag.name} />);
if (! props){
    return (
      <div>
         loding.......
      </div>
    )
  }
  return (
    <div >
      {checkboxes}
    </div>
  );
};

export default Checkbox;