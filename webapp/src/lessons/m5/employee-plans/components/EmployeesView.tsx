import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid'

import { Employee } from 'api/employees';
import { Plan } from '../store/employees/model';
import { getCurrentPlan, getCurrentPlanID } from '../store/selectors';
import { createPlan, selectPlan, fireEmployee, increaseSalary, resetChanges } from '../store/employees/actions';
import { fetchEmployeesThunk } from '../store/employees/thunks';
import { AppState, AppStore } from '../store';

import { Loader, FormatMoney, Typography, Button } from 'ui/atoms';
import { CheckboxField } from 'ui/molecules';

import { EmployeeList } from './EmployeesList';
import { Container } from 'ui/layout';
import styled from 'styled-components';
import { EmployeePlanCreate } from './EmployeePlanCreate';
import { ChangeLabel } from './ChangeLabel';
import { BorderedPanel } from "ui/layout";
import { EmployeePlanDetails } from './EmployeePlanDetails';

interface EmployeesViewProps {
}

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

const SideColumn = styled.div`
  flex: 1 1 calc(35% - 30px);
  margin: 0 15px;
`;

const PlansList = styled.ul`
  list-style: none;
  text-align: left;
  margin: 0;
  background: #fff;
  padding: 0 0 10px;
  position: absolute;
  left: -2px;
  right: -2px;
  bottom: 0;
  transform: translateY(100%);
  z-index: 10;
  white-space: nowrap;
  border-radius: 0 0 8px 8px;
  border: 2px solid rgba(0, 0, 0, .15);
  border-top: 1px solid rgba(0, 0, 0, .15);
  box-sizing: border-box;
  box-shadow: 0 10px 7px -1px rgba(0, 0, 0, .35);
`;

const PlansItem = styled.li`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 10px;
  margin-bottom: 8px;
  align-items: center;

  && ${Button} {
    flex: 0 0 auto;
  }
`;

const PlanDetails = styled.button`
  flex: 1 1 auto;
  padding-left: 20px;
  font-size: .9rem;
  appearance: none;
  margin: 0;
  padding: 5px 20px;
  border: 0;
  background: none;
  box-shadow: none;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, .05);
  }
`;

const PlanTitle = styled.div`
  position: relative;
  font-size: 1rem;
`

const PlanCheck = styled.div`
  position: absolute;
  top: .1em;
  left: -16px;
`

const SalarySummariesGrid = styled.ul`
  display: grid;
  grid-template-columns: 1fr max-content max-content;
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

export const EmployeesView: React.FC<EmployeesViewProps> = () => {
  const employees = useSelector((state: AppState) => state.employees.data)
  const plans = useSelector((state: AppState) => state.employees.plans)
  const currentPlan = useSelector(getCurrentPlan)
  const currentPlanID = useSelector(getCurrentPlanID)

  const dispatch: AppStore['dispatch'] = useDispatch()

  useEffect(() => {
    dispatch(fetchEmployeesThunk())
  }, [dispatch])

  const onCreatePlan = (planName: string) => {
    planName = planName || `plan no. ${Math.round(Math.random() * 100)}`
    const action = createPlan(uuid(), planName)

    // Dla wygody użytkownika nowo utworzony plan jest od razu wybierany.
    // W Reduksie chcemy mieć te akcje osobno, natomiast jeśli nie chcemy,
    // żeby komponent wysyłał dwie akcje, to można opakować obie akcje w thunka.
    dispatch(action);
    dispatch(selectPlan(action.planId));
  }

  const onSelectPlan = (plan: Plan) => {
    dispatch(selectPlan(plan.id))
  }

  const onFire = (e: Employee) => {
    dispatch(fireEmployee(e.id, currentPlanID))
  }

  const onGiveRise = (e: Employee) => {
    dispatch(increaseSalary(e.id, 100, currentPlanID))
  }

  const onReset = (e: Employee) => {
    dispatch(resetChanges(e.id, currentPlanID));
  }

  const [displaySalarySummaries, setDisplaySalarySummaries] = useState(true)

  const calculateTotalSalary = () => {
    return employees.reduce((sum, e) => sum + e.salary, 0)
  }

  const [plansShown, setPlansShown] = useState(false);

  return (
    <Container>
      <Typography variant="h1">Plany Kadrowe</Typography>
      <Typography variant="decorated">Pewne w życiu są: śmierć, podatki i zmiany kadrowe</Typography>

      <Columns>
        <MainColumn>
          <BorderedPanel style={{
            display: 'flex',
            flexFlow: 'row nowrap',
            ...(plansShown ? { borderRadius: '8px 8px 0 0' } : { borderRadius: '8px' })
          }}>
            <div style={{ flex: '1 1 auto' }}>
              {currentPlan && <>
                <Typography variant="h2"><strong>{currentPlan.title}</strong></Typography>
                <EmployeePlanDetails plan={currentPlan}></EmployeePlanDetails>
              </>}
            </div>

            <div style={{ flex: '0 0 auto'}}>
              <Button onClick={() => setPlansShown(!plansShown)}>Zmień</Button>
            </div>

            {plansShown && (
              <PlansList>
                <p style={{ margin: '20px 30px 15px' }}>Dostępne plany:</p>
                {Object.values(plans).map(plan => {
                  const isChosenPlan = plan.id === currentPlan?.id
                  return (
                    <PlansItem key={plan.id}>
                      <PlanDetails type="button" onClick={() => { onSelectPlan(plan); setPlansShown(false); }} aria-label="Kliknij aby wybrać plan">
                        <PlanTitle>
                          {isChosenPlan && <PlanCheck>✓</PlanCheck>}
                          <span style={isChosenPlan ? { fontWeight: 'bold' } : undefined}>{plan.title}</span>
                        </PlanTitle>
                        <EmployeePlanDetails plan={plan} />
                      </PlanDetails>
                    </PlansItem>
                  );
                })}
              </PlansList>
            )}
          </BorderedPanel>

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
              <SalarySummariesCell><ChangeLabel>Bez zmian</ChangeLabel></SalarySummariesCell>
              {displaySalarySummaries && <>
              <SalarySummariesCell>Kwartalny koszt pensji:</SalarySummariesCell>
              <SalarySummariesCell align="right"><FormatMoney amount={calculateTotalSalary() * 3} /></SalarySummariesCell>
              <SalarySummariesCell><ChangeLabel>Bez zmian</ChangeLabel></SalarySummariesCell>
              <SalarySummariesCell>Roczny koszt pensji:</SalarySummariesCell>
              <SalarySummariesCell align="right"><FormatMoney amount={calculateTotalSalary() * 12} /></SalarySummariesCell>
              <SalarySummariesCell><ChangeLabel>Bez zmian</ChangeLabel></SalarySummariesCell>
              </>}
            </SalarySummariesGrid>
          </BorderedPanel>
        </MainColumn>
        <SideColumn>
          <EmployeePlanCreate onCreatePlanClicked={onCreatePlan} />
        </SideColumn>
      </Columns>

      {employees.length
        ? <>
          <EmployeeList
            employees={employees}
            plan={currentPlan}
            onGiveRiseClick={onGiveRise}
            onFireClick={onFire}
            onResetClick={onReset}
          />
        </> : <Loader />
      }
    </Container>
  );
}
