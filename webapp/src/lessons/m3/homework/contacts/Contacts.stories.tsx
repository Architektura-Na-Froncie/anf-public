/* eslint-disable import/first */
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';

import contacts from './contacts.json';
import { ContactsContainer } from './ContactsContainer';
import { ContactsService } from './contacts.service';

const svc = new ContactsService(contacts);

import { lessons } from 'stories';
export default {
  title: lessons.m3.add('HOMEWORK').toString(),
  argTypes: {
  },
} as Meta;

export const Contacts = () => {
  return <>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
    <ContactsContainer service={svc} />
  </>
}
