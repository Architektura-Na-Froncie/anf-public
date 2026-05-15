import React, { useEffect, useState } from 'react';

import { Loader, FormatMoney, Typography } from 'ui/atoms';
import { CheckboxField } from 'ui/molecules';

import { EmployeeList } from './EmployeesList';
import { Container } from 'ui/layout';
import styled from 'styled-components';
import { BorderedPanel } from "ui/layout";

import { deleteEmployee, Employee, getEmployees, updateEmployee } from 'api/employees';

const Columns = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -15px;
  align-items: flex-start;
`;

const MainColumn = styled.div`
  flex: 1 1 calc(65% - 30px);
  margin: 0 15px;
`;

const SalarySummariesGrid = styled.ul`
  display: grid;
  grid-template-columns: 1fr max-content;
  column-gap: 1rem;
  row-gap: .5rem;
  margin: 0;
  padding: 0;
  list-style: none;
`

const SalarySummariesCell = styled.div<{
  align?: 'left' | 'right' | 'center',
}>`
  text-align: ${(props) => props.align || 'auto'};
`

interface EmployeesViewProps {
}

export const EmployeesView: React.FC<EmployeesViewProps> = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  /**
   * 🔥 UWAGA!
   *
   * pozostaje do zrobienia obsługa sytuacji, w której komponent zostaje odmontowany zanim nadejdzie odpowiedź z API:
   * - anulowanie promisy
   * - wyniesienie stanu ponad komponent (Moduły 4 i 5 - zarządzanie stanem)
   */
  useEffect(() => {
    getEmployees().then((response) => setEmployees(response));
  }, []);

  const onFire = (e: Employee) => {
    deleteEmployee(e.id)
      .then(() => getEmployees())
      .then((response) => setEmployees(response));
  }

  const onGiveRise = (e: Employee) => {
    updateEmployee({ ...e, salary: e.salary + 100 })
      .then(() => getEmployees())
      .then((response) => setEmployees(response));
  }

  const [displaySalarySummaries, setDisplaySalarySummaries] = useState(true)

  const calculateTotalSalary = () => {
    return employees.reduce((sum, e) => sum + e.salary, 0)
  }

  return (
    <Container>
      <Typography variant="h1">Plany Kadrowe</Typography>
      <Typography variant="decorated">Pewne w życiu są: śmierć, podatki i zmiany kadrowe</Typography>

      <Columns>
        <MainColumn>
          <BorderedPanel>
            <div style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center' }}>
              <div style={{ flex: '1 1 auto' }}>
                <Typography variant="h2">Koszty pensji</Typography>
              </div>
              <div style={{ flex: '0 0 auto' }}>
                <CheckboxField
                  id="display-salary-summaries-checkbox"
                  label="Pokaż podsumowanie okresowe"
                  defaultChecked={displaySalarySummaries}
                  onChange={setDisplaySalarySummaries}
                />
              </div>
            </div>
            <SalarySummariesGrid>
              <SalarySummariesCell>Miesięczny koszt pensji:</SalarySummariesCell>
              <SalarySummariesCell align="right"><FormatMoney amount={calculateTotalSalary()} /></SalarySummariesCell>
              {displaySalarySummaries && <>
              <SalarySummariesCell>Kwartalny koszt pensji:</SalarySummariesCell>
              <SalarySummariesCell align="right"><FormatMoney amount={calculateTotalSalary() * 3} /></SalarySummariesCell>
              <SalarySummariesCell>Roczny koszt pensji:</SalarySummariesCell>
              <SalarySummariesCell align="right"><FormatMoney amount={calculateTotalSalary() * 12} /></SalarySummariesCell>
              </>}
            </SalarySummariesGrid>
          </BorderedPanel>
        </MainColumn>
      </Columns>

      {employees.length
        ? <>
          <EmployeeList
            employees={employees}
            onGiveRiseClick={onGiveRise}
            onFireClick={onFire}
          />
        </> : <Loader />
      }
    </Container>
  );
}
