import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Menu from './Menu'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'
import { isConditionalExpression } from 'typescript'

const defaultMenu = () => (
  <>
    <Menu defaultIndex={0} mode='vertical'>
      <MenuItem>
          clickItem0
      </MenuItem >
      <SubMenu title='SubMenu1'>
        <MenuItem>
            clickItem1
        </MenuItem>  
        <MenuItem>
            clickItem2
        </MenuItem>
      </SubMenu>
      <SubMenu title="SubMenu2">
        <MenuItem>
            clickItem3
        </MenuItem>
        <MenuItem>
            clickItem4
        </MenuItem>
      </SubMenu>

      <MenuItem>
          clickItem5
      </MenuItem>
      <MenuItem>
          clickItem6
      </MenuItem>
    </Menu>
  </>
)





storiesOf('Menu Component', module)
  .add('Menu', defaultMenu)