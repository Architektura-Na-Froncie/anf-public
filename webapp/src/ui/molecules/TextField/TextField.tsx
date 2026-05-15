import React, { useCallback, useState } from 'react';

import { Input, TextArea } from 'ui/atoms';
import { FormField } from '../FormField';

export interface TextFieldProps {
  id: string;
  label: string;
  layoutDirection?: "horizontal" | "vertical";
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  type?: "text" | "password" | "textarea" | "number";
  disabled?: boolean;
  error?: string;
  noMargin?: boolean;
}

export const TextField: React.FC<TextFieldProps> = (props) => {
  const { id, label, layoutDirection = "horizontal", placeholder, defaultValue, onChange, type = "text", disabled, error, noMargin } = props

  const [value, setValue] = useState(defaultValue || "")
  const updateValue = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    onChange?.(newValue)
  }, [onChange])

  return (
    <FormField
      label={label}
      htmlFor={id}
      error={error}
      layoutDirection={layoutDirection}
      noMargin={noMargin}
    >
      {type === 'textarea' ? (
        <TextArea
          id={id}
          data-testid={id}
          value={value}
          onChange={updateValue}
          placeholder={placeholder}
          disabled={disabled}
          error={error}
        />
      ) : (
        <Input
          type={type}
          id={id}
          data-testid={id}
          value={value}
          onChange={updateValue}
          placeholder={placeholder}
          disabled={disabled}
          error={error}
        />
      )}
    </FormField>
  );
}
