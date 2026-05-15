import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import {
  AuthorizeDeviceChooseMethodView,
  AuthorizeDeviceAllowOnceTokenView,
  AuthorizeDeviceAddDeviceFormView,
  AuthorizeDeviceAddDeviceTokenView,
  AuthorizeDeviceAddDeviceConfirmationView,
} from 'ui/authorize-device/views'

export default {
  title: 'Authorize Device/Views',
  argTypes: {
    addDeviceToTrusted: { action: 'addDeviceToTrusted' },
    allowDeviceOnce: { action: 'allowDeviceOnce' },
  }
} as Meta;

export const ChooseMethod = () =>
  <AuthorizeDeviceChooseMethodView
    onAddDeviceToTrusted={action('addDeviceToTrusted')}
    onAllowDeviceOnce={action('onAllowDeviceOnce')}
    onLogout={action('onLogout')}
  />

export const AddDeviceForm = () =>
  <AuthorizeDeviceAddDeviceFormView
    onSubmit={action('submit')}
  />

export const AllowOnceToken = () =>
  <AuthorizeDeviceAllowOnceTokenView
    instruction="Wpisz hasło SMS"
    onSubmit={action('submit')}
    onCancel={action('cancel')}
    error={false}
  />

export const AddDeviceToken = () =>
  <AuthorizeDeviceAddDeviceTokenView
    deviceName="Mój maczek"
    instruction="Wpisz hasło SMS"
    onSubmit={action('submit')}
    onReset={action('reset')}
    onCancel={action('cancel')}
    error={false}
  />

export const AddDeviceConfirmation = () =>
  <AuthorizeDeviceAddDeviceConfirmationView
    deviceName="Mój maczek"
    onClose={action('close')}
  />
