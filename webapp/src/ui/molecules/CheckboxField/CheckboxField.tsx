import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { ErrorBox } from 'ui/atoms';
import { colors } from 'ui/palette';
import { Checkmark } from './Checkmark';

interface CheckboxFieldProps {
  id: string
  label: string
  defaultChecked?: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
  error?: string
}

const CheckboxWrapper = styled.div`
  display: block;
  position: relative;
  margin-bottom: 1rem;
  max-width: calc(480px - 2.25rem);
`;

const CheckboxInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 1;
  color: ${( props ) => props.color};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

const CheckboxCheckmark = styled(Checkmark)<{ invalid?: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid ${(props) => props.invalid ? colors.mainRed : colors.mainBlue};
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 200ms;

  svg {
    display: block;
    margin: 50% auto 0;
    width: 80%;
    height: 80%;
    transform: translateY(-50%) scale(0);
    transition: 100ms ease-in-out;
    fill: ${colors.white};
  }

  ${CheckboxInput}:focus-visible ~ && {
    box-shadow:
      0 0 0 1px #fff,
      0 0 0 3px ${(props) => props.invalid ? colors.mainRed : colors.mainBlue};
  }

  ${CheckboxInput}:checked ~ && {
    background: ${(props) => props.invalid ? colors.mainRed : colors.mainBlue};

    svg {
      transform: translateY(-50%) scale(1);
      transition-delay: 150ms;
    }
  }

  ${CheckboxInput}:disabled ~ && {
    border-color: ${colors.grey};
    background: ${colors.grey};
    cursor: not-allowed;

    svg {
      fill: ${colors.darkGrey};
    }
  }
`;

const CheckboxLabel = styled.label`
  display: block;
  padding-left: 2.25rem;
  min-height: 24px;
  position: relative;
  user-select: none;
  cursor: pointer;
  line-height: 1.5rem;
  text-align: left;
`;

const CheckboxError = styled(ErrorBox)`
  margin-top: .25rem;
  line-height: 1.33;
`;

export const CheckboxField: React.FC<CheckboxFieldProps> = (props) => {
  const { id, label, defaultChecked = false, onChange, disabled, error } = props;

  const [checked, setChecked] = useState(defaultChecked)
  const updateChecked = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked
    setChecked(newValue)
    onChange?.(newValue)
  }, [onChange])

  return (
    <CheckboxWrapper>
      <CheckboxInput
        type="checkbox"
        id={id}
        data-testid={id}
        checked={checked}
        onChange={updateChecked}
        disabled={disabled}
      />
      <CheckboxCheckmark invalid={!!error} />
      <CheckboxLabel htmlFor={id}>{label}</CheckboxLabel>
      {error && <CheckboxError>{error}</CheckboxError>}
    </CheckboxWrapper>
  );
}
