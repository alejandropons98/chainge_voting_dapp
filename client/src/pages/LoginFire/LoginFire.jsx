import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function LoginFire() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCambio = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="email@fdssdfs"
          onChange={handleCambio}
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleCambio}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
export default LoginFire;
