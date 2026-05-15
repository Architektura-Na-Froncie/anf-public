import { EmployeeAction } from './actions'
import { Employee } from 'api/employees'
import * as actions from './constants'
import { PlanID, Plan } from './model'

export type EmployeeState = {
  data: Employee[]
  total?: number
  loading: boolean
  plans: {
    [key in PlanID]: Plan
  },
  currentPlan: PlanID
}


const initialState: EmployeeState = {
  data: [],
  loading: false,
  currentPlan: '451a6ac1-c62a-4dbb-af07-9bfbcf5bdec7',
  plans: {
    '451a6ac1-c62a-4dbb-af07-9bfbcf5bdec7': {
      id: '451a6ac1-c62a-4dbb-af07-9bfbcf5bdec7',
      title: 'default plan',
      changes: {
        65797404: {
          type: actions.INCREASE_SALARY,
          amount: 100,
          employeeId: 65797404,
          planID: '451a6ac1-c62a-4dbb-af07-9bfbcf5bdec7',
        }
      }
    }
  }
};

export const employeeReducer =
  (state = initialState, action: EmployeeAction): EmployeeState => {
    switch (action.type){
      case actions.FIRE_EMPLOYEE:
        return {
          ...state,
          plans: {
            ...state.plans,
            [action.planID]: {
              ...state.plans[action.planID],
              changes: {
                ...state.plans[action.planID].changes,
                [action.employeeId]: action,
              }
            }
          }
        }

      case actions.INCREASE_SALARY:
        return {
          ...state,
          plans: {
            ...state.plans,
            [action.planID]: {
              ...state.plans[action.planID],
              changes: {
                ...state.plans[action.planID].changes,
                [action.employeeId]: action,
              }
            }
          }
        }

      case actions.RESET_CHANGES: {
        const { employeeId } = action;
        const { [employeeId]: employeeChanges, ...currentPlanChanges } = state.plans[action.planID].changes;

        return {
          ...state,
          plans: {
            ...state.plans,
            [action.planID]: {
              ...state.plans[action.planID],
              changes: currentPlanChanges,
            }
          }
        }
      }

      case actions.CREATE_PLAN:
        return {
          ...state,
          plans: {
            ...state.plans,
            [action.planId]: {
              id: action.planId,
              title: action.title,
              changes: {}
            }
          }
        };

      case actions.SELECT_PLAN:
        return {
          ...state,
          currentPlan: action.planId
        };

      case actions.FETCH_EMPLOYEES_REQUEST:
        return {
          ...state,
          data: [],
          loading: true
        };

      case actions.FETCH_EMPLOYEES_FAILURE:
        return {
          ...state,
          loading: false
        };

      case actions.FETCH_EMPLOYEES_TOTAL:
        return {
          ...state,
          total: action.total
        };

      case actions.FETCH_EMPLOYEES_SUCCESS:
        const newLength = state.data.length + action.employees.length;
        const finished = state.total && newLength === state.total;
        return {
          ...state,
          data: state.data.concat(action.employees),
          loading: !finished
        };

      default:
        return state
    }
  }
