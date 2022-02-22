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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useRef, useState } from "react";
import Button from "../Button/button";
import axios from 'axios';
import UploadList from "./uploadList";
import Dragger from "./dragger";
var Upload = function (props) {
    var inputRef = useRef(null);
    var action = props.action, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, beforeUpload = props.beforeUpload, defaultFileList = props.defaultFileList, header = props.header, drag = props.drag, data = props.data, accept = props.accept, multiple = props.multiple;
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var handleClick = function () {
        // console.log('inputRef', inputRef.current?.click)
        if (inputRef.current) {
            console.log("lfadjl", inputRef);
            inputRef.current.click();
        }
    };
    var updateFileList = function (updateFile, updateObj) {
        console.log('updateFileList中得是最新的updateFile', updateFile, updateObj.status);
        console.log();
        setFileList(function (prevList) {
            //prevList里面的每一个item更新变化通过uid判断
            //因为每次要拿到之前set之后的值，（还是异步的）只是提前拿到set之后的值用来进行处理，所以在set里面传入一个函数，函数参数是（set之后）以前的值
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleRemove = function (file) {
        setFileList(function (pre) {
            return pre.filter(function (item) { return item.uid !== file.uid; });
        });
    };
    var post = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            size: file.size,
            name: file.name,
            raw: file
        };
        // setFileList([_file,...fileList])
        setFileList(function (prevList) {
            console.log("prevList", prevList);
            return __spreadArray([_file], prevList, true);
        });
        var formData = new FormData();
        formData.append(file.name, file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, header), { 'content-type': 'multipart/form-data' }),
            onUploadProgress: function (e) {
                console.log("fileList-->", fileList, "e", e);
                var percentage = Math.round(e.loaded * 100 / e.total);
                console.log(percentage);
                if (percentage < 100) {
                    updateFileList(_file, { status: 'uploading', percentage: percentage });
                    console.log('进度条');
                    onProgress(percentage, file);
                }
                console.log("onUploadProgress-->里面的参数");
            }
        }).then(function (res) {
            //onChange!(res)
            //_file是
            updateFileList(_file, { status: 'success', percentage: 100, response: res.data });
            if (onSuccess) {
                onSuccess(res);
            }
        })["catch"](function (err) {
            //onChange!(err)
            if (onError) {
                onError(err);
            }
            updateFileList(_file, { status: "error", error: err });
            console.log("error出现了");
        });
    };
    var uploadFiles = function (files) {
        var filesLists = Array.from(files);
        filesLists.forEach(function (item) {
            if (beforeUpload) {
                var result = beforeUpload(item);
                if (result && result instanceof Promise) {
                    result.then(function (file) {
                        post(file);
                    });
                }
                else if (item) {
                    post(item);
                }
            }
        });
    };
    var handleOnchange = function (e) {
        var files = e.target.files;
        console.log("files-->", files);
        if (files) {
            uploadFiles(files);
        }
    };
    return (React.createElement("div", null,
        drag &&
            React.createElement(Dragger, { onFile: function (files) { uploadFiles(files); } }),
        React.createElement(Button, { btnType: 'primary', onClick: handleClick }, "\u4E0A\u4F20"),
        React.createElement("input", { style: { display: "none" }, type: "file", ref: inputRef, onChange: handleOnchange, accept: accept, multiple: multiple }),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: 'file',
    drag: true
};
export default Upload;
