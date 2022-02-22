var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from './Menu';
import Icon from '../Icon/Icon';
import Transition from '../Transition/Transition';
var SubMenu = function (props) {
    var title = props.title, children = props.children, index = props.index;
    var context = useContext(MenuContext);
    //console.log("context-->", context.isExpand, context.index)
    //console.log('subMenu-->', context.mode)
    var classes = classNames('menu', 'subItem', 'MenuItem');
    var subClasses = classNames('subMenuClasses', {
        subHorizontal: context.mode === 'horizontal',
        isOpen: context.index === index && context.isExpand
    });
    var renderChilren = function () {
        return React.Children.map(children, function (child, index) {
            var newChild = child;
            var name = newChild.type.name;
            if (name === 'MenuItem') {
                return React.cloneElement(newChild, { className: 'MenuItem', index: context.index });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
    };
    var timer;
    var handleMouse = function (e, toggle, index) {
        clearTimeout(timer);
        context.onselect(index);
        e.preventDefault();
        clearTimeout(timer);
        timer = setTimeout(function () {
            context.handleIsExpand(toggle);
        }, 0);
    };
    var handleclick = function (e) {
        console.log("subItem里面", context.index, index);
        if (context.handleIsExpand && context.onselect && typeof index === 'number') {
            context.onselect(index);
            if (context.index !== index) {
                context.handleIsExpand(true);
            }
            else {
                context.handleIsExpand(!context.isExpand);
            }
        }
    };
    var handleHover = function () {
        if (typeof index === 'number') {
            return {
                onMouseEnter: function (e) { handleMouse(e, true, index); },
                onMouseLeave: function (e) { handleMouse(e, false, index); }
            };
        }
    };
    var hoverEvents = context.mode === 'horizontal' ?
        handleHover()
        : {};
    var clickEvents = context.mode === 'vertical' ? { onClick: handleclick } : {};
    //useEffect(() => {()=>{setIsExpand(isExpand)}, [isExpand]) // 'newData'
    return (React.createElement("li", __assign({ className: classes }, hoverEvents, clickEvents),
        React.createElement("div", { className: 'subTitle' },
            React.createElement("div", null, title),
            React.createElement(Icon, { className: 'icon', icon: "caret-right" })),
        React.createElement(Transition, { "in": context.isExpand && context.index === index, timeout: 300, appear: true, direction: 'top', unmountOnExit: true },
            React.createElement("ul", { className: subClasses }, renderChilren()))));
};
export default SubMenu;
