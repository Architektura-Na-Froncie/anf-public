import styled, { css } from 'styled-components';

export const Grid = styled.div`
  display: table;
  max-width: 600px;
  width: 100%;
  border-collapse: collapse;
`

export const Row = styled.div`
  display: table-row;
`;

type CellVariant = 'amount' | 'action';

export const Cell = styled.div<{ variant?: CellVariant }>`
  display: table-cell;
  text-align: left;
  padding: 0 10px 1rem;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }

  ${(props) => props.variant === 'amount' && css`
    text-align: right;
    white-space: nowrap;
    width: 6rem;
  `}

  ${(props) => props.variant === 'action' && css`
    width: 1px;
  `}
`;
