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
import { getDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase-config";
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
      //const docRef = doc(db, "usuarios", user.email);
      //const docSnap = await getDoc(docRef);
      // console.log(docSnap.data());
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
    <form onSubmit={handleSubmit} style={{width:'100%'}}>
      <MDBContainer fluid>
        <MDBCard
          className=" shadow-5" //mx-5 mb-5 p-5
          style={{
            // marginTop: "100px",
            background: "hsla(0, 0%, 100%, 0.8)",
            backdropFilter: "blur(30px)",
          }}
        >
          <MDBCardBody className="p-5 text-center">
            <h2 className="fw-bold mb-5">Log In Now</h2>

            <MDBInput
              onChange={handleChange}
              wrapperClass="mb-4"
              // label="Email"
              id="form1"
              type="email"
              name="email"
              placeholder="Email"
              //COLOCAR NAME PORQUE NO TIENE Y ASI FUNCIOINA EL HANDLECHANGE
            />
            <MDBInput
              onChange={handleChange}
              wrapperClass="mb-4"
              // label="Password"
              id="form2"
              type="password"
              name="password"
              placeholder="Password"
            />

            <MDBBtn type="submit" className="w-100 mb-4" size="md">
              Log In
            </MDBBtn>

            {/* <MDBBtn
              type="submit"
              className="w-100 mb-4"
              size="md"
              href="/registeruser"
            >
              Sign Up
            </MDBBtn> */}

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
