import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'

const Navigation = () => {
	const { currentUser, userEmail, userPhotoUrl } = useAuthContext()

      return (
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="pb-3">
            <Container>
              <Navbar.Brand as={Link} to="/">Me Hangry</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
  				<Nav className="ms-auto align-items-center">
				{
					currentUser ? (
						<>
							{/* User is logged in */}
							<NavDropdown title={
								userPhotoUrl
								? <Image
									src={userPhotoUrl}
									height={30}
									width={30}
									fluid
									roundedCircle
								  />
								: userEmail
							}>
								<NavLink to="/logout" className="dropdown-item">Log Out</NavLink>
								<NavLink to="/create-new-restaurant" className="dropdown-item">Create New</NavLink>
								<NavLink to="/tips" className='dropdown-item'>Alla tips</NavLink>
								<NavLink to="/userlist" className='dropdown-item'>Alla användare</NavLink>
							</NavDropdown>
						</>
					) : (
						<>
							{/* No user is logged in */}
							<Nav.Link as={NavLink} to="/login">Login</Nav.Link>
							<Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
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