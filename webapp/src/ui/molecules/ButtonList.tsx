import React from 'react';
import styled from 'styled-components';
import { Button } from 'ui/atoms';

export interface ButtonListProps {
  align?: 'left' | 'center' | 'right',
};

const buttonMargin = '.75rem';

const ButtonListWrapper = styled.div<ButtonListProps>`
  margin: 1.5rem 0 -${buttonMargin} -${buttonMargin};
  text-align: ${props => props.align || 'left'};

  && ${Button} {
    min-width: 8rem;
    margin: 0 0 ${buttonMargin} ${buttonMargin};
  }
`;

export const ButtonList: React.FC<ButtonListProps> = (props) => {
  const { align, children, className } = props as any;
  return <ButtonListWrapper align={align} className={className}>
    {children}
  </ButtonListWrapper>
}
