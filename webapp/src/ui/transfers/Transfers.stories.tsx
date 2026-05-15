import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';

import { transfersJSON } from 'api/mock/transfers.mock'
import { AccountHistory } from 'ui/transfers/AccountHistory';
import { TransfersListing } from './TransfersListing';

export default {
  title: 'Account/Transfers',
  argTypes: {}
} as Meta;

export const _AccountHistory = () => {
  return <AccountHistory />
}

export const _TransfersListing = () => {
  return <TransfersListing transfers={transfersJSON} />
}
