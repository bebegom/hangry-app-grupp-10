import { Container } from 'react-bootstrap'
import { useMemo } from 'react'
import useRestaurants from '../hooks/useRestaurants'
import SortableTable from '../components/SortableTable'

const RestaurantsListPage = () => {
    const { data: restaurants, error, isError, isLoading } = useRestaurants('restaurants')

    const columns = useMemo(() => {
        return [
            {
                Header: 'ID',
                accessor: 'id'
            },
            {
                Header: 'Namn',
                accessor: 'namn'
            },
        ]
    }, [])


    return (
        <>
            <Container>
                <h1>Alla restauranger</h1>

                {isLoading && (<p>Loading...</p>)}

                {isError && (<p>{error.message}</p>)}

                {restaurants && <SortableTable columns={columns} data={restaurants} />}
        </Container>
        </>
    )
}

export default RestaurantsListPage