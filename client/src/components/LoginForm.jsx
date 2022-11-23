import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import * as icons from "react-bootstrap-icons";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { async } from "@firebase/util";

function LoginForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
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
  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <MDBContainer fluid>
        <MDBCard
          className="mx-5 mb-5 p-5 shadow-5"
          style={{
            marginTop: "100px",
            background: "hsla(0, 0%, 100%, 0.8)",
            backdropFilter: "blur(30px)",
          }}
        >
          <MDBCardBody className="p-5 text-center">
            <h2 className="fw-bold mb-5">Log In Now</h2>

            <MDBInput
              onChange={handleChange}
              wrapperClass="mb-4"
              label="Email"
              id="form1"
              type="email"
              name="email"
              //COLOCAR NAME PORQUE NO TIENE Y ASI FUNCIOINA EL HANDLECHANGE
            />
            <MDBInput
              onChange={handleChange}
              wrapperClass="mb-4"
              label="Password"
              id="form2"
              type="password"
              name="password"
            />

            <div className="d-flex justify-content-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Subscribe to our newsletter"
              />
            </div>

            <MDBBtn type="submit" className="w-100 mb-4" size="md">
              Log In
            </MDBBtn>

            <div className="text-center">
              <p>or sign up with:</p>

              <MDBBtn
                tag="a"
                color="danger"
                className="m-3"
                style={{ color: "white" }}
                onClick={handleGoogleSignin}
              >
                <icons.Google />
              </MDBBtn>
              <p className="my-4 text-sm flex justify-between px-3">
                Don't have an account?
                <Link
                  to="/registeruser"
                  className="text-blue-700 hover:text-blue-900"
                >
                  Register
                </Link>
              </p>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </form>
  );
}

export default LoginForm;
