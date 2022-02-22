import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
//import { Button } from '../dist/index';
import axios from 'axios';
import './styles/index.scss';
function App() {
    library.add(fab, faCheckSquare, faCoffee);
    var _a = useState('afa'), title = _a[0], setTitle = _a[1];
    // useEffect(()=>{
    //   axios.get('https://jsonplaceholder.typicode.com/todos/1').then((data:any)=>{
    //     console.log(data)
    //     setTitle(data.data.title)
    //   })
    // })
    var uploadFile = null;
    var formData = new FormData();
    var handleUpload = function (e) {
        var files = e.target.files;
        if (files) {
            //console.log(files)
            uploadFile = files[0];
            formData.append(uploadFile.name, uploadFile);
        }
        //axios.get('https://jsonplaceholder.typicode.com/todos/1').then((data:any)=>{})
    };
    var handleClick = function () {
        console.log(formData);
        axios.post('/posts', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(function (data) {
            console.log(data);
        });
    };
    return (React.createElement("div", { className: "App" },
        React.createElement("h1", null, title),
        React.createElement("form", { action: "https://jsonplaceholder.typicode.com/posts", encType: 'multipart/form-data', method: 'post' },
            React.createElement("input", { type: "file", name: "", id: "" }),
            React.createElement("button", { type: "submit" }, "submit")),
        React.createElement("div", null,
            React.createElement("input", { type: "file", onChange: handleUpload }),
            React.createElement("button", { onClick: handleClick }, "submit"))));
}
ReactDOM.render(React.createElement(React.StrictMode, null,
    React.createElement(App, null)), document.getElementById('root'));
export default App;
