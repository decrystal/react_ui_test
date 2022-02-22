import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu';
var MenuItem = function (props) {
    var className = props.className, index = props.index, disabled = props.disabled, style = props.style, children = props.children;
    var context = useContext(MenuContext);
    //console.log("disabled=false", disabled)
    var classes = classNames(className, 'MenuItem', {
        'is-disabled': disabled,
        'is-active': index === context.index
    });
    var handleClick = function (e) {
        console.log("subItem点击里面index", index);
        e.stopPropagation();
        //console.log("进来了eeeee",)
        if (context.onselect && !disabled && typeof index === 'number') {
            context.onselect(index);
        }
        if (context.handleIsExpand && context.index !== index) {
            context.handleIsExpand(false);
        }
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleClick }, children));
};
export default MenuItem;
