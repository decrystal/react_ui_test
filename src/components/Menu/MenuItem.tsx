import React, {useContext} from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'

export interface MenuItemProps {
  index?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem:React.FC<MenuItemProps> = (props) => {
  const {className, index, disabled, style, children } = props;
  const context = useContext(MenuContext)
  //console.log("disabled=false", disabled)
 
  const classes = classNames(className, 'MenuItem', {
    'is-disabled': disabled,
    'is-active': index===context.index
  })
  
  
  const handleClick = (e:React.MouseEvent)=> {
    console.log("subItem点击里面index", index)
    e.stopPropagation(); 
    //console.log("进来了eeeee",)
    if(context.onselect&&!disabled&&typeof index ==='number'){
      context.onselect(index)
    }
    if(context.handleIsExpand&&context.index!==index){
      context.handleIsExpand(false)
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}
export default MenuItem;