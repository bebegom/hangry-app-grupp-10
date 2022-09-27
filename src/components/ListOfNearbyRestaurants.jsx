import {useState} from 'react'
import useStreamCollection from '../hooks/useStreamCollection'
import { where } from 'firebase/firestore'
import {ListGroup} from 'react-bootstrap'

const ListOfNearbyRestaurants = ({searchedLocation}) => {
    // const [listOfRestaurants, setListOfRestaurants] = useState([])

    const restaurants = useStreamCollection('restaurants', where("ort", "==", searchedLocation))
    
    // setListOfRestaurants(restaurants)
    console.log(restaurants)

    return (
        <>
            {restaurants.loading && (<div className='absolute-list'>Loading...</div>)}

            {!restaurants.loading && restaurants.data && (
                <div className='absolute-list'>
                    hello {searchedLocation}
                    <ListGroup>
                        {restaurants.data.map(restaurant => (
                            <ListGroup.Item key={restaurant.id}>{restaurant.namn}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            )}
        </>
    )
}

export default ListOfNearbyRestaurants
