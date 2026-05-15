import { AppState } from './index'

export const getCurrentPlanID = (state: AppState) => {
  return state.employees.currentPlan
}

export const getCurrentPlan = (state: AppState) => {
  if (state.employees.currentPlan) {
    return state.employees.plans[state.employees.currentPlan]
  }
}
