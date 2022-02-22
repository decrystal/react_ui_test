import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Upload from './Upload'
import { isConditionalExpression } from 'typescript'
const beforeUpload = (file:any)=> {
  console.log("进beforeUpload-->", file)
  if(file.size/1024>50000){
    alert('this file is too big')
    return false
  }
  return true
}
const obj = {
  'test':"aaaaa"
}
const simpleUpload = () => (
  <>
    <Upload action="/v2/5cc8019d300000980a055e76"
      onProgress={action('onProgress')}
      onSuccess={action('onSuccess')}
      onError={action('onError')}
      beforeUpload={beforeUpload}
      data={obj}
      accept='.jpg, .txt, .conf'
      multiple={true}
      
    ></Upload>
  </>
)





storiesOf('Upload Component', module)
  .add('defaultUpload', simpleUpload)