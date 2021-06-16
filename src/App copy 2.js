import { useReducer } from 'react'
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react'
import { API } from 'aws-amplify'

function App() {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    { people: [] }
  )

  async function componenetDidMount() {
    const data = await API.get('peopleapi', '/people')
    setState({ people: data.people })
  }

  componenetDidMount()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      {
        state.people.map((person, i) => (
          <div>
            <h3>{ person.name }</h3>
            <p>{ person.hair_color }</p>
          </div>
        ))
      }
    </div>
  );
}

const styles = {
  input: {
    height: 35, margin: 10
  }
}

export default withAuthenticator(App, { includeGreetings: true })