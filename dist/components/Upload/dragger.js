import React, { useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
var Dragger = function (props) {
    var onFile = props.onFile, children = props.children, showText = props.showText;
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    var kclass = classNames('viking-uploader-dragger', {
        'is-dragover': dragOver
    });
    var handleDrag = function (e, over) {
        e.preventDefault();
        setDragOver(over);
    };
    var handleDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        //注意这里的dataTransfer
        //console.log(e.dataTransfer)
        onFile(e.dataTransfer.files);
    };
    //onDragOver,onDragLeave, onDrop都是里面div自带属性
    return (React.createElement("div", { className: kclass, onDragOver: function (e) { handleDrag(e, true); }, onDragLeave: function (e) { handleDrag(e, false); }, onDrop: handleDrop },
        React.createElement("div", null,
            React.createElement(Icon, { className: 'Dragger-icon', color: '#6c757d', size: '5x', icon: 'upload' }),
            React.createElement("p", { className: 'Dragger-text' }, showText))));
};
Dragger.defaultProps = {
    showText: '把文件拖到这里'
};
export default Dragger;
