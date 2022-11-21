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
import AuthProvider from "./context/authContext";
import RegisterForm from "./components/RegisterFrom";
import { ProtectedRoute } from "./components/ProtectedRoute";
const App = () => {
  useEffect(() => {
    load();
  });

  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vote"
              element={
                <ProtectedRoute>
                  <VotingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/registercandidate"
              element={
                <ProtectedRoute>
                  <RegisterCandidate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/registervoter"
              element={
                <ProtectedRoute>
                  <RegisterVoter />
                </ProtectedRoute>
              }
            />
            <Route
              path="/voters"
              element={
                <ProtectedRoute>
                  <VotedVoters />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registeruser" element={<RegisterForm />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
