import { Container } from 'react-bootstrap'
import { useMemo } from 'react'
import useUsers from '../hooks/useUsers'
import SortableTable from '../components/SortableTable'

const UserListPage = () => {
    const { data: users, error, isError, isLoading } = useUsers('users')

    const admins = users.filter(i => i.admin === true)
    
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

                {admins && <SortableTable columns={columns} data={admins} />}
            </Container>
        </>
    )
}

export default UserListPage