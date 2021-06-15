import { useReducer } from 'react'
import logo from './logo.svg';
import './App.css';

import { Auth } from 'aws-amplify'

function App() {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    { username: '', password: '', email: '', phone_nuber: '', authenticationCode: '', step: 0 }
  )
  function onChange(event) {
    setState({ [event.target.name]: event.target.value })
  }
  async function signUp () {
    const { username, password, email, phone_nuber } = state
    try {
      await Auth.signUp({ username, password, adttributes: { email, phone_nuber } })
      console.log('successfully signed up')
      setState({ step: 1 })
    } catch(err) {
      console.log(`Error occured while signging up: ${err}`)
    }
  }
  async function confirmSignUp () {
    const { username, authenticationCode } = state
    try {
      await Auth.confirmSignUp(username, authenticationCode)
      console.log('sign up confirmed')
    } catch(err) {
      console.log(`Error occured while confirming sign up: ${err}`)
    }
  }

  return (
    <div className="App">
      {
        state.step === 0 && (
          <div>
            <input placeholder='username' onChange={onChange} name='username' style={styles.input}/>
            <input placeholder='password' onChange={onChange} name='password' type='password' style={styles.input}/>
            <input placeholder='email' onChange={onChange} name='email' style={styles.input}/>
            <input placeholder='phone number' onChange={onChange} name='phone_number' style={styles.input}/>
            <button onClick={signUp}>Sign Up</button>
          </div>
        )
      }
      {
        state.step === 1 && (
          <div>
            <input placeholder='username' onChange={onChange} name='username' style={styles.input}/>
            <input placeholder='authentication code' onChange={onChange} name='authenticationCode' style={styles.input}/>
            <button onClick={confirmSignUp}>Confirm Sign Up</button>
          </div>
        )
      }
    </div>
  );
}

const styles = {
  input: {
    height: 35, margin: 10
  }
}

export default App
