import { Container } from 'react-bootstrap'
import useRestaurants from '../hooks/useRestaurants'
import RestaurantsList from '../components/RestaurantsList'

const RestaurantsListPage = () => {
    const { data: restaurants } = useRestaurants('restaurants')

    return (
        <Container>
            <h1>Alla restauranger</h1>

            <RestaurantsList restaurants={restaurants} />
        </Container>
    )
}

export default RestaurantsListPage