import { createStore, applyMiddleware, combineReducers, Reducer } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { EmployeeAction } from './employees/actions'

import { employeeReducer as employees } from './employees/reducers'

export const rootReducer = combineReducers({
  employees
})

export type AppState = typeof rootReducer extends Reducer<infer R> ? R : never

export const getStore = () => {
  const store = createStore(rootReducer, composeWithDevTools({
    name: 'Employee Plans'
  })(
    applyMiddleware(thunk as ThunkMiddleware<AppState, EmployeeAction>)
  ))

  return store
}

export type AppStore = ReturnType<typeof getStore>;
