import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Input from './Input'
import { isConditionalExpression } from 'typescript'

const defaultInput = () => (
  <>
    <Input icon='search'></Input>
    <Input size='lg'></Input>
    <Input size='sm' ></Input>
  </>
)





storiesOf('Input Component', module)
  .add('defaultInput', defaultInput)