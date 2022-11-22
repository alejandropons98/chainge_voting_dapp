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
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vote"
            element={
              <ProtectedRoute>
                <Layout>
                  <VotingPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/registerConsejoAcademico"
            element={
              <ProtectedRoute>
                <Layout>
                  <RegisterConsejoAcademico />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/registerCentroEstudiantes"
            element={
              <ProtectedRoute>
                <Layout>
                  <RegisterFCE />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/registerConsejoEstudiantil"
            element={
              <ProtectedRoute>
                <Layout>
                  <RegisterConsejoEstudiantil />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/registervoter"
            element={
              <ProtectedRoute>
                <Layout>
                  <RegisterVoter />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/voters"
            element={
              <ProtectedRoute>
                <Layout>
                  <VotedVoters />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/audit"
            element={
              <ProtectedRoute>
                <Layout>
                  <Audit />
                </Layout>
              </ProtectedRoute>
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
