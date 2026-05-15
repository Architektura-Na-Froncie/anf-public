import React from 'react';
import { Transfer } from 'api/transfers';

import { FormatDate, FormatMoney } from 'ui/atoms';
import { Table } from './Table';

interface TransfersListingProps {
  transfers: Transfer[]
}

export const TransfersListing: React.FC<TransfersListingProps> = (props) => {
  const { transfers } = props
  return <Table
    items={transfers}
    columns={['Data', 'Tytuł', 'Kwota', 'Odbiorca']}
    columnsAlignment={['left', 'left', 'right', 'left']}
    renderItem={t => [
      <FormatDate date={t.scheduledAt} />,
      <>{t.title}</>,
      <FormatMoney amount={t.amount} />,
      <>{t.beneficiaryAddress}</>,
    ]}
  />
}
