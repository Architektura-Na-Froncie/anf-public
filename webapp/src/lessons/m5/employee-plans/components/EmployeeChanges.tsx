import React from 'react'

import { FIRE_EMPLOYEE, INCREASE_SALARY } from '../store/employees/constants'
import { Plan } from '../store/employees/model'
import { Employee } from 'api/employees'
import { ChangeLabel } from './ChangeLabel';

interface EmployeeChangesProps {
  employee: Employee
  plan?: Plan
}

export const EmployeeChanges: React.FC<EmployeeChangesProps> = ({ plan, employee }) => {
  if (!plan) {
    return null;
  } else {
    const change = plan.changes[employee.id];
    if (!change) {
      return (
        <ChangeLabel variant='NEUTRAL'>Bez zmian</ChangeLabel>
      );
    }

    if (change.type === FIRE_EMPLOYEE) {
      return (
        <ChangeLabel variant='NEGATIVE'>Zwolnij</ChangeLabel>
      );
    }

    if (change.type === INCREASE_SALARY) {
      return (
        <ChangeLabel variant='POSITIVE'>
          {change.amount > 0 && '+'}{change.amount} €
        </ChangeLabel>
      );
    }

    return null;
  }
}
