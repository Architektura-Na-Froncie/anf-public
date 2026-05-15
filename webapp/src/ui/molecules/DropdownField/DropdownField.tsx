import React from 'react';

import { Dropdown, DropdownOptions } from 'ui/atoms';
import { FormField } from '../FormField';

interface DropdownFieldProps {
  id: string
  label: string;
  layoutDirection?: "horizontal" | "vertical"
  items: DropdownOptions
  defaultValue?: string
  onChange?: (value: string) => void
  includeEmpty?: boolean
  disabled?: boolean
  error?: string
}

export const DropdownField: React.FC<DropdownFieldProps> = (props) => {
  const { id, label, layoutDirection = "horizontal", items, defaultValue, onChange, includeEmpty, disabled, error } = props

  return <FormField
    label={label}
    htmlFor={id}
    error={error}
    layoutDirection={layoutDirection}
  >
    <Dropdown
      id={id}
      items={items}
      defaultValue={defaultValue}
      onChanged={onChange}
      disabled={disabled}
      error={error}
      includeEmpty={includeEmpty}
    />
  </FormField>
}
