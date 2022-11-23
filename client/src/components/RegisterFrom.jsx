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
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase-config";
function RegisterForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { signup, loginWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password, user.cedula);
      //await setDoc(doc(db, "usuarios", user.email), {
      // email: user.email,
      // cedula: user.cedula,
      //  });

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
            <h2 className="fw-bold mb-5">Sign up now</h2>

            <MDBInput
              onChange={handleChange}
              wrapperClass="mb-4"
              label="Cedula"
              id="form1"
              type="text"
              name="cedula"
            />
            <MDBInput
              onChange={handleChange}
              wrapperClass="mb-4"
              label="Email"
              id="form1"
              type="email"
              name="email"
            />
            <MDBInput
              onChange={handleChange}
              wrapperClass="mb-4"
              label="Password"
              id="form1"
              type="password"
              name="password"
            />
            <MDBBtn type="submit" className="w-100 mb-4" size="md">
              sign up
            </MDBBtn>

            <div className="text-center">
              <MDBBtn
                tag="a"
                color="danger"
                className="m-3"
                style={{ color: "white" }}
                onClick={handleGoogleSignin}
              >
                <icons.Google />
              </MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </form>
  );
}

export default RegisterForm;
