import * as actions from './constants'
import { Employee } from 'api/employees'

import { PlanID } from './model'

export const fireEmployee = (employeeId: Employee['id'], planID: PlanID) => ({
  type: actions.FIRE_EMPLOYEE as typeof actions.FIRE_EMPLOYEE,
  employeeId, planID
})
export type fireEmployeeAction = ReturnType<typeof fireEmployee>

export const increaseSalary = (employeeId: Employee['id'], amount: number, planID: PlanID) => ({
  type: actions.INCREASE_SALARY as typeof actions.INCREASE_SALARY,
  employeeId, amount, planID
})
export type giveRiseEmployeeAction = ReturnType<typeof increaseSalary>

export const resetChanges = (employeeId: Employee['id'], planID: PlanID) => ({
  type: actions.RESET_CHANGES as typeof actions.RESET_CHANGES,
  employeeId, planID
})
export type resetChangesAction = ReturnType<typeof resetChanges>

export const createPlan = (planId: string, title: string) => ({
  type: actions.CREATE_PLAN as typeof actions.CREATE_PLAN,
  planId, title
})
export type createPlanAction = ReturnType<typeof createPlan>

export const selectPlan = (planId: PlanID) => ({
  type: actions.SELECT_PLAN as typeof actions.SELECT_PLAN,
  planId
})
export type selectPlanAction = ReturnType<typeof selectPlan>

export type EmployeePlanAction =
  | fireEmployeeAction
  | giveRiseEmployeeAction
  | resetChangesAction
  | createPlanAction
  | selectPlanAction

// rozpoczęcie ładowania
export const fetchEmployeesRequest = () => ({
  type: actions.FETCH_EMPLOYEES_REQUEST as typeof actions.FETCH_EMPLOYEES_REQUEST,
})
export type fetchEmployeesRequestAction = ReturnType<typeof fetchEmployeesRequest>

// określenie rozmiaru całej kolekcji danych
export const fetchEmployeesTotal = (total: number) => ({
  type: actions.FETCH_EMPLOYEES_TOTAL as typeof actions.FETCH_EMPLOYEES_TOTAL,
  total
})
export type fetchEmployeesTotalAction = ReturnType<typeof fetchEmployeesTotal>

// zakończenie ładowania
export const fetchEmployeesSuccess = (employees: Employee[], page: number) => ({
  type: actions.FETCH_EMPLOYEES_SUCCESS as typeof actions.FETCH_EMPLOYEES_SUCCESS,
  employees,
  page
})
export type fetchEmployeesSuccessAction = ReturnType<typeof fetchEmployeesSuccess>

// również zakończenie ładowania
export const fetchEmployeesFailure = (error: Error) => ({
  type: actions.FETCH_EMPLOYEES_FAILURE as typeof actions.FETCH_EMPLOYEES_FAILURE,
  error
})
export type fetchEmployeesFailureAction = ReturnType<typeof fetchEmployeesFailure>


export type EmployeeFetchAction =
  | fetchEmployeesRequestAction
  | fetchEmployeesTotalAction
  | fetchEmployeesSuccessAction
  | fetchEmployeesFailureAction

export type EmployeeAction =
  | EmployeePlanAction
  | EmployeeFetchAction
