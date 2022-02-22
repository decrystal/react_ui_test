import React, { useState, useEffect, useRef } from 'react';
import Input from '../Input/Input';
import useDebounce from './debounce';
import Icon from '../Icon/Icon';
// import Transition from '../Transition/Transition'
// import useDebounce from '../../hooks/useDebounce'
// import useClickOutside from '../../hooks/useClickOutside'
var lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
];
var onSelect = function () {
};
console.log('组件外');
var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value;
    var ComponentRef = useRef(null);
    var _a = useState(""), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSugestions = _b[1];
    var couterRef = useRef();
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var debouncedValue = useDebounce(inputValue, 300);
    useEffect(function () {
        console.log("useEffect-->");
        if (debouncedValue) {
            var res = fetchSuggestions(debouncedValue);
            if (res instanceof Promise) {
                setLoading(true);
                res.then(function (data) {
                    if (data.length) {
                        setLoading(false);
                        setSugestions(data);
                    }
                    else {
                        setLoading(true);
                    }
                });
            }
            else {
                setSugestions(res);
            }
        }
        else {
            setSugestions([]);
        }
        generate();
    }, [debouncedValue]);
    var generate = function () {
        console.log("suggestions-->", suggestions);
        if (suggestions.length) {
            return (React.createElement("ul", { className: "viking-suggestion-list" }, suggestions.length && suggestions.map(function (item, index) {
                console.log('item->', item);
                item = (typeof item === "string") ? item : item.value;
                return React.createElement("li", { key: index }, item);
            })));
        }
    };
    // const handleFetch = (query:string) => {
    //   return fetch(`https://api.github.com/search/users?q=${query}`)
    //     .then(res => res.json())
    //     .then(({ items }) => {
    //       console.log(items)
    //       return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
    //     })
    // }
    console.log('组件内');
    // const fetchSuggestionsFn = ()=> {
    //   console.log('fetchSuggestionsFn 被调用了', inputValue)
    //   if(inputValue!==""){
    //     const res =  lakersWithNumber.filter(item=> {return item.value.includes(inputValue)})
    //     const newRes = res.map(i=>i.value)
    //     setSugestions(newRes)
    //   }else{
    //     setSugestions([])
    //   }
    // }
    var handleChange = function (e) {
        //console.log("e-->", e.target.value)
        setSugestions([]);
        var value = e.target.value.trim();
        if (value)
            setLoading(true);
        console.log('handleChange-->', value);
        setInputValue(value);
        //console.log("fetchSuggestions", fetchSuggestions(value))
    };
    return (React.createElement("div", { className: "viking-auto-complete" },
        React.createElement(Input, { onChange: handleChange }),
        generate(),
        loading && React.createElement("div", { className: "suggstions-loading-icon" },
            React.createElement(Icon, { icon: "spinner", spin: true }))));
};
export default AutoComplete;
