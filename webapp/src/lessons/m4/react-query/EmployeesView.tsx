import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Loader, FormatMoney, Typography, Button } from 'ui/atoms';
import { CheckboxField } from 'ui/molecules';
import { Container, BorderedPanel } from 'ui/layout';

import { EmployeeList } from './EmployeesList';
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

const calculateTotalSalary = (employees: Employee[]) => {
  return employees.reduce((sum, e) => sum + e.salary, 0)
}

interface EmployeesViewProps {
}

export const EmployeesView: React.FC<EmployeesViewProps> = () => {
  const [page, setPage] = useState(1)
  /**
   * 🔥 UWAGA!
   *
   * okrojona paginacja - brakuje sprawdzania corner-case'ów, m.in.
   * - nie sprawdzamy, czy wyszliśmy POZA kolekcję (dla NEXT)
   * - a także - button NEXT powinien być zablokowany, jeśli NIE ma następnej strony
   *   (jest zwracany header X-Total-Count - trzeba by się do niego dobrać i na podstawie rozmiaru strony ==50 obliczyć czy to już ostatnia strona)
   */
  const hasPrevPage = page > 1
  const setPrevPage = () => setPage(p => p - 1)
  const hasNextPage = true
  const setNextPage = () => setPage(p => p + 1)

  // Query - pobieranie danych
  const {
    isLoading, isSuccess, isError, data
  } = useQuery<Employee[]>(['employees', page], () => getEmployees(page), {
    staleTime: 5000,
    cacheTime: 120000,
  })

  // Mutacje
  const queryClient = useQueryClient()
  const fireMutation = useMutation(deleteEmployee, {
    onSuccess: () => {
      queryClient.invalidateQueries() // inwalidujemy wszystkie dane, bo posypała się nam kolejność
    },
  })
  const salaryMutation = useMutation(updateEmployee, {
    onSuccess: () => {
      queryClient.invalidateQueries(['employees', page]) // inwalidujemy tylko daną stronę
    },
  })

  const [displaySalarySummaries, setDisplaySalarySummaries] = useState(true)

  return (
    <Container>
      <Typography variant="h1">Kadry</Typography>
      <Typography variant="decorated">Pewne w życiu są: śmierć, podatki i zmiany kadrowe</Typography>

      <Button variant="SECONDARY" disabled={!hasPrevPage} onClick={setPrevPage}>poprzednia</Button>
      {page}
      <Button variant="SECONDARY" disabled={!hasNextPage} onClick={setNextPage}>następna</Button>

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
            {isSuccess && (<SalarySummariesGrid>
              <SalarySummariesCell>Miesięczny koszt pensji:</SalarySummariesCell>
              <SalarySummariesCell align="right"><FormatMoney amount={calculateTotalSalary(data)} /></SalarySummariesCell>
              {displaySalarySummaries && <>
              <SalarySummariesCell>Kwartalny koszt pensji:</SalarySummariesCell>
              <SalarySummariesCell align="right"><FormatMoney amount={calculateTotalSalary(data) * 3} /></SalarySummariesCell>
              <SalarySummariesCell>Roczny koszt pensji:</SalarySummariesCell>
              <SalarySummariesCell align="right"><FormatMoney amount={calculateTotalSalary(data) * 12} /></SalarySummariesCell>
              </>}
            </SalarySummariesGrid>)}
          </BorderedPanel>
        </MainColumn>
      </Columns>

      {isSuccess
        ? <EmployeeList
          employees={data!}
          onGiveRiseClick={employee => salaryMutation.mutate({ id: employee.id, salary: employee.salary + 100 })}
          onFireClick={employee => fireMutation.mutate(employee.id)}
        /> : <Loader />
      }
    </Container>
  );
}
