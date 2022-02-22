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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
//从react里面导入InputHTMLAttributes的input默认属性
import React from 'react';
import classNames from 'classnames';
// import {IconProps} from '../Icon/Icon'
import Icon from '../Icon/Icon';
var Input = function (props) {
    var _a;
    var size = props.size, disabled = props.disabled, children = props.children, icon = props.icon, restProps = __rest(props, ["size", "disabled", "children", "icon"]);
    var classes = classNames('viking-input-wrapper');
    var cname = classNames('viking-input-inner', (_a = {},
        _a["input-size-" + size] = size,
        _a));
    //console.log("icon", icon)
    return (React.createElement("div", { className: classes },
        React.createElement("input", __assign({ className: cname, type: "text" }, restProps)),
        icon && React.createElement("div", { className: 'icon-wrapper' },
            " ",
            React.createElement(Icon, { className: 'icon', icon: "search" }))));
};
// Input.defaultProps = {
//   icon: 'search'
// }
export default Input;
