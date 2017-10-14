import React from "react";
import ButtonItem from "./tag_button";
import {observable,selectedFilters} from "../obs_store";
const TagsButtons = (props) => {
  let buttonItem = props.allTags.map(tag =>
     <ButtonItem key={tag.id} id={tag.id} name={tag.name} />);
  return (
    <div className = "btn-group btn-group-lg center-block">
      {buttonItem}
    </div>
  );
};
export default TagsButtons;
