import React from 'react';
import { shallow, mount } from 'enzyme';

import contacts from '../contacts.json';
import { ContactList } from '../ContactList';

describe('ContactList Component', () => {
  it('should be stateless component (no setState, only props)', () => {
    const wrapper = shallow(<ContactList contacts={contacts} />);
    expect(wrapper.state()).toBeNull();
  });

  it('should match snapshot (empty)', () => {
    const wrapper = shallow(<ContactList contacts={[]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot (content)', () => {
    const wrapper = shallow(<ContactList contacts={contacts} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show list of contacts', () => {
    const wrapper = shallow(<ContactList contacts={contacts} />);
    expect(wrapper.find('.list-group-item').length).toEqual(contacts.length);
  });

  it('should call onSelect function after a contact was clicked', () => {
    const onSelect = jest.fn();
    const wrapper = mount(<ContactList contacts={contacts} onSelect={onSelect} />);
    const item = wrapper.find('.list-group-item').at(1);
    item.simulate('click');

    expect(onSelect.mock.calls[0]).toEqual([contacts[1]]);
  });

  it('should add `active` class to a contact after it was selected', () => {
    const contact = contacts[1];
    const wrapper = mount(<ContactList contacts={contacts} selected={contact} />);

    const item = wrapper.find('.list-group-item').at(1);
    expect(item.hasClass('active')).toBeTruthy();
  });
});
