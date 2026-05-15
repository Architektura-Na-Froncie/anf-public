import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Container, Panel } from 'ui/layout';
import { Typography } from 'ui/atoms';

import { ChangeLimitsProcess } from 'lessons/m6/HOMEWORK-change-limits/ChangeLimitsProcess';

export const StatusWrapper = styled.div`
  position: absolute;
  bottom: -30px;
  right: 0;
  padding: 0;
`;

export const ChangeLimits: React.FC = () => {
  const [status, setStatus] = useState<"CLEAN" | "RUNNING" | "SUCCESS" | "FAIL">("CLEAN")
  const start = () => { setStatus("RUNNING") }

  const successFn = () => setStatus("SUCCESS")
  const cancelFn = () => setStatus("FAIL")

  // Clear status on first render
  useEffect(() => start(), []);

  return <>
    <Container>
      <Typography variant='h1'>Ustawienia limitów</Typography>
      <Panel>
        <ChangeLimitsProcess
          onSuccess={successFn}
          onCancel={cancelFn}
        />
      </Panel>
    </Container>
  </>
}
