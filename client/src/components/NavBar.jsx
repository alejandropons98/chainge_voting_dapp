import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState, useEffect } from "react";
import { async } from "@firebase/util";
import { useAuth } from "../context/authContext";

function NavBar() {
  const [refresh, setRefresh] = useState(true);

  const { logout, user } = useAuth();

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
          <Navbar.Brand href="/">Chainge</Navbar.Brand>
          
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" variant="tabs">

            <NavDropdown title="Registros" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/registerConsejoAcademico">
                Registro Consejo Academico
              </NavDropdown.Item>
              <NavDropdown.Item href="/registerCentroEstudiantes">
                Registrar Centro de Estudiantes
              </NavDropdown.Item>
              <NavDropdown.Item href="/registerConsejoEstudiantil">Registrar Consejos de Facultades y Escuelas</NavDropdown.Item> 
              <NavDropdown.Item href="/registervoter">Registrar Votante</NavDropdown.Item>
              </NavDropdown>


              <Nav.Link href="/voters">Votantes Activos</Nav.Link>
              <Nav.Link href="/vote">Votar</Nav.Link>
              <Nav.Link href="/audit">Auditoria</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={handleLogout} href="/login">
                Log out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export { NavBar };
