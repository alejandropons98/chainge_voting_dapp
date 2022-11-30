import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState, useEffect } from "react";
import { async } from "@firebase/util";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";

function NavBar() {
  const [refresh, setRefresh] = useState(true);
  const { logout, user, isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand onClick={(e) => navigate("/")}>Chainge</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" variant="tabs">
            {isAdmin ?
              <>  
                <Nav.Link onClick={(e) => navigate("/registerConsejoAcademico")}>Registro Consejo Academico</Nav.Link>
                <Nav.Link onClick={(e) => navigate("/registerCentroEstudiantes")}>Registrar Centro de Estudiantes</Nav.Link>
                <Nav.Link onClick={(e) => navigate("/registerConsejoEstudiantil")}>Registrar Consejos de Facultades y Escuelas</Nav.Link>
                <Nav.Link onClick={(e) => navigate("/registervoter")}>Registrar Votante</Nav.Link>
                <Nav.Link onClick={(e) => navigate("/audit")}>Auditoria</Nav.Link>
                <Nav.Link onClick={(e) => navigate("/vote")}>Votar</Nav.Link> 
              </>
              :
              <Nav.Link onClick={(e) => navigate("/vote")}>Votar</Nav.Link>
              }
            </Nav>
            <Nav>
                {isLoggedIn ? <Nav.Link onClick={handleLogout} href="/login">
                  Log out
                </Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export { NavBar };
