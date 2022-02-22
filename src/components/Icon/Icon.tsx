import React, {FC} from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}

const Icon: React.FC<IconProps> = (props) => {
  const {className, theme, ...resProps} = props;
  const classes = classNames( {
    [`icon-${theme}`]: theme
  },className)
  return (
    <FontAwesomeIcon {...resProps} className={classes} />
  )
}

export default Icon