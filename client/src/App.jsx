import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { load, getVoters, registerCandidate, getCandidates } from './funcs.js';
import NavBar from './components/NavBar';
import CandidateCardGrid from './components/CandidateCardGrid';

function App() {
  const [count, setCount] = useState(0)
  const [refresh, setRefresh] = useState(true)
  const [accounts, setAccounts] = useState([])
  const [voters, setVoters] = useState([])
  const [candidates, setCandidates] = useState([
    {
      id: 10,
      name: 'Monkey D. Luffy',
      party: 'Straw Hat Pirates',
      degree: 'Future King of the Pirates',
      image: 'https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2022/04/luffy-imagen-autor-slam-dunk.jpg?fit=1280%2C720&quality=80&ssl=1'
    },
    {
      id: 11,
      name: 'Trafalgar D. Water Law',
      party: 'Heart Pirates',
      degree: 'Surgeon of Death',
      image: 'https://www.geekmi.news/__export/1623595176216/sites/debate/img/2021/06/13/law1.jpg_375108060.jpg'
    },
    {
      id: 12,
      name: 'Eustass Kid',
      party: 'Kid Pirates',
      degree: 'Jaggy',
      image: 'https://staticg.sportskeeda.com/editor/2022/04/fc655-16489222173135-1920.jpg'
    },
    {
      id: 13,
      name: 'Marshall D. Teach',
      party: 'Blackbeard Pirates',
      degree: 'Blackbeard',
      image: 'https://sportshub.cbsistatic.com/i/2021/03/18/31419e70-d586-4b8e-a869-12e09c2ee16b/one-piece-blackbeard-1202711.jpg?width=1200'
    },
  ])
  const [workflowStatus, setWorkflowStatus] = useState('')
  const [candidateName, setCandidateName] = useState('')

  useEffect(() => {
    if(!refresh) return
    setRefresh(false)
    load()
    .then(e => {
      setCandidates(e)
    })
  }, [candidates, refresh])

  const HandleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target[0].value
    const party = e.target[1].value
    const degree = e.target[2].value
    await registerCandidate(name, degree, party)
    const info = await getCandidates()
    setCandidates(info)
    setRefresh(true)
  }

  return (
    <><NavBar />
    <div>Registra tu Candidato</div>
    <form onSubmit={HandleSubmit}> 
      <label>Nomber: 
        <input type="text" />
      </label>
      <label>Partido: 
        <input type="text" />
      </label>
      <label>Indice: 
        <input type="text" />
      </label>
      <button>Registrar</button>
    </form>
    {candidates.length > 0 ? <CandidateCardGrid candidates={candidates}/> : <div><h1>No hay candidatos</h1></div>}
    <div className="App">
    </div></>
  )
}

export default App
