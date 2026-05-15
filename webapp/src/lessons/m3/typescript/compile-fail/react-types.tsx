/* eslint-disable import/first */
import React, { ComponentProps } from 'react'

// primitives

const JSXElements: JSX.Element[] = [
  123,
  'label',
  <div />,
]

const ReactNodes: React.ReactNode[] = [
  123,
  'label',
  <div />,
]

const element = React.createElement("div") // detailed element
ReactNodes.push(element)
JSXElements.push(element)

declare const Component: React.FC
const component = <Component /> // JSX.Element
ReactNodes.push(component)
JSXElements.push(component)

ReactNodes.push("elo")
JSXElements.push("elo") // ❌ prymityw to nie JSX



// ComponentProps

import { Input } from '../../../../ui/atoms'
import { TextField } from '../../../../ui/molecules'
import { CodeBlock } from '../../performance/CodeBlock'

type Reveal<T> = { [P in keyof T]: T[P] }

// type InputProps = ComponentProps<typeof Input>
type InputProps = Reveal<ComponentProps<typeof Input>> // styled-component
type CodeBlockProps = Reveal<ComponentProps<typeof CodeBlock>> // custom, small
type TextFieldProps = Reveal<ComponentProps<typeof TextField>> // custom, big
