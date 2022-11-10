import { Route, Routes } from "react-router-dom";
import LoginFire from "./pages/LoginFire/LoginFire";
import { AuthProvider } from "./context/authContext";
import Register from "./pages/RegisterUser/RegisterUser";
import { VotingPage } from "./pages/VotingPage/VotingPage";
import InfoPage from "./pages/InfoPage/InfoPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginFire />} />
        <Route path="/register" element={<Register />} />
        <Route path="/infopage" element={<InfoPage />} />
      </Routes>
    </AuthProvider>
  );

// import { RegisterCandidate } from "./pages/RegisterCandidate/RegisterCandidate";
// import { Layout } from "./container/Layout/Layout";
// import './App.css';
// import { load } from './funcs.js';
// import CandidateCardGrid from './components/CandidateCardGrid';
// import { Header } from "./container/Header/Header";
// import { useEffect } from "react";
// import { RegisterVoter } from "./pages/RegisterVoter/RegisterVoter";
// import { VotedVoters } from "./pages/VotedVoters/VotedVoters";

// const App = () => {
  
//   useEffect(() => {
//     load()
//   })

//   return (
//     <BrowserRouter>
//     <Layout>
//     <Routes>
//       <Route path="/vote" element={<VotingPage />} />
//       <Route path="/registercandidate" element={<RegisterCandidate />} />
//       <Route path="/registervoter" element={<RegisterVoter />} />
//       <Route path="/voters" element={<VotedVoters />} />
//     </Routes>
//     </Layout>
//     </ BrowserRouter>
//   )
}
export default App;
