import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VotingPage } from "./pages/VotingPage/VotingPage";
import { RegisterConsejoEstudiantil } from "./pages/RegisterConsejoEstudiantil/RegisterConsejoEstudiantil";
import { RegisterFCE } from "./pages/RegisterFCE/RegisterFCE";
import { Layout } from "./container/Layout/Layout";
import './App.css';
import { load } from './funcs.js';
import CandidateCardGrid from './components/CandidateCardGrid';
import { Header } from "./container/Header/Header";
import { useEffect } from "react";
import { RegisterVoter } from "./pages/RegisterVoter/RegisterVoter";
import { VotedVoters } from "./pages/VotedVoters/VotedVoters";
import { Home } from "./pages/Home/Home";
import { Audit } from "./pages/Audit/Audit";

const App = () => {
  
  useEffect(() => {
    load()
  },[])

  return (
    <BrowserRouter>
    <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vote" element={<VotingPage />} />
      <Route path="/registerConsejoEstudiantil" element={<RegisterConsejoEstudiantil />} />
      <Route path="/registerCentroEstudiantes" element={<RegisterFCE/>} />
      <Route path="/registervoter" element={<RegisterVoter />} />
      <Route path="/voters" element={<VotedVoters />} />
      <Route path="/audit" element={<Audit />} />
    </Routes>
    </Layout>
    </ BrowserRouter>
  )
}

export default App
