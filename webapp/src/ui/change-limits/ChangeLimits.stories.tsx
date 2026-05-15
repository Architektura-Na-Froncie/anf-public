import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import {
  ChangeLimitsAmountFormView,
  ChangeLimitsListingView,
  ChangeLimitsVerificationMethodFormView,
  ChangeLimitsTokenView,
} from './views'

export default {
  title: 'Change Limits/Views',
  parameters: {
  },
  argTypes: {}
} as Meta;

export const Listing = () =>
  <ChangeLimitsListingView
    settings={{
      dailyLimit: 500,
      availableDailyAmount: 500,
      monthlyLimit: 10000,
      availableMonthlyAmount: 9876.54,
      verificationMethod: 'SMS-CODE',
    }}
    onChangeDailyLimit={action('change daily limit')}
    onChangeMonthlyLimit={action('change monthly limit')}
    onChangeVerificationMethod={action('change verification method')}
  />

export const LimitsAmountForm = () =>
  <ChangeLimitsAmountFormView
    limitType="DAILY"
    settings={{
      dailyLimit: 500,
      availableDailyAmount: 500,
      monthlyLimit: 10000,
      availableMonthlyAmount: 9876.54,
      verificationMethod: 'SMS-CODE',
    }}
    onApply={action('apply')}
    onCancel={action('cancel')}
  />

export const VerificationMethodForm = () =>
  <ChangeLimitsVerificationMethodFormView
    settings={{
      dailyLimit: 500,
      availableDailyAmount: 500,
      monthlyLimit: 10000,
      availableMonthlyAmount: 9876.54,
      verificationMethod: 'SCRATCH-CARD-CODE',
    }}
    onApply={action('apply')}
    onCancel={action('cancel')}
  />

export const LimitsToken = () =>
  <ChangeLimitsTokenView
    settings={{
      dailyLimit: 500,
      availableDailyAmount: 500,
      monthlyLimit: 10000,
      availableMonthlyAmount: 9876.54,
      verificationMethod: 'SMS-CODE',
    }}
    instruction="Podaj SMS kod"
    onSubmit={action('submit')}
    onReset={action('reset')}
    onCancel={action('cancel')}
    error={false}
  />
