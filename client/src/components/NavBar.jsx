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
          <Navbar.Brand href="/">{address}</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Registrate</Nav.Link>
            <Nav.Link href="/vote">Aqui ves ruta vote</Nav.Link>
            <Nav.Link href="/registercandidate">Aqui ves ruta register</Nav.Link> 
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export { NavBar };