import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
// import './App.css';
//图标
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
//import { Button } from '../dist/index';
import axios from 'axios'
import './styles/index.scss'



function App() {
  library.add(fab, faCheckSquare, faCoffee)
  const [title, setTitle] = useState('afa')
  // useEffect(()=>{
  //   axios.get('https://jsonplaceholder.typicode.com/todos/1').then((data:any)=>{
  //     console.log(data)
  //     setTitle(data.data.title)
  //   })
  // })
  let uploadFile = null;
  const formData = new FormData()
  const handleUpload = (e:any) => {
    const files = e.target.files;
    if(files) {
      //console.log(files)
      uploadFile = files[0]
      formData.append(uploadFile.name, uploadFile)
      
    }

    //axios.get('https://jsonplaceholder.typicode.com/todos/1').then((data:any)=>{})
  }
  const handleClick = () => {
    console.log(formData)
    axios.post('/posts', formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then((data)=>{
        console.log(data)
      })
  }
  return (
    <div className="App">
      <h1>{title}</h1>
      <form action="https://jsonplaceholder.typicode.com/posts" encType='multipart/form-data' method='post'>
        <input type="file" name="" id="" />
        <button type="submit">submit</button>
      </form>

      <div>
        <input type="file" onChange={handleUpload} />
        <button onClick={handleClick}>submit</button>
      </div>
      {/* <Button >test dist result</Button> */}

      {/* <Button size='lg' onClick={()=>{ console.log("jalfkjlaks")}} btnType='primary' >hello Tommy nihao</Button>
      <Button size='sm' btnType='danger'>hello Tommy nihao</Button>
      <Button size='lg' btnType='default' >hello Tommy nihao</Button>
      <Button size='sm' btnType='link'>hello Tommy</Button>
      <Menu defaultIndex={0} mode='vertical'>
        <MenuItem>
            clickItem0
        </MenuItem >
        <SubMenu title='SubMenu1'>
          <MenuItem>
              clickItem1
          </MenuItem>  
          <MenuItem>
              clickItem2
          </MenuItem>
        </SubMenu>
        <SubMenu title="SubMenu2">
          <MenuItem>
              clickItem3
          </MenuItem>
          <MenuItem>
              clickItem4
          </MenuItem>
        </SubMenu>
        
        <MenuItem>
            clickItem5
        </MenuItem>
        <MenuItem>
            clickItem6
        </MenuItem>
      </Menu>   */}
      
    </div>
    
  );
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
export default App;
