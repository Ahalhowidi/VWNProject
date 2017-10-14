import React from "react";
import {observable,selectedFilters,selectedOrg,selectedcoords} from "../obs_store";
const Company = ({org, allTags,key}) => {
    return (
      <div >
        <h2 className ="text-danger"> Company name: {org.name}</h2>
        <button className = 'btn btn-success active' 
                onClick = {() => {
                    selectedOrg.put('oneOrg',org)
                    let coords = [];
                    selectedOrg.get('oneOrg').contacts.map(contact =>{
                    let coord ={lat: contact.latitude, lng: contact.longitude}
                     coords.push(coord)
                    });
                    selectedcoords.put('coords', coords);
                }} >
        >>Show on map</button >
        <div className = 'mar' >
            <p className ="lead text-warning" >Company Initiatives:</p>
                {org.tags.map((o,i) =>
                    <div key = {i} >
                      <span  className = {selectedFilters.get(o) ? 'label label-primary': null }>
                           {allTags[o].name}
                      </span>
                    </div>)}
        </div>
        <p className ="lead text-warning">Description for persons:</p>
        <p className ="text-info">{org.description_person}</p>
        <p className ="lead text-warning">Description for companies:</p>
        <p className ="text-info">{org.description_company}</p>
        <p className ="lead text-warning">Contact details:</p>
        <div>
            {org.contacts.map((cont,i) => <div key = {i}>
                <h5 className ="text-success ">Phone:</h5> {cont.phone}<br/>
                <h5 className ="text-success">Email:</h5> <a href = {`mailto:${cont.email}`}>{cont.email}</a><br/>
                <h5 className ="text-success">Website:</h5> <a target ='_blank' href = {cont.web}>{cont.web}</a><br/>
                <h5 className ="text-success">Post code:</h5> {cont.post_code} {cont.city}<br/>
                <h5 className ="text-success">House number:</h5> {cont.house_number}
                    {cont.extra ? cont.extra : null}<br/>

            </div>)}
        </div>
      </div>
      );
};
export default Company;