import React from 'react';
import { action } from '@storybook/addon-actions';
import AppWithRedux from '../AppWithRedux';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator'


export default {
  title: 'AppWithRedux stories',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
}


export const AppWithReduxBaseExample = (props: any) => {
  return (<AppWithRedux />)
}

