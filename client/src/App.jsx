import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VotingPage } from "./pages/VotingPage/VotingPage";
import { RegisterCandidate } from "./pages/RegisterCandidate/RegisterCandidate";
import { Layout } from "./container/Layout/Layout";
import "./App.css";
import { load } from "./funcs.js";
import CandidateCardGrid from "./components/CandidateCardGrid";
import { Header } from "./container/Header/Header";
import { useEffect } from "react";
import { RegisterVoter } from "./pages/RegisterVoter/RegisterVoter";
import { VotedVoters } from "./pages/VotedVoters/VotedVoters";
import { Home } from "./pages/Home/Home";
import LoginPage from "./pages/LoginPage/LoginPage";

const App = () => {
  useEffect(() => {
    load();
  });

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vote" element={<VotingPage />} />
          <Route path="/registercandidate" element={<RegisterCandidate />} />
          <Route path="/registervoter" element={<RegisterVoter />} />
          <Route path="/voters" element={<VotedVoters />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
