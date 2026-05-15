import { Employee } from "api/employees"
import { FIRE_EMPLOYEE, INCREASE_SALARY } from './constants'

export type PlanID = string

type EmployeeChangeAction = {
  type: typeof FIRE_EMPLOYEE;
  employeeId: number;
  planID: PlanID;
} | {
  type: typeof INCREASE_SALARY;
  employeeId: number;
  amount: number;
  planID: PlanID;
}

export type Plan = {
  id: PlanID
  title: string
  changes: {
    [employeeId in Employee['id']]: EmployeeChangeAction
  }
}
