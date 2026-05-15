/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable import/first */
import React, { CSSProperties } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import { lessons } from 'stories';
export default {
  title: lessons.m3.add('React & CSS').toString(),
  argTypes: {
  },
} as Meta;

const onClick = action('click')

const inlineStyles: CSSProperties = {
  backgroundColor: ' #764abc',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  padding: '8px 12px',
  textAlign: 'center',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  // no way to implement pseudo-selectors (hover, focus, etc)
  // either manual state management (like setHover) or external lib required
  // ':focus': { // ❌ will not work
  //   outlineColor: '#a97def',
  // }
}

const lightStyles: CSSProperties = {
  backgroundColor: '#957cbb',
}

export const InlineStyles = () => {
  return <>
    <button style={inlineStyles} onClick={onClick}>click me</button>
    <button style={{...inlineStyles, ...lightStyles}} onClick={onClick}>and me</button>
  </>
}



import './react-css.css'
import classNames from 'classnames'

export const CSS_Import = () => {
  return <>
    <button className="button" onClick={onClick}>click me</button>
    <button className={classNames('button', 'light')} onClick={onClick}>and me</button>
    <button className={classNames({ button: true, light: true })} onClick={onClick}>and me</button>
  </>
}



import buttonStyles from './react-css.module.css'

export const CSS_Modules = () => {
  return <>
    <button className={buttonStyles.button} onClick={onClick}>click me</button>
    <button className={classNames(buttonStyles.button, buttonStyles.light)} onClick={onClick}>and me</button>
  </>
}



import styled from 'styled-components';

// - SCSS-like syntax, https://github.com/thysultan/stylis.js
// - & - inline'uje nazwę klasy
// - && - podwyższony priorytet (specificity)
// - &:hover - pseudoselektory

interface ButtonProps {
  light?: boolean
}

const StyledButton = styled.button<ButtonProps>`
  background-color: ${({ light }) => light ? '#957cbb' : '#764abc'};
  border: none;
  border-radius: 4px;
  color: white;
  padding: 8px 12px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin: 2px 2px;
  cursor: pointer;

  &:focus {
    outline-color: #a97def;
  }
`

export const StyledComponents = () => {
  return <>
    <StyledButton onClick={onClick}>click me</StyledButton>
    <StyledButton light={true} onClick={onClick}>and me</StyledButton>
  </>
}

const StyledAnimatedButton = styled(StyledButton)`
  &:hover {
    opacity: 0.5
  }
  transition: 0.2s;
`

export const WrappedAndAnimated = () => {
  return <>
    <StyledAnimatedButton onClick={onClick}>click me</StyledAnimatedButton>
    <StyledAnimatedButton light={true} onClick={onClick}>and me</StyledAnimatedButton>
  </>
}
