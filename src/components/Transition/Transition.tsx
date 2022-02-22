import React ,{createContext, useEffect, useState, useContext} from "react";
import classNames from "classnames";
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type trans_direction = 'top'|'left'|'right'|'right'

type transitionProps = CSSTransitionProps&  {
  direction?: trans_direction;

}

const Transition:React.FC<transitionProps> = (props)=> {
  const { children, direction, ...restProps} = props 
  const test = direction? direction: 'top'
  return (
    <CSSTransition 
      classNames={test}
      {...restProps}
    >
      {children}
    </CSSTransition>
  )

}

Transition.defaultProps = {
  direction: 'top'
}

export default Transition;