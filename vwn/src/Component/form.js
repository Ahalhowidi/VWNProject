import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// import Observable from './Observable';

import '../Add.css';

export default class Form extends Component {

    // static propTypes = {
    //     tags: PropTypes.object.isRequired,
    //     serverLink: PropTypes.string.isRequired
    // };

    constructor() {
        super();
        // Observable.notify('markSelectedBarItem', 1);
        this.canSubmit = true;
        this.data = {
            name: '', logo: '', tags: {}, descriptionCompanies: '', descriptionPersons: '',
            contact1: { phone: '', house: '', code: '', city: '', email: '', web: '', lon: '', lat: '' },
            contact2: { phone: '', house: '', code: '', city: '', email: '', web: '', lon: '', lat: '' },
            contact3: { phone: '', house: '', code: '', city: '', email: '', web: '', lon: '', lat: '' },
            message: '', messageColor: ''
        };
        this.state = Object.assign({}, this.data);
    }

    componentDidMount() {
        this.backToTop = () => {
            const item = document.getElementById('top');
            item.scrollIntoView({
                behavior: 'smooth'

            });
        }
    }

    submit = (e) => {
        e.preventDefault();
        if (this.canSubmit) {
            this.canSubmit = false;
            const tags = this.state.tags;
            const contact1 = this.state.contact1;
            const contact2 = this.state.contact2;
            const contact3 = this.state.contact3;
            const showMessage = (message, color) => {
                this.setState(Object.assign({}, this.state, {
                    message: message,
                    messageColor: color ? color : 'color_red'
                }));
                this.canSubmit = true;
            };
            let filters = false;
            for (const tagId in tags) {
                if (tags[tagId]) {
                    filters = true;
                    break;
                }
            }
            if (!filters) {
                showMessage('You must select at least one filter!');
            }
            else if (this.state.name === '') {
                showMessage('Name field may not be empty!');
            }
            else if (this.state.logo === '') {
                showMessage('Logo field may not be empty!');
            }
            else if (this.state.descriptionCompanies === '' || this.state.descriptionPersons === '') {
                showMessage('Description field may not be empty!');
            }
            else if (contact1.phone === '') {
                showMessage('Phone field may not be empty!');
            }
            else if (contact1.house === '') {
                showMessage('House No. field may not be empty!');
            }
            else if (contact1.code === '') {
                showMessage('Post code field may not be empty!');
            }
            else if (contact1.city === '') {
                showMessage('City field may not be empty!');
            }
            else if (contact1.email === '') {
                showMessage('Email field may not be empty!');
            }
            else if (contact1.web === '') {
                showMessage('Web Addr. field may not be empty!');
            }
            else if (contact1.lon === '') {
                showMessage('Longitude field may not be empty!');
            }
            else if (contact1.lat === '') {
                showMessage('Latitude field may not be empty!');
            }
            else if (
                (contact2.phone !== '' || contact2.house !== '' || contact2.code !== '' ||
                    contact2.city !== '' || contact2.email !== '' || contact2.web !== '' ||
                    contact2.lon !== '' || contact2.lat !== '') &&
                (contact2.phone === '' || contact2.house === '' || contact2.code === '' ||
                    contact2.city === '' || contact2.email === '' || contact2.web === '' ||
                    contact2.lon === '' || contact2.lat === '')
            ) {
                showMessage(
                    `If you want to enter 'Second contact details',
                    you have to enter all of these details!`
                );
            }
            else if (
                (contact3.phone !== '' || contact3.house !== '' || contact3.code !== '' ||
                    contact3.city !== '' || contact3.email !== '' || contact3.web !== '' ||
                    contact3.lon !== '' || contact3.lat !== '') &&
                (contact3.phone === '' || contact3.house === '' || contact3.code === '' ||
                    contact3.city === '' || contact3.email === '' || contact3.web === '' ||
                    contact3.lon === '' || contact3.lat === '')
            ) {
                showMessage(
                    `If you want to enter 'Third contact details',
                    you have to enter all of these details!`
                );
            }
            else if (
                isNaN(contact1.lon) || isNaN(contact2.lon) || isNaN(contact3.lon) ||
                isNaN(contact1.lat) || isNaN(contact2.lat) || isNaN(contact3.lat)
            ) {
                showMessage('You have to use float numbers in the fields of Longitude and Latitude!');
            }
            else {
                const data = {
                    name: this.state.name,
                    logo: this.state.logo,
                    descriptionCompanies: this.state.descriptionCompanies,
                    descriptionPersons: this.state.descriptionPersons,
                    contact1: Object.assign({}, contact1)
                };
                data.contact1.lat = parseFloat(data.contact1.lat);
                data.contact1.lon = parseFloat(data.contact1.lon);
                if (this.state.contact2.phone !== '') {
                    data.contact2 = Object.assign({}, contact2);
                    data.contact2.lat = parseFloat(data.contact2.lat);
                    data.contact2.lon = parseFloat(data.contact2.lon);
                }
                if (this.state.contact3.phone !== '') {
                    data.contact3 = Object.assign({}, contact3);
                    data.contact3.lat = parseFloat(data.contact3.lat);
                    data.contact3.lon = parseFloat(data.contact3.lon);
                }
                const tagsToSend = [];
                for (const id in tags) {
                    if (tags[id]) {
                        tagsToSend.push(parseInt(id, 10));
                    }
                }
                data.tags = tagsToSend;
                const xhr = new XMLHttpRequest();
                xhr.open('Post', `${this.props.serverLink}add?`, true);
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            showMessage('The new organization has been successfully added!', 'color_green');
                        }
                        else if (xhr.status === 500) {
                            showMessage(
                                `The server encountered an internal error or misconfiguration
                                and was unable to complete your request!`
                            );
                        }
                    }
                };
                xhr.send(JSON.stringify(data));
            }
        }
    };

    setStateHandler = (key, subKey, value) => {
        const tempSubObject = Object.assign({}, this.state[key]);
        tempSubObject[subKey] = value;
        const tempObject = {};
        tempObject[key] = tempSubObject;
        this.setState(Object.assign({}, this.state, tempObject));
    };


    render() {
        return <div className='h_f_container'>
            <div className='logo_big_container'>
                {/* <img
                    id='logo_big'
                    // src={require('../images/logo_big.jpg')}
                    alt='VWN Logo'
                /> */}
            </div>
            <div className='add_container' id='down'>
                <form className='form_container' onSubmit={this.submit}>
                    <strong id='addTitle'>
                        {"Please enter your organization's information in the fields below:"}
                    </strong>
                    <hr />
                    <div id='scroll_container'>
                        <div className='description_container'>
                            <div className='description_element'>
                                Name: <input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.name}
                                    onChange={e => {
                                        this.setState(Object.assign(
                                            {}, this.state, { name: e.target.value }
                                        ));
                                    }}
                                />
                            </div>
                            <div className='description_element'>
                                Logo: <input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.logo}
                                    onChange={e => {
                                        this.setState(Object.assign(
                                            {}, this.state, { logo: e.target.value }
                                        ));
                                    }}
                                />
                            </div>
                        </div>
                        <span id='filters'>Filters:</span>
                        <div className='tag_button_container'>
                            {/* {Object.keys(this.props.tags).map(tagId =>
                                <button
                                    key={tagId}
                                    className={this.state.tags[tagId] ? 'btn btnSelected' : 'btn'}
                                    onClick={e => {
                                        e.preventDefault();
                                        this.setStateHandler('tags', tagId, !this.state.tags[tagId]);
                                    }}
                                >{this.props.tags[tagId]}</button>
                            )} */}
                        </div>
                        <div className='description_container'>
                            <div className='description_element'>
                                Description for companies:<textarea
                                    rows='10'
                                    value={this.state.descriptionCompanies}
                                    onChange={e => {
                                        this.setState(Object.assign(
                                            {}, this.state, { descriptionCompanies: e.target.value }
                                        ));
                                    }}
                                />
                            </div>
                            <div className='description_element'>
                                Description for newcomers:<textarea
                                    rows='10'
                                    value={this.state.descriptionPersons}
                                    onChange={e => {
                                        this.setState(Object.assign(
                                            {}, this.state, { descriptionPersons: e.target.value }
                                        ));
                                    }}
                                />
                            </div>
                        </div>
                        <hr />
                        First contact details:<br />
                        <div className='description_container'>
                            <div className='description_element'>
                                Phone:<input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.contact1.phone}
                                    onChange={e => {
                                        this.setStateHandler('contact1', 'phone', e.target.value);
                                    }}
                                />
                            </div>
                            <div className='description_element'>
                                House No.:<input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.contact1.house}
                                    onChange={e => {
                                        this.setStateHandler('contact1', 'house', e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className='description_container'>
                            <div className='description_element'>
                                Post Code: <input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.contact1.code}
                                    onChange={e => {
                                        this.setStateHandler('contact1', 'code', e.target.value);
                                    }}
                                />
                            </div>
                            <div className='description_element'>
                                City: <input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.contact1.city}
                                    onChange={e => {
                                        this.setStateHandler('contact1', 'city', e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className='description_container'>
                            <div className='description_element'>
                                Email: <input
                                    type='email'
                                    className='space_filler'
                                    value={this.state.contact1.email}
                                    onChange={e => {
                                        this.setStateHandler('contact1', 'email', e.target.value);
                                    }}
                                />
                            </div>
                            <div className='description_element'>
                                Web Addr.: <input
                                    type='url'
                                    className='space_filler'
                                    value={this.state.contact1.web}
                                    onChange={e => {
                                        this.setStateHandler('contact1', 'web', e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className='description_container'>
                            <div className='description_element'>
                                Longitude: <input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.contact1.lon}
                                    onChange={e => {
                                        this.setStateHandler('contact1', 'lon', e.target.value);
                                    }}
                                />
                            </div>
                            <div className='description_element'>
                                Latitude: <input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.contact1.lat}
                                    onChange={e => {
                                        this.setStateHandler('contact1', 'lat', e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <hr />
                        Second contact details (optional):<br />
                        <div className='description_container'>
                            <div className='description_element'>
                                Phone:<input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.contact2.phone}
                                    onChange={e => {
                                        this.setStateHandler('contact2', 'phone', e.target.value);
                                    }}
                                />
                            </div>
                            <div className='description_element'>
                                House No.:<input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.contact2.house}
                                    onChange={e => {
                                        this.setStateHandler('contact2', 'house', e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className='description_container'>
                            <div className='description_element'>
                                Post Code: <input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.contact2.code}
                                    onChange={e => {
                                        this.setStateHandler('contact2', 'code', e.target.value);
                                    }}
                                />
                            </div>
                            <div className='description_element'>
                                City: <input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.contact2.city}
                                    onChange={e => {
                                        this.setStateHandler('contact2', 'city', e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className='description_container'>
                            <div className='description_element'>
                                Email: <input
                                    type='email'
                                    className='space_filler'
                                    value={this.state.contact2.email}
                                    onChange={e => {
                                        this.setStateHandler('contact2', 'email', e.target.value);
                                    }}
                                />
                            </div>
                            <div className='description_element'>
                                Web Addr.: <input
                                    type='url'
                                    className='space_filler'
                                    value={this.state.contact2.web}
                                    onChange={e => {
                                        this.setStateHandler('contact2', 'web', e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className='description_container'>
                            <div className='description_element'>
                                Longitude: <input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.contact2.lon}
                                    onChange={e => {
                                        this.setStateHandler('contact2', 'lon', e.target.value);
                                    }}
                                />
                            </div>
                            <div className='description_element'>
                                Latitude: <input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.contact2.lat}
                                    onChange={e => {
                                        this.setStateHandler('contact2', 'lat', e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <hr />
                        Third contact details (optional):<br />
                        <div className='description_container'>
                            <div className='description_element'>
                                Phone:<input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.contact3.phone}
                                    onChange={e => {
                                        this.setStateHandler('contact3', 'phone', e.target.value);
                                    }}
                                />
                            </div>
                            <div className='description_element'>
                                House No.:<input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.contact3.house}
                                    onChange={e => {
                                        this.setStateHandler('contact3', 'house', e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className='description_container'>
                            <div className='description_element'>
                                Post Code: <input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.contact3.code}
                                    onChange={e => {
                                        this.setStateHandler('contact3', 'code', e.target.value);
                                    }}
                                />
                            </div>
                            <div className='description_element'>
                                City: <input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.contact3.city}
                                    onChange={e => {
                                        this.setStateHandler('contact3', 'city', e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className='description_container'>
                            <div className='description_element'>
                                Email: <input
                                    type='email'
                                    className='space_filler'
                                    value={this.state.contact3.email}
                                    onChange={e => {
                                        this.setStateHandler('contact3', 'email', e.target.value);
                                    }}
                                />
                            </div>
                            <div className='description_element'>
                                Web Addr.: <input
                                    type='url'
                                    className='space_filler'
                                    value={this.state.contact3.web}
                                    onChange={e => {
                                        this.setStateHandler('contact3', 'web', e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className='description_container'>
                            <div className='description_element'>
                                Longitude: <input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.contact3.lon}
                                    onChange={e => {
                                        this.setStateHandler('contact3', 'lon', e.target.value);
                                    }}
                                />
                            </div>
                            <div className='description_element'>
                                Latitude: <input
                                    type='text'
                                    className='space_filler'
                                    value={this.state.contact3.lat}
                                    onChange={e => {
                                        this.setStateHandler('contact3', 'lat', e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='submit_container'>
                        <div
                            id='messageContainer'
                            className={this.state.messageColor}
                        >{this.state.message}</div>

                        <button 
                        onClick={()=>{this.backToTop()}}
                        >Back to top</button>
                    <button type='' value='Submit' className='submit' >Submit</button>
                    <button
                        className='reset'
                        onClick={e => {
                            e.preventDefault();
                            this.setState(this.data);
                        }}
                    >Reset</button>
                    </div>
                </form>
        </div>
        </div >;
    }
}