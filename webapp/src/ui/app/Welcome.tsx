import React from 'react';
import styled from 'styled-components';

import { Logo } from 'ui/app/Logo';
import { Container } from 'ui/layout';

const LogoWrapper = styled.div`
  text-align: center;

  svg {
    [fill="#fff"] {
      fill: #000;
    }
  }
`;

export const Welcome: React.FC = () => {
  return <>
    <Container>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
    </Container>
  </>
}
