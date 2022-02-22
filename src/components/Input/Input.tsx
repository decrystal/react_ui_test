//从react里面导入InputHTMLAttributes的input默认属性
import React, {FC, InputHTMLAttributes} from 'react';
import classNames from 'classnames'
import { icon } from '@fortawesome/fontawesome-svg-core';
// import {IconProps} from '../Icon/Icon'
import Icon from '../Icon/Icon'
type size = 'lg'|'sm'
//使用oMit忽略InputHTMLAttributes默认属性
export interface inputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  size?: size;
  defaultValut?:string;
  disabled?: boolean;
  icon?:string;
}

const Input: FC<inputProps> = (props)=> {
  const { size, disabled, children, icon, ...restProps} = props;
  const classes = classNames('viking-input-wrapper')
  const cname = classNames('viking-input-inner', {
    [`input-size-${size}`]:size
  })
  //console.log("icon", icon)
  return (
    <div  className={classes}>
      <input className={cname} type="text" {...restProps}/>
      {icon&&<div  className='icon-wrapper'> <Icon className='icon' icon="search"  ></Icon></div>}
    </div>
    
  )
}
// Input.defaultProps = {
//   icon: 'search'
// }
export default Input;