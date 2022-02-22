import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from './button'
import { isConditionalExpression } from 'typescript'

const defaultButton = () => (
  <Button onClick={action('click', {depth:2})}> default button </Button>
)

const buttonWithSize = () => (
  <>
    <Button size='lg' btnType='primary' >hello Tommy nihao</Button>
    <Button size='sm' btnType='danger'>hello Tommy nihao</Button>
      <Button size='lg' btnType='default' >hello Tommy nihao</Button>
      <Button size='sm' btnType='link'>hello Tommy</Button>
    <Button size="lg"> large button </Button>
    <Button size="sm"> small button </Button>
  </>
)

const buttonWithType = () => (
  <>
    <Button btnType="primary"> primary button </Button>
    <Button btnType="danger"> danger button </Button>
    <Button btnType="link" href="https://google.com"> link button </Button>
  </>
)
storiesOf('button Component', module)
  .add('Button', defaultButton)
  .add('不同尺寸的 Button', buttonWithSize)
  .add('不同类型的 Button', buttonWithType)