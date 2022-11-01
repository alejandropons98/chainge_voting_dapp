import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Chainge</Navbar.Brand>
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