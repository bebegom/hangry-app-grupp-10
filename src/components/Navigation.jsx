import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



function Navigation() {
  return (

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="pb-3">
      <Container>
        <Navbar.Brand>Me Hangry</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Form className="d-flex mt-4">
                <Form.Control
                type="search"
                placeholder="City"
                className="me-2"
                aria-label="Search"
                />
                <Button variant="outline-primary">Search</Button>
            </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation