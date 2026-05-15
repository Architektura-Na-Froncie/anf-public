/* eslint-disable */
import React from 'react';

import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';

export class ContactsContainer extends React.Component {

  constructor(props) {
    super(props);

    // ContactsService object
    this.service = this.props.service;

    this.state = {
      contacts: [],
      selected: null
    };

    this.service.getContacts().then((contacts) => {
      this.setState({
        contacts
      });
    });
  }

  newContact = () => {
    this.setState({
      selected: {
        name: '',
        details: ''
      }
    });
  }

  onSelect = (contact) => {
    this.setState({
      selected: contact
    });
  }

  onSubmit = (contact) => {
    this.service.saveContact(contact).then(()=>{
      this.service.getContacts().then((contacts) => {
        this.setState({
          contacts
        });
      });
    });
  }

  onCancel = () => {
    this.setState({
      selected: null
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Contacts</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <ContactList
              contacts={this.state.contacts}
              selected={this.state.selected}
              onSelect={this.onSelect}
            />
          </div>
          <div className="col-md-4">
            {this.state.selected
            ? (
              <ContactForm contact={this.state.selected}
                onChange={this.onSelect}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}
              />
            ) : (
              <div>
                <button id="new-contact" onClick={this.newContact} className="btn btn-primary">New contact</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
