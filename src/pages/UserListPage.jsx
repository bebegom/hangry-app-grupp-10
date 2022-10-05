import { Container } from 'react-bootstrap'
import { useMemo } from 'react'
import useUsers from '../hooks/useUsers'
import SortableTable from '../components/SortableTable'

const UserListPage = () => {
    const { data: users, error, isError, isLoading } = useUsers('users')

    const columns = useMemo(() => {
        return [
            {
                Header: 'Namn',
                accessor: 'name'
            },
            {
                Header: 'Email',
                accessor: 'email'
            },
            {
                Header: 'Profilbild',
                accessor: 'photoURL',
                    Cell: tableProps => (
                        <img	
                            src={tableProps.row.original.photoURL}
                            width={40}
                        />
                    ) 
            }
        ]
    }, [])

    return (
        <>
            <Container>
                <h1>Alla admins: </h1>
                
                {isLoading && (<p>Loading...</p>)}

                {isError && (<p>{error.message}</p>)}

                {users && <SortableTable columns={columns} data={users} />}
            </Container>
        </>
    )
}

export default UserListPage