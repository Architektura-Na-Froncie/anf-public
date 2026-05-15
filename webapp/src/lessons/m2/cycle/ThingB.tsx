import React from 'react';
import { ThingA } from './ThingA'
import { common } from './Common'

export const ThingB = () => {
  return <><ThingA />{ common }</>
}
