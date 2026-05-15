import React from 'react'

import { Plan } from '../store/employees/model'
import { giveRiseEmployeeAction, EmployeeAction } from '../store/employees/actions'
import { FIRE_EMPLOYEE, INCREASE_SALARY } from '../store/employees/constants'

const isGiveRiseEmployeeAction = (action: EmployeeAction): action is giveRiseEmployeeAction => {
  return action.type === INCREASE_SALARY
}

interface EmployeePlanDetailsProps {
  plan: Plan
}

export const EmployeePlanDetails: React.FC<EmployeePlanDetailsProps> = ({ plan }) => {
  const changes = Object.values(plan.changes)
  const fires = changes.filter(change => change.type === FIRE_EMPLOYEE)
  const _rises = changes.filter(change => change.type === INCREASE_SALARY)
  // with type-narrowing:
  const rises: giveRiseEmployeeAction[] = changes.filter(isGiveRiseEmployeeAction)
  const riseSum = rises.reduce((sum, change) => sum + change.amount, 0)

  return <>
    {`${fires.length} pracowników do zwolnienia, ${rises.length} otrzyma podwyżkę (w sumie: ${ riseSum } €)`}
  </>
}
