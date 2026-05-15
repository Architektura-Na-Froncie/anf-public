function pair <T>(arg: T){
  return [arg, arg]
}

declare function triple<T>(arg: T): T[]

import * as _ from 'lodash'

const zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
// const zipped = _.zip(['a', 'b', 'c'], [1, 2], [true, false]);

import React from 'react'

const Component: React.FC<{ value?: number }> = (props) => {
  return <div>{ props.value.toFixed() }</div>
}
