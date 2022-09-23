import React, { useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const LogoutForm = () => {
	const navigate = useNavigate()
	const { logout } = useAuthContext()

	useEffect(() => {
		const logoutUser = async () => {
			await logout()
			navigate('/')
		}
		logoutUser()
	}, [])

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title>Log Out</Card.Title>

							<Card.Text>Logging out....</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default LogoutForm