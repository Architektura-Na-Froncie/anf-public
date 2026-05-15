/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable import/first */
import React, { useEffect, useState } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import { Button } from 'ui/atoms';
import { Person, fetchMockPersons, mockPersons, mockJohn } from 'mocks';
import { WithLoading } from './HOCWithLoading'
import { ItemsList } from './RenderProp';
import { CompanyEmployeeList, CompanyEmployee } from './UnionProps';

import { lessons } from 'stories';
export default {
  title: lessons.m3.add('TypeScript').toString(),
  argTypes: {
  },
} as Meta;


const PersonsList: React.FC<{ persons: Person[] }> = (props) => {
  const { persons } = props
  return <ul>
    { persons.map( p => <li key={p.id}>{p.firstName} {p.lastName}</li> ) }
  </ul>
}

const PersonsWithLoading = WithLoading(PersonsList)

export const HigherOrderComponent = () => {
  const [persons, setPersons] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)

  const reload = () => {
    setLoading(true)
    fetchMockPersons()
    .then(data => {
      setPersons(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    reload()
  }, [])

  return <>
    <PersonsWithLoading
      persons={persons}
      loading={loading}
    />
    <Button variant="SECONDARY" onClick={reload}>reload</Button>
  </>
}

export const RenderProp = () => {
  return <ItemsList
    items={mockPersons}
    renderItem={p => <>{p.firstName} {p.lastName}</>}
  />
}


const companyEmployees: CompanyEmployee[] = [
  { ...mockJohn, type: "MANAGER", department: "IT" },
  { ...mockJohn, type: "DEVELOPER", languages: ['JavaScript', 'TypeScript'] },
]

export const UnionProp = () => {
  return <CompanyEmployeeList
    employees={companyEmployees}
  />
}
