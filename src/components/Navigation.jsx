import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {
    
    return (

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="pb-3">
          <Container>
            <Navbar.Brand>Me Hangry</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">

            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}

export default Navigation