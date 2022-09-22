import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


function Navigation() {
  return (

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Hangry</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation