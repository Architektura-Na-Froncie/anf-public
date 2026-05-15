import React from 'react'
import styled from 'styled-components';

import { Button, ButtonIcon, Typography, FormatMoney } from 'ui/atoms'
import { ButtonList } from 'ui/molecules'

import { Employee } from 'api/employees'

const colors = {
  borderColor: 'rgba(0, 0, 0, .15)',
}

const EmployeeUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: 992px) {
    display: table;
  }
`;

const EmployeeLi = styled.li`
  display: grid;
  grid-template-columns: 100fr 1fr;
  margin-bottom: 15px;
  padding: 16px;
  background: #fff;
  border: 2px solid ${colors.borderColor};
  border-radius: 8px;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 100fr 1fr 1fr;
    column-gap: 20px;
  }
`;

const EmployeeDetails = styled.div`
  grid-row: 2;
  grid-column: 1 / span 2;
  font-size: .85rem;
  box-sizing: border-box;

  @media (min-width: 480px) {
    grid-column: 1;
  }

  @media (min-width: 992px) {
    position: relative;
    grid-row: 1;
    grid-column: 2;
    padding-right: 16px;

    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      border-left: 2px solid ${colors.borderColor};
      content: '';
    }
  }
`;

const EmployeeName = styled.strong`
  display: block;
  margin-bottom: 6px;
  font-size: 1rem;
`

const EmployeeSalary = styled.div`
  grid-row: 1;
  grid-column: 2;
  white-space: nowrap;
  margin-left: 16px;
  text-align: right;
  box-sizing: border-box;

  @media (min-width: 480px) {
    grid-row: 2;
    width: 7em; /* wystarczające żeby pomieścić 7-cyfrową pensję 😁*/
    padding-left: 16px;
    border-left: 2px solid ${colors.borderColor};
  }

  @media (min-width: 992px) {
    grid-row: 1;
    grid-column: 3;
    align-self: center;
    padding-left: 0;
    border: none;
  }
`;

const EmployeeButtons = styled(ButtonList)`
  grid-row: 3;
  grid-column: 1/span 2;

  && ${Button} {
    min-width: 0;
    font-size: 14px;
  }

  @media (min-width: 992px) {
    grid-row: 1;
    grid-column: 4;
    white-space: nowrap;
    margin-top: 0;
    align-self: center;
  }
`;

interface EmployeeListProps {
  employees: Employee[]
  onGiveRiseClick: (e: Employee) => void
  onFireClick: (e: Employee) => void
}

export const EmployeeList: React.FC<EmployeeListProps> = ({
  employees, onGiveRiseClick, onFireClick
}) => {

  return <>
    <Typography variant="h2">Pracownicy</Typography>
    <EmployeeUl>
      {employees.map((employee) => (
        <EmployeeLi key={employee.id}>
          <EmployeeDetails>
            <EmployeeName>{employee.firstName} {employee.lastName}</EmployeeName>
            {employee.title}
            {employee.skills?.length > 0 && (
              <em>{' (' + employee.skills.join(', ') + ')'}</em>
            )}
          </EmployeeDetails>

          <EmployeeSalary>
            <FormatMoney amount={employee.salary} />
          </EmployeeSalary>

          <EmployeeButtons>
            <Button variant="OUTLINED" onClick={() => onGiveRiseClick(employee)}>
              <ButtonIcon>⬆︎</ButtonIcon> Daj podwyżkę
            </Button>
            <Button variant="OUTLINED" onClick={() => onFireClick(employee)}>
              <ButtonIcon>∅</ButtonIcon> Zwolnij
            </Button>
          </EmployeeButtons>
        </EmployeeLi>
      ))}
    </EmployeeUl>
  </>;
}
