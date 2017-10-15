import React from 'react';

import Observable from './Observable'

const OrgDetails = ({org, tags, companies}) => {
    return <div className = 'orgDetails'>
        <h1 className = 'orgName'>{org.name}</h1><hr/>
        <div className = 'tagsConntainer'>
            {org.tags.map(tag => <span
                key = {tag}
                className = {org.matchingTags[tag] ? `tag tag${tag % 20} tagSelected` : `tag tag${tag % 20}`}
            >{tags[tag]}</span>)}
        </div>
        <h2 className = 'orgHD'>Description:</h2>
        <p>{companies ? org.description_company : org.description_person}</p>
        <h2 className = 'orgHC'>Contact details:</h2>
        <button
            className = 'btnSmall btnSmallAll'
            onClick = {event => {
                Observable.notify('showOnMap', {org: org, contactId: false});
            }}
        >Show on map</button>
        <div className = 'contactDetails'>
            {org.contacts.map(contact => <div key = {contact.id}>
                <strong>Phone:</strong> {contact.phone}<br/>
                <strong>Email:</strong> <a href = {`mailto:${contact.email}`}>{contact.email}</a><br/>
                <strong>Website:</strong> <a href = {contact.web} target = '_blank'>{contact.web}</a><br/>
                <strong>City:</strong> {contact.city}
                <button
                    className = 'btnSmall'
                    onClick = {event => {
                        Observable.notify('showOnMap', {org: org, contactId: contact.id});
                    }}
                >Show on map</button>
                <hr/>
            </div>)}
        </div>
    </div>;

};

export default OrgDetails;