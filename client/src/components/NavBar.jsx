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
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Chainge</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Registrate</Nav.Link>
            <Nav.Link href="/vote">Votar</Nav.Link>
            <Nav.Link href="/registercandidate">Registrar Candidato</Nav.Link> 
            <Nav.Link href="/registervoter">Registrar Votante</Nav.Link>
            <Nav.Link href="/voters">Votantes Activos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export { NavBar };