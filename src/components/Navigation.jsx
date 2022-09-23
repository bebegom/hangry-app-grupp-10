import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'

const Navigation = () => {
    
	const { currentUser, userEmail } = useAuthContext()

      return (
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="pb-3">
            <Container>
              <Navbar.Brand>Me Hangry</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
  <Nav className="ms-auto align-items-center">
				{
					currentUser ? (
						<>
							{/* Admin is logged in */}
							<NavDropdown title={userEmail}>
								<NavLink to="/logout" className="dropdown-item">Log Out</NavLink>
								<NavLink to="/create-new-restaurant" className="dropdown-item">Create New</NavLink>
							</NavDropdown>
						</>
					) : (
						<>
							{/* Admin is NOT logged in */}
							<Nav.Link as={NavLink} to="/send-tips">Tipsa oss</Nav.Link>
							<Nav.Link as={NavLink} to="/login">Login</Nav.Link>
						</>
					)
				}
			</Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
    )
}

export default Navigation