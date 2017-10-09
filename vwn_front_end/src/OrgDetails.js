import React from 'react';

import Observable from './Observable'

const OrgDetails = ({org, tags}) => {
    return <div>
        <h1>{org.name}</h1>
        <div>
            {org.tags.map(tag => <span
                key = {tag}
                className = {org.matchingTags[tag] ? 'focused' : 'normal'}
            >{tags[tag]}</span>)}
        </div>
        {}
        <h2>Description for persons:</h2>
        <p>{org.description_person}</p>
        <h2>Description for companies:</h2>
        <p>{org.description_company}</p>
        <h2>Contact details:</h2>
        <div>
            {org.contacts.map(contact => <div key = {contact.id}>
                <strong>Phone:</strong> {contact.phone}<br/>
                <strong>Email:</strong> <a href = {`mailto:${contact.email}`}>{contact.email}</a><br/>
                <strong>Website:</strong> <a href = {contact.web}>{contact.web}</a><br/>
                <strong>Post code:</strong> {contact.post_code} {contact.city}<br/>
                <strong>Hous number:</strong> {contact.hous_number}
                    {contact.extension ? contact.extension : null}<br/>

            </div>)}
        </div>
    </div>;

};

export default OrgDetails;