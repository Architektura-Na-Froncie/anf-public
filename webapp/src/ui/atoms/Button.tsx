import { CSSProperties } from 'react';
import styled from 'styled-components'

import { colors } from 'ui/palette'

type ButtonVariants = "PRIMARY" | "SECONDARY" | "OUTLINED"

// without hover:
// type ButtonStyles = Required<Pick<CSSProperties, "color" | "backgroundColor">>
type ButtonStyles = Required<
  & Pick<CSSProperties, "color" | "backgroundColor" | "borderColor">
  & { "hoverBackgroundColor": CSSProperties['backgroundColor'], "hoverColor"?: CSSProperties['color'] }
>

export type Palette<TVariants extends string, TStyles> = {
  [variant in TVariants]: TStyles
} // or TS Record

const styles: Palette<ButtonVariants, ButtonStyles> = {
  PRIMARY: {
    color: colors.white,
    backgroundColor: colors.mainTeal,
    borderColor: colors.mainTeal,
    hoverBackgroundColor: colors.mainBlue,
    hoverColor: colors.white,
  },
  SECONDARY: {
    color: colors.mainBlue,
    backgroundColor: colors.lightTeal,
    borderColor: colors.lightTeal,
    hoverBackgroundColor: colors.white,
    hoverColor: colors.mainBlue,
  },
  OUTLINED: {
    color: colors.primary,
    backgroundColor: colors.transparent,
    borderColor: colors.primary,
    hoverBackgroundColor: colors.primary,
    hoverColor: colors.white,
  }
}

interface ButtonProps {
  variant?: ButtonVariants;
}

export const ButtonIcon = styled.i`
  font-weight: bold;
  font-style: normal;
  line-height: 1;
  display: inline-block;
`

export const Button = styled.button<ButtonProps>`
  margin: 0;
  padding: 8px 14px;
  min-width: 4rem;
  white-space: nowrap;
  width: fit-content;
  font-size: 16px;
  font-weight: 700;
  color: ${( props ) => styles[props.variant!].color};
  background-color: ${( props ) => styles[props.variant!].backgroundColor};
  border: 1px solid ${( props ) => styles[props.variant!].borderColor};
  border-radius: 4px;
  appearance: none;
  cursor: pointer;
  transition-duration: 0.2s;

  &:disabled {
    cursor: not-allowed;
  }

  &:disabled,
  &:disabled:hover {
    color: ${colors.white};
    background-color: ${colors.grey};
    border-color: ${colors.grey};
  }

  &:enabled:hover {
    color: ${( props ) => styles[props.variant!].hoverColor || styles[props.variant!].color};
    background-color: ${( props ) => styles[props.variant!].hoverBackgroundColor};
    border-color: ${( props ) => styles[props.variant!].hoverBackgroundColor};
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;
Button.defaultProps = { variant: 'PRIMARY' };
Button.displayName = "Button"
