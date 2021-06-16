import { useReducer } from 'react'
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react'
import { Storage } from 'aws-amplify'

function App() {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    { fileUrl: '', file: '', filename: '' }
  )

  function handleFileChange(event) {
    const file = event.target.files[0]
    setState({
      fileUrl: URL.createObjectURL(file),
      file,
      filename: file.name
    })
  }

  function handleNameChange(event) {
    const filename = event.target.value
    setState({
      filename
    })
  }

  function saveFile() {
    Storage.put(state.filename, state.file)
      .then(() => {
        console.log('file saved succesfuly')
        setState({ fileUrl: '', file: '', filename: '' })
      })
      .catch(err => {
        console.log('error uploading file ', err)
      })
  }

  function getFile() {
    console.log(state.filename)
    Storage.get(state.filename)
      .then(url => {
        console.log(url)
        setState({fileUrl: url})
      })
      .catch(err => {
        console.log('error occured while fetching image ', err)
      })
  }


  // componentDidMount()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <input type='file' onChange={handleFileChange} />
      <input type='text' onChange={handleNameChange} placeholder='filename' />
      <img src={state.fileUrl} />
      <button onClick={saveFile}>Save File</button>
      <button onClick={getFile}>Get File</button>
    </div>
  );
}

const styles = {
  input: {
    height: 35, margin: 10
  }
}

export default withAuthenticator(App, { includeGreetings: true })