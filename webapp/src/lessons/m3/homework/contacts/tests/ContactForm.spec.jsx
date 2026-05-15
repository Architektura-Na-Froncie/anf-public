import React from 'react';
import { shallow, mount } from 'enzyme';

import contacts from '../contacts.json';
import { ContactForm } from '../ContactForm';

describe('ContactForm Component', () => {
  it('should be stateless component (no setState, only props)', () => {
    const wrapper = shallow(<ContactForm contact={{}} />);
    expect(wrapper.state()).toBeNull();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<ContactForm contact={{}} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should display name and details form input fields after a contact is selected', () => {
    const contact = contacts[1];
    const wrapper = mount(<ContactForm contact={contact} />);
    expect(wrapper.find('[name="name"]').getDOMNode().value).toEqual(contact.name);
    expect(wrapper.find('[name="details"]').getDOMNode().value).toEqual(contact.details);
  });

  it('should call onChange with changed form values', () => {
    const onChange = jest.fn();
    const contact = { name: '', details: '' };
    const wrapper = mount(<ContactForm contact={contact} onChange={onChange} />);

    const nameInput = wrapper.find('[name="name"]');
    nameInput.instance().value = 'test';

    const detailsInput = wrapper.find('[name="details"]');
    detailsInput.instance().value = 'test';

    nameInput.simulate('change', { target: nameInput.getDOMNode() });
    expect(onChange.mock.calls[0]).toEqual([{ name: 'test', details: '' }]);

    detailsInput.simulate('change', { target: detailsInput.getDOMNode() });
    expect(onChange.mock.calls[1]).toEqual([{ name: '', details: 'test' }]);
  });

  it('should call onSubmit with changed contact after the form is submitted', () => {
    const onSubmit = jest.fn();
    const contact = { name: '', details: '' };
    const wrapper = mount(<ContactForm contact={contact} onSubmit={onSubmit} />);

    wrapper.find('form [type="submit"]').simulate('click');
    wrapper.find('form').simulate('submit');
    expect(onSubmit.mock.calls[0]).toEqual([contact]);
  });
})
