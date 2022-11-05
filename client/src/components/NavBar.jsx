import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {myAddress} from '../funcs'
import { useState, useEffect } from "react"

function NavBar() {

  const [address, setAddress] = useState("")
  const [refresh, setRefresh] = useState(true)

  const fetchAddress = async () => {
    const newAddress = await myAddress()
    setAddress(newAddress)
  }

  useEffect(() => {
    if(!refresh) return
    setRefresh(false)
    fetchAddress()
  }, [refresh,address])

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
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export { NavBar };