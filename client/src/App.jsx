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
}
export default App;
