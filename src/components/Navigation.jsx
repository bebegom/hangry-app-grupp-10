import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'
import useUsers from '../hooks/useUsers'

const Navigation = () => {
	const { currentUser, userEmail } = useAuthContext()
	const { data: users, } = useUsers('users')

	const admins = users.filter(i => i.admin === true)

	let thisUser;
	if (currentUser) {
		thisUser = admins.filter(user => user.email === currentUser.email)
	}

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="pb-3">
		<Container>
			<Navbar.Brand as={Link} to="/">Me Hangry</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
			<Nav className="ms-auto align-items-center">
			{
				thisUser && thisUser.length === 1 && (
					<>
						{/* Admin is logged in */}
						<NavDropdown title={userEmail}>
								<NavLink to="/logout" className="dropdown-item">Log Out</NavLink>
								<NavLink to="/create-new-restaurant" className="dropdown-item">Create New</NavLink>
								<NavLink to="/tips" className='dropdown-item'>Tips</NavLink>
								<NavLink to="/userlist" className='dropdown-item'>Admins</NavLink>
								<NavLink to="/restaurantlist" className='dropdown-item'>Restaurants</NavLink>
						</NavDropdown>
					</>
				)
			}

			{
				thisUser && thisUser.length === 0 && (
						<>
							{/* User is logged in */}
							<NavDropdown title={userEmail}>
								<NavLink to="/logout" className="dropdown-item">Log Out</NavLink>
								<NavLink to="/send-tips" className='dropdown-item'>Send tips</NavLink>
							</NavDropdown>
						</>
				)
			}

			{
				!currentUser && (
					<>
						{/* No user is logged in */}
						<Nav.Link as={NavLink} to="/send-tips">Send Tips</Nav.Link>
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