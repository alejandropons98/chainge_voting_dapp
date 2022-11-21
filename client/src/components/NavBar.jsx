import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState, useEffect } from "react";
import { async } from "@firebase/util";
import { useAuth } from "../context/authContext";

function NavBar() {
  const [refresh, setRefresh] = useState(true);

  const { logout, user } = useAuth();

  console.log(user, "lalalalalal");
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
  }, [refresh]);
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">Chainge</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" variant="tabs">
              <Nav.Link href="/registerConsejoAcademico">
                Registro Consejo Academico
              </Nav.Link>
              <Nav.Link href="/registerCentroEstudiantes">
                Registrar Centro de Estudiantes
              </Nav.Link>
              <Nav.Link href="/registervoter">Registrar Votante</Nav.Link>
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
