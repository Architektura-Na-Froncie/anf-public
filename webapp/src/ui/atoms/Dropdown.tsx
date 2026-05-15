import React, { ChangeEvent } from 'react'
import styled from 'styled-components';
import { colors } from 'ui/palette';
import { rgba } from 'polished';
import { inputBase } from './inputBase';

export type DropdownOptions = { [key: string]: string }

interface DropdownProps {
  id: string
  items: DropdownOptions
  defaultValue?: string
  includeEmpty?: boolean
  disabled?: boolean
  error?: any
  onChanged?: (key: string) => void
}

type DropdownState = {
  value: string
}

const DropdownSelect = styled.select`
  ${inputBase}
  padding-right: 2rem;
  padding-left: .5rem;
  appearance: none;
  cursor: pointer;
  background-image: ${(props) => `url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' width='292.4' height='292.4'><path fill='${rgba(props.disabled ? colors.grey : colors.darkGrey, 1)}' d='M287 69.4a17.6 17.6 0 0 0-13-5.4H18.4c-5 0-9.3 1.8-12.9 5.4A17.6 17.6 0 0 0 0 82.2c0 5 1.8 9.3 5.4 12.9l128 127.9c3.6 3.6 7.8 5.4 12.8 5.4s9.2-1.8 12.8-5.4L287 95c3.5-3.5 5.4-7.8 5.4-12.8 0-5-1.9-9.2-5.5-12.8z'/></svg>")`};
  background-repeat: no-repeat;
  background-position: right .7em top 50%;
  background-size: .65em auto;

  &&[disabled] {
    cursor: not-allowed;
  }
`;

export class Dropdown extends React.Component<DropdownProps, DropdownState> {
  constructor(props: DropdownProps) {
    super(props);
    this.state = { value: props.defaultValue ?? '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    this.props.onChanged?.(value)
    this.setState({ value });
  }

  render() {
    const { id, items, includeEmpty, disabled, error } = this.props
    return (
      // eslint-disable-next-line jsx-a11y/no-onchange
      <DropdownSelect
        id={id}
        data-testid={id}
        value={ this.state.value }
        onChange={this.handleChange}
        disabled={disabled}
        error={error}
      >
        {includeEmpty && <option></option>}
        {Object.entries(items).map(([key, value]) =>
          <option key={key} value={key}>{value}</option>)}
      </DropdownSelect>
    );
  }
}
