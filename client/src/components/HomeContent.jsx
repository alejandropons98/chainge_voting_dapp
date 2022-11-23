import block from "../assets/bloc2.gif";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase-config";
const HomeContent = () => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>log out</button>;
    </div>
  );
};

export { HomeContent };
