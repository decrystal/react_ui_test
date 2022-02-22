import React ,{createContext, useEffect, useState, useContext} from "react";
import classNames from "classnames";
import {MenuItemProps} from './MenuItem'
import {MenuContext} from './Menu'
import Icon from '../Icon/Icon'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

import { CSSTransition } from 'react-transition-group'
import Transition from '../Transition/Transition'


export interface SubMenuPops {
  index?:number
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

const SubMenu: React.FC<SubMenuPops> = (props)=> {
  const {title, children, index} = props
  const context = useContext(MenuContext)
  //console.log("context-->", context.isExpand, context.index)
  //console.log('subMenu-->', context.mode)
  const classes = classNames('menu', 'subItem', 'MenuItem')
  const subClasses = classNames('subMenuClasses', {
    subHorizontal:context.mode==='horizontal',
    isOpen: context.index===index&&context.isExpand,
  })
  const renderChilren = ()=> {
    return React.Children.map(children, (child, index)=>{
      
      const newChild = child as React.FunctionComponentElement<MenuItemProps>
      const { name } = newChild.type;
      if(name === 'MenuItem'){
        return React.cloneElement(newChild, {className: 'MenuItem', index: context.index})
      }else{
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
  }
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean,index:number) => {
    clearTimeout(timer)
    context.onselect!(index);
    e.preventDefault()
    clearTimeout(timer)
    timer = setTimeout(() => {
      context.handleIsExpand!(toggle)
    }, 0)
   
  }
  const handleclick = (e:React.MouseEvent)=> {
    console.log("subItem里面",  context.index, index)
    if(context.handleIsExpand&&context.onselect&&typeof index==='number') {
      context.onselect(index)
      if(context.index!==index){
        context.handleIsExpand(true)
      }else{
        context.handleIsExpand(!context.isExpand)
      }
    }
  }
  const handleHover = ()=>{
    if(typeof index === 'number'){
      return {
        onMouseEnter: (e: React.MouseEvent) => {  handleMouse(e, true, index) },
        onMouseLeave: (e: React.MouseEvent) => {  handleMouse(e, false, index) }
      }
   }
}
  const hoverEvents = context.mode === 'horizontal' ? 
    handleHover()
   : {}
  const clickEvents = context.mode==='vertical'? {onClick:handleclick}:{}
  //useEffect(() => {()=>{setIsExpand(isExpand)}, [isExpand]) // 'newData'
  return (
    <li className={classes} {...hoverEvents} {...clickEvents}>
      <div className='subTitle' >
        <div>{title}</div>
        <Icon className='icon' icon="caret-right"  ></Icon>
      </div>
     
         <Transition 
            in={context.isExpand&&context.index===index}
            timeout={300}
            appear={true}
            direction='top'
            unmountOnExit={true}>
          <ul className={subClasses} >
            {renderChilren()}
          </ul>
       </Transition>
      
    </li>
  )

}

export default SubMenu;