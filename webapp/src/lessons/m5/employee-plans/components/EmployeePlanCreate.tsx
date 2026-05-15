import React, { useCallback, SyntheticEvent, useRef } from 'react';

import { UncontrolledTextField } from 'ui/molecules';
import { Button, Typography } from 'ui/atoms';
import { BorderedPanel } from 'ui/layout';
import styled from 'styled-components';

interface EmployeePlanSelectProps {
  onCreatePlanClicked: (planName: string) => void
}

const FieldsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  margin: 0 -.5rem;

  && > * {
    flex: 1 1 auto;
    margin: 0 .5rem;
  }

  && > ${Button} {
    flex: 0 0 auto;
    margin-top: 1rem;
  }
`;

export const EmployeePlanCreate: React.FC<EmployeePlanSelectProps> = ({
  onCreatePlanClicked
}) => {
  const planNameRef = useRef<HTMLInputElement>(null) // 😎 bez nulla wyskakuje błąd kompilacji (jeśli nic nie podamy, to TS wskakuje w overload z undefinedem - tak są zdefiniowane typingi w reakcie; jak podamy nulla explicite, to wskoczy w inny overload i nie uzupełni o undefined)

  const onCreatePlan = useCallback((e: SyntheticEvent) => {
    onCreatePlanClicked(planNameRef.current?.value ?? "")
    if (planNameRef.current){
      planNameRef.current.value = '';
    }
    e.preventDefault()
  }, [onCreatePlanClicked])

  return (
    <BorderedPanel>
      <Typography variant="h2">Nowy plan kadrowy</Typography>
      <form onSubmit={onCreatePlan}>
        <FieldsWrapper>
          <UncontrolledTextField
            id="employee-plan-input"
            label="Plan name"
            ref={planNameRef}
            placeholder="Nazwa planu"
            layoutDirection="vertical"
            noMargin
          />
          <Button onClick={onCreatePlan}>Nowy plan</Button>
        </FieldsWrapper>
      </form>
    </BorderedPanel>
  );
}
