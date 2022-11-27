import { Container } from 'react-bootstrap'
import { useMemo } from 'react'
import useRestaurants from '../hooks/useRestaurants'
import SortableTable from '../components/SortableTable'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import UpdateRestaurantPage from './UpdateRestaurantPage'

const RestaurantsListPage = () => {
    const { data: restaurants, error, isError, isLoading } = useRestaurants('restaurants')

    const columns = useMemo(() => {
        return [
            {
                Header: 'Namn',
                accessor: 'namn'
            },
            {
                Header: 'Gatuadress',
                accessor: 'adress'
            },
            {   
                Header: 'Ort',
                accessor: 'ort'
            },
            {
                Header: 'Typ',
                accessor: 'typ'
            },
            {
				Header: "Mer info",
				disableSortBy: true,
				Cell: () => (
					<Button
						className="mt-2"
						onClick={() =>
							navigate("/update-restaurant")
						}
					>Mer info
					</Button>
				),
			},
        ]
    }, [])

    const navigate = useNavigate()

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