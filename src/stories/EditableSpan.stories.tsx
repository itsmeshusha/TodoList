import React from 'react';
import { action } from '@storybook/addon-actions';
import EditableSpan from '../EditableSpan';


export default {
  title: 'EditableSpan stories',
  component: EditableSpan
}


export const EditableSpanBaseExample = (props: any) => {
  return (<EditableSpan value={"StartValue"} changeValue={action('value changed')}
  />)
}

