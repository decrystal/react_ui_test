import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Input, { inputProps } from '../Input/Input'
import useDebounce from './debounce'
import Icon from '../Icon/Icon'
import { icon } from '@fortawesome/fontawesome-svg-core'
// import Transition from '../Transition/Transition'
// import useDebounce from '../../hooks/useDebounce'
// import useClickOutside from '../../hooks/useClickOutside'

const lakersWithNumber = [
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
]  

export interface AutoCompleteProps  extends inputProps{
  fetchSuggestions?: (str: string) => string[]|Promise<string[]>;
  onSelect?: (item: object) => void;
  //renderOption?: (item: object) => ReactElement;
}





const onSelect = () => {
  
}


console.log('组件外')

const AutoComplete: FC<AutoCompleteProps> = (props)=> {
  const {fetchSuggestions, onSelect, value} = props
  const ComponentRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSugestions] = useState<Object[]|string[]>([])
  const couterRef = useRef();
  const [loading, setLoading] = useState(false)
  const debouncedValue = useDebounce(inputValue, 300)
  useEffect(()=>{
    console.log("useEffect-->")
    if(debouncedValue){

      const res = fetchSuggestions!(debouncedValue)
      if( res instanceof Promise) {
        setLoading(true)
        res.then(data => {
          if(data.length){
            setLoading(false)
            setSugestions(data)
          }else{
            setLoading(true)
          }
        })
      }else{
        setSugestions(res)
      }
    }else{
      setSugestions([])
    }
    generate()
  },
  [debouncedValue])
  const generate = () => {
    console.log("suggestions-->", suggestions)
    if(suggestions.length){
      return (
        <ul  className="viking-suggestion-list">
          
          {suggestions.length&&suggestions.map((item:any,index) => {
            console.log('item->', item)
            item = (typeof item === "string") ? item :item.value
            return <li key={index}>
              {item}
            </li>
          })}
        </ul>
        
      )
    }
  }
  // const handleFetch = (query:string) => {
  //   return fetch(`https://api.github.com/search/users?q=${query}`)
  //     .then(res => res.json())
  //     .then(({ items }) => {
  //       console.log(items)
  //       return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
  //     })
  // }
  console.log('组件内')



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
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //console.log("e-->", e.target.value)
    
    setSugestions([])
    const value = e.target.value.trim()
    if(value)setLoading(true)
    console.log('handleChange-->', value)
    setInputValue(value)
    //console.log("fetchSuggestions", fetchSuggestions(value))
    
  }
  return (
    <div className="viking-auto-complete">
      <Input onChange={handleChange}></Input>
      {generate()}
      {loading&&<div className="suggstions-loading-icon">
            <Icon icon="spinner" spin />
          </div>} 
    </div>
    
  )
}

export default AutoComplete;