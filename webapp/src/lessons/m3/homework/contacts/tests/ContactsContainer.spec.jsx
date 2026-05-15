/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import flushPromises from 'flush-promises';
import { act } from "react-dom/test-utils";
import { mount } from 'enzyme';
import { ContactsContainer } from '../ContactsContainer';
import { ContactsService } from '../contacts.service';

describe('ContactsContainer Component', () => {
  function createMockService() {
    const data = [{
      id: '4567', name: 'candidate test', details: 'candidate test'
    }];

    const svc = new ContactsService(data);
    jest.spyOn(svc, 'getContacts');
    jest.spyOn(svc, 'saveContact');
    return svc;
  }

  it('should match snapshot', () => {
    const mockService = createMockService();
    const wrapper = mount(<ContactsContainer service={mockService} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call contactsService.getContacts() when rendered', () => {
    const mockService = createMockService();
    const wrapper = mount(<ContactsContainer service={mockService} />);

    expect(mockService.getContacts.mock.calls.length).toEqual(1);

    return mockService.getContacts.mock.results[0].value.then(() => {
      wrapper.update();
      expect(wrapper.find('.list-group-item').length).toEqual(mockService.contacts.length);
    });
  });

  it('should call contactsService.saveContact() when form is submitted', () => {
    const mockService = createMockService();
    const wrapper = mount(<ContactsContainer service={mockService} />);
    expect(mockService.getContacts.mock.calls.length).toEqual(1);

    wrapper.setState({ selected: mockService.contacts[0] });
    wrapper.find('form [type="submit"]').simulate('click');
    wrapper.find('form').simulate('submit');
    expect(mockService.saveContact.mock.calls[0]).toEqual([mockService.contacts[0]]);
  });

  it('should fetch contacts from contactsService and update contacts list when form is submitted', () => {
    const mockService = createMockService();
    const wrapper = mount(<ContactsContainer service={mockService} />);
    expect(mockService.getContacts.mock.calls.length).toEqual(1);

    return mockService.getContacts.mock.results[0].value.then(() => {
      wrapper.update();
      expect(wrapper.find('.list-group-item').length).toEqual(mockService.contacts.length);
    });
  });

  it('should add new contact to list when new contact is saved', () => {
    const mockService = createMockService();
    const wrapper = mount(<ContactsContainer service={mockService} />);

    wrapper.setState({ selected: { name: 'new', details: 'new' } });
    wrapper.find('form [type="submit"]').simulate('click');
    wrapper.find('form').simulate('submit');

    expect(mockService.saveContact.mock.calls.length).toEqual(1);

    // Wait for saveContact
    return Promise.resolve(mockService.saveContact.mock.results[0].value)
      .then(() => {
        expect(mockService.getContacts.mock.calls.length).toEqual(2);

        // Wait for second getContacts
        return mockService.getContacts.mock.results[1].value;
      })
      .then(() => {
        wrapper.update();
        expect(wrapper.find('.list-group-item').length).toEqual(mockService.contacts.length);
      });
  });

  it('should update contact on the list when existing contact is saved', () => {
    const mockService = createMockService();
    const wrapper = mount(<ContactsContainer service={mockService} />);
    const contact = mockService.contacts[0];
    contact.name = 'changed name';

    wrapper.setState({ selected: contact });
    wrapper.find('[name="name"]').simulate('change');

    wrapper.find('form [type="submit"]').simulate('click');
    wrapper.find('form').simulate('submit');

    expect(mockService.saveContact.mock.calls.length).toEqual(1);

    // Wait for saveContact
    return Promise.resolve(mockService.saveContact.mock.results[0].value)
      .then(() => {
        expect(mockService.getContacts.mock.calls.length).toEqual(2);

        // Wait for second getContacts
        return mockService.getContacts.mock.results[1].value;
      })
      .then(() => {
        wrapper.update();
        expect(wrapper.find('.list-group-item').at(0).text()).toBe(contact.name);
      });
  });
});
