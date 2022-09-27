import { Container } from 'react-bootstrap'
import useUsers from '../hooks/useUsers'
import UserList from '../components/UserList'

const UserListPage = () => {
    const { data: users } = useUsers('users')

    return (
        <Container>
            <h1>Alla användare</h1>

            <UserList users={users}/>
        </Container>
    )
}

export default UserListPage