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
import React from "react";
import classNames from 'classnames';
var Button = function (props) {
    var _a;
    var btnType = props.btnType, disabled = props.disabled, size = props.size, children = props.children, className = props.className, href = props.href, restProps = __rest(props, ["btnType", "disabled", "size", "children", "className", "href"]);
    //从react导入ButtonHTMLAttributes, AnchorHTMLAttributes获取a、button标签剩余属性
    //通过...restProps来获取
    var classes = classNames('btn', (_a = {},
        //下面btnType,size,只是充当布尔值的作用，true or false控制类名有没有
        //样式名（类名）[`btn-${btnType}`]来添加，而且
        //模版字符串为防止报错，用[]圈起来
        _a["btn-" + btnType] = btnType,
        _a["btn-" + size] = size,
        //这个disabled是针对a的，button直接传值
        _a['disabled'] = (btnType === "link") && disabled,
        _a));
    //console.log("className--->>", className, classes)
    if (btnType === 'link' && href) {
        //console.log("href=======",href)
        return (React.createElement("a", __assign({ href: href }, restProps, { className: classes }), children));
    }
    else {
        return (React.createElement("button", __assign({ className: classes, disabled: disabled }, restProps), children));
    }
};
Button.defaultProps = {
    disabled: false,
    btnType: 'default'
};
export default Button;
