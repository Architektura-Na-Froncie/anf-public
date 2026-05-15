import React from 'react';
import styled from 'styled-components';

import { Typography } from 'ui/atoms/Typography';
import { UserErrorMessage, getErrorMessage } from './messages';

interface ErrorContentProps {
  message: UserErrorMessage,
  noImage?: boolean,
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
Wrapper.displayName = "Wrapper";

export const ErrorContent: React.FC<ErrorContentProps> = (props) => {
  const { message, noImage = false } = props
  return <Wrapper>
    {!noImage && <img src="/hanging-monkey.png" alt="error occurred" width="120px" />}
    <Typography variant="h1">Oops...</Typography>
    <Typography variant="bold">{getErrorMessage(message)}</Typography>
  </Wrapper>
}
