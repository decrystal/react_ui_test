import React, { FC, useState, DragEvent } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/Icon'
export interface draggerProps {
  onFile: (file:FileList) => void;
  showText?: string;
}

const Dragger: FC<draggerProps> = (props) => {
  const {onFile,children, showText} = props
  const [dragOver,setDragOver] = useState(false)
  const kclass = classNames('viking-uploader-dragger',{
    'is-dragover': dragOver
  })
  const handleDrag= (e:DragEvent<HTMLElement>, over:boolean)=> {
    e.preventDefault()
    setDragOver(over)
  }
  const handleDrop = (e:DragEvent<HTMLElement>)=> {
    e.preventDefault()
    setDragOver(false)
    //注意这里的dataTransfer
    //console.log(e.dataTransfer)
    onFile(e.dataTransfer.files)
  }
  //onDragOver,onDragLeave, onDrop都是里面div自带属性
  return (
    <div  className={kclass}
          onDragOver={e=>{handleDrag(e, true)}}
          onDragLeave={e=>{handleDrag(e, false)}}
          onDrop={handleDrop}>
            <div>
              <Icon className='Dragger-icon' color='#6c757d' size='5x' icon='upload'></Icon>
              <p className={'Dragger-text'}>{showText}</p>
            </div>
            
    </div>
  )
}
Dragger.defaultProps = {
  showText: '把文件拖到这里'
}
export default Dragger;