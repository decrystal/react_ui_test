import React, {FC, useRef, ChangeEvent, useState} from "react";
import Button from "../Button/button";
import classNames from "classnames";
import axios from 'axios'
import UploadList from "./uploadList";
import Dragger from "./dragger";
export interface uploadProps {
  action: string;
  defaultFileList?:UploadFile[];
  onProgress?: (percentage: number, file:File)=> void
  //注意类型File，
  //下面是成功上传和失败后的回调
  onSuccess?:(data: any)=> void
  onError?: (error: any)=> void
  beforeUpload?:(file: File)=> boolean|Promise<File>
  onChange?: (file: File) => void;
  header?: {[key:string]:any};
  data?:{[key:string]:any};
  accept?: string;
  multiple?:boolean;
  name?: string;
  drag?: boolean;
}
export type UploadFileStatus = 'ready'|'uploading'|'success'|'error'
//对file添加自己属性(即新的file类型)，满足fileList的需求（fileList的每一个item都是UploadFile类型）
export interface UploadFile {
  uid:string;
  size:number;
  name: string;
  percentage?: number;
  status?: UploadFileStatus;
  raw?:File;
  response?:any;
  error?:any;
  
}
const Upload: FC<uploadProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const {action, onProgress, onSuccess, onError, onChange, beforeUpload, defaultFileList,header, drag,data, accept, multiple} = props
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const handleClick = () => {
    // console.log('inputRef', inputRef.current?.click)
    if (inputRef.current) {
      console.log("lfadjl",inputRef);
      inputRef.current.click()
    }
  }
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    console.log('updateFileList中得是最新的updateFile',updateFile, updateObj.status )
    console.log()
    setFileList(prevList => {
      //prevList里面的每一个item更新变化通过uid判断
      //因为每次要拿到之前set之后的值，（还是异步的）只是提前拿到set之后的值用来进行处理，所以在set里面传入一个函数，函数参数是（set之后）以前的值
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  const handleRemove = (file: UploadFile) => {
    setFileList((pre) => {
      return pre.filter(item => item.uid !== file.uid)
    })
  }
  const post = (file:any) => {
    let _file:UploadFile = {
      uid: Date.now()+'upload-file',
      size:file.size,
      name: file.name,
      raw:file,
    }
    // setFileList([_file,...fileList])
    
    setFileList(prevList => {
      console.log("prevList",prevList)
      return [_file, ...prevList]
    })
    const formData = new FormData()
    formData.append(file.name, file)
    if(data) {
      Object.keys(data).forEach((key:string)=>{
        formData.append(key, data[key])
      })
    }
    axios.post(action, formData, {
      headers: {
        ...header,
        'content-type': 'multipart/form-data',
      },
      onUploadProgress: (e)=>{
        console.log("fileList-->", fileList, "e", e)
        let percentage = Math.round(e.loaded*100/e.total);
        console.log(percentage)
        if(percentage<100){
          updateFileList(_file, {status:'uploading', percentage:percentage})
          console.log('进度条')
          onProgress!(percentage, file)
        }
        console.log("onUploadProgress-->里面的参数",)
      }
    }).then((res:any)=>{
        //onChange!(res)
        //_file是
        updateFileList(_file, {status:'success', percentage:100, response:res.data})
        if(onSuccess){
          onSuccess!(res)
        }
    }).catch((err)=>{
      //onChange!(err)
      if(onError){
        onError!(err)
      }
      updateFileList(_file, {status:"error", error:err})
      console.log("error出现了")
    })
  }
  const uploadFiles = (files:any) => {
    let filesLists = Array.from(files)
    filesLists.forEach((item:any) => {
      if(beforeUpload){
        const result = beforeUpload(item)
        if(result&&result instanceof Promise){
          result.then(file=>{
            post(file)
          })
        }else if(item){
          post(item)
        }
      }
    });
    
  }
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log("files-->", files)
    if(files) {
      uploadFiles(files)
    }
  }
  return (
    <div>
      {drag&&
        <Dragger onFile={(files:FileList)=>{uploadFiles(files)}}></Dragger> 
      }
      <Button btnType='primary' onClick={handleClick} >上传</Button>
      <input  style={{display:"none"}} 
              type="file" ref={inputRef} 
              onChange={handleOnchange}   
              accept={accept}
              multiple={multiple}></input>
      <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
    </div>
  )
}
Upload.defaultProps = {
  name: 'file',
  drag: true
}
export default Upload 