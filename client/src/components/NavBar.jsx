import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from "react"

function NavBar() {

  const [refresh, setRefresh] = useState(true)


  useEffect(() => {
    if(!refresh) return
    setRefresh(false)
  }, [refresh])

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">Chainge</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" variant="tabs">
            <Nav.Link href="/registercandidate">Registrar Candidato</Nav.Link> 
            <Nav.Link href="/registervoter">Registrar Votante</Nav.Link>
            <Nav.Link href="/voters">Votantes Activos</Nav.Link>
            <Nav.Link href="/vote">Votar</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export { NavBar };