import React from "react";
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
declare type trans_direction = 'top' | 'left' | 'right' | 'right';
declare type transitionProps = CSSTransitionProps & {
    direction?: trans_direction;
};
declare const Transition: React.FC<transitionProps>;
export default Transition;
