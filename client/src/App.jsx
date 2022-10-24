import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { load, getVoters } from './funcs.js';

function App() {
  const [count, setCount] = useState(0)
  const [refresh, setRefresh] = useState(true)
  const [accounts, setAccounts] = useState([])
  const [voters, setVoters] = useState([])
  const [candidates, setCandidates] = useState([])
  const [workflowStatus, setWorkflowStatus] = useState('')
  const [candidateName, setCandidateName] = useState('')

  useEffect(() => {
    if(!refresh) return;
    setRefresh(false);
    load().then(e => {
      setCandidates(candidates.push(e));
      // console.log(candidates);
      console.log("esto es: " + candidates[0].name);
      setCandidateName(candidates[0].name);
      console.log(candidateName);

    });
  }, [candidates]);


  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={getVoters}>
          Get Voters
        </button>
        <h1>{candidateName}</h1>
        {/* <button onClick={vote}>Vote</button> */}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
