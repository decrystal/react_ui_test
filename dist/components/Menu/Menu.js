import React, { createContext, useState } from "react";
import classNames from "classnames";
export var MenuContext = createContext({ index: 0 });
var Menu = function (props) {
    var className = props.className, mode = props.mode, style = props.style, children = props.children, defaultIndex = props.defaultIndex;
    var classes = classNames('menu', className, {
        'menuVertical': mode === 'vertical',
        'menuHorizontal': mode === 'horizontal'
    });
    //打印出一个数组，元素是一个Reactelement
    //自动给child添加index
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var _b = useState(false), isExpand = _b[0], setIsExpand = _b[1];
    var handleClick = function (index) {
        setActive(index);
        //console.log(`index, ${index}`)
    };
    var handleIsExpand = function (isOpen) {
        setIsExpand(isOpen);
    };
    var newchildren = function () {
        return React.Children.map(children, function (child, index) {
            //console.log("menu", index, child)
            //将child声明为react元素（即jsx语法）
            var newChild = child;
            //console.log("child.tagName",newChild)
            var name = newChild.type.name;
            //这个过滤了非MenuItem组件的标签
            if (name === 'MenuItem' || 'SubMenu') {
                return React.cloneElement(newChild, { index: index });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
    };
    //console.log("children", children)
    var passContext = {
        index: currentActive ? currentActive : 0,
        onselect: handleClick,
        mode: mode,
        isExpand: isExpand,
        handleIsExpand: handleIsExpand
    };
    return (
    //因为一般测试是通过渲染后获取元素节点，所以要事先获取节点，通过添加一个data-testid="test-menu来解决
    //测试里用getByTestId来获取
    //data-testid="test-menu是测试时为了让
    React.createElement("ul", { style: style, className: classes, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passContext }, newchildren())));
};
Menu.defaultProps = {
    defaultIndex: 0,
    mode: "horizontal"
};
export default Menu;
