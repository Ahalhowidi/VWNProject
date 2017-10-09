import React from 'react';

import Observable from './Observable'

const TagsContainer = ({tags}) => {

    return <div>
        {Object.keys(tags).map(tagId => <button
            key = {tagId}
            onClick = {event => {
                event.target.classList.toggle('selected_tag');
                Observable.set('selectedTags', tagId, !Observable.get('selectedTags', tagId));
                Observable.notify('tagsSelection');
            }}
        >{tags[tagId]}</button>)}
    </div>;

};

export default TagsContainer;