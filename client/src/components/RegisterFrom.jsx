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
import { async } from "@firebase/util";

function RegisterForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { signup } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      await signup(user.email, user.password);
      navigate("/login");
    } catch (error) {
      console.log("eeror");
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
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              wrapperClass="mb-4"
              label="Email"
              id="form1"
              type="email"
            />
            <MDBInput
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              wrapperClass="mb-4"
              label="Password"
              id="form1"
              type="password"
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
              sign up
            </MDBBtn>

            <div className="text-center">
              <p>or sign up with:</p>

              <MDBBtn
                tag="a"
                color="danger"
                className="m-3"
                style={{ color: "white" }}
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
