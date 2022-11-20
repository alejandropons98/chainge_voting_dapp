import block from "../assets/bloc2.gif";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
const HomeContent = () => {
  const { logout, user } = useAuth();

  console.log(user, "lalalalalal");
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      HOME welcome {user.email}
      <button onClick={handleLogout}>log out</button>;
    </div>
  );
};

export { HomeContent };
