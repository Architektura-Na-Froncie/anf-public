import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { colors } from 'ui/palette'

const StyledTable = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border: 0;
  border-collapse: collapse;
  width: 100%;

  & thead,
  & tbody,
  & tr,
  & th,
  & td {
    border: 0;
  }

  & td,
  & th {
    padding: 10px 15px;

    &::first-child {
      border-left: 0;
    }
    &::last-child {
      border-right: 0;
    }
  }

  & th {
    border: #fff solid;
    border-width: 0 1px;
    padding-top: 6px;
    padding-bottom: 6px;
    text-transform: uppercase;
    font-size: .85em;
    background-color: ${colors.primary};
    color: white;
  }
`

const TableRow = styled.tr`
  &:nth-child(even){
    background-color: ${rgba(colors.primary, .075)};
  }

  &:hover {
    background-color: ${rgba(colors.primary, .25)};
  }
`

type ColumnAlignment = 'left' | 'center' | 'right';

const TableHeadCell = styled.th<{ align?: ColumnAlignment }>`
  text-align: ${(props) => props.align || 'left' };
`;

const TableCell = styled.td<{ align?: ColumnAlignment }>`
  text-align: ${(props) => props.align || 'left' };
`;

type TableProps<T> = {
  items: T[]
  columns: React.ReactNode[];
  columnsAlignment?: ColumnAlignment[];
  renderItem: (item: T) => React.ReactNode[]
}

export function Table<T extends { id: string | number }>(props: TableProps<T>){
  const { items, columns, columnsAlignment, renderItem } = props;

  return <StyledTable>
    <thead>
      <tr>
        {columns.map((column, idx) => <TableHeadCell key={idx} align={columnsAlignment?.[idx]}>{column}</TableHeadCell>)}
      </tr>
    </thead>
    <tbody>
    { !(items?.length)
      ? "Brak danych"
      : items.map( item => <TableRow key={item.id}>{
      renderItem(item).map((cell, idx) => <TableCell key={`${item.id}-${idx}`} align={columnsAlignment?.[idx]}>{cell}</TableCell>)
    }</TableRow> ) }
    </tbody>
  </StyledTable>
}
