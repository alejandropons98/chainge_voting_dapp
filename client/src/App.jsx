import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VotingPage } from "./pages/VotingPage/VotingPage";
import { RegisterCandidate } from "./pages/RegisterCandidate/RegisterCandidate";
import { Layout } from "./container/Layout/Layout";
import './App.css';
import { load } from './funcs.js';
import CandidateCardGrid from './components/CandidateCardGrid';
import { Header } from "./container/Header/Header";
import { useEffect } from "react";

const App = () => {
  
  useEffect(() => {
    load()
  })

  return (
    <BrowserRouter>
    <Layout>
    <Routes>
      <Route path="/vote" element={<VotingPage />} />
      <Route path="/registercandidate" element={<RegisterCandidate />} />
    </Routes>
    </Layout>
    </ BrowserRouter>
  )
}

export default App
