import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VotingPage } from "./pages/VotingPage/VotingPage";
import { RegisterConsejoAcademico } from "./pages/RegisterConsejoAcademico/RegisterConsejoAcademico";
import { RegisterConsejoEstudiantil } from "./pages/RegisterConsejoEstudiantil/RegisterConsejoEstudiantil";
import { RegisterFCE } from "./pages/RegisterFCE/RegisterFCE";
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
import { Audit } from "./pages/Audit/Audit";

const App = () => {
  useEffect(() => {
    load();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
                <Layout>
                  <Home />
                </Layout>
            }
          />
          <Route
            path="/vote"
            element={
                <Layout>
                  <VotingPage />
                </Layout>
            }
          />
          <Route
            path="/registerConsejoAcademico"
            element={
                <Layout>
                  <RegisterConsejoAcademico />
                </Layout>
            }
          />
          <Route
            path="/registerCentroEstudiantes"
            element={
                <Layout>
                  <RegisterFCE />
                </Layout>
            }
          />
          <Route
            path="/registerConsejoEstudiantil"
            element={
                <Layout>
                  <RegisterConsejoEstudiantil />
                </Layout>
            }
          />
          <Route
            path="/registervoter"
            element={
                <Layout>
                  <RegisterVoter />
                </Layout>
            }
          />
          <Route
            path="/voters"
            element={
                <Layout>
                  <VotedVoters />
                </Layout>
            }
          />
          <Route
            path="/audit"
            element={
                <Layout>
                  <Audit />
                </Layout>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registeruser" element={<RegisterForm />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
