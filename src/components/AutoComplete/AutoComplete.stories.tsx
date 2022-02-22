import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import AutoComplete from './AutoComplete'
import { isConditionalExpression } from 'typescript'

const handleFetch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then(res => res.json())
    .then(({ items }) => {
      console.log("items-->",items)
      return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
    }).catch(()=>{
      return []
    })
}
const defaultAutoComplete = () => (
    <AutoComplete fetchSuggestions={handleFetch}></AutoComplete>
)





storiesOf('AutoComplete Component', module)
  .add('defaultInput', defaultAutoComplete)