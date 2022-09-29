// import {useState} from 'react'
import { where } from 'firebase/firestore'
import {ListGroup} from 'react-bootstrap'
import useGetCollection from '../hooks/useGetCollection'

const ListOfNearbyRestaurants = ({searchedLocation}) => {
    // const [listOfRestaurants, setListOfRestaurants] = useState([])

    // const restaurants = useStreamCollection('restaurants', where("ort", "==", searchedLocation))
    const restaurants = useGetCollection('restaurants', searchedLocation)
    
    // setListOfRestaurants(restaurants)
    console.log(restaurants)

    return (
        <>
            {restaurants.isLoading && (<div className='absolute-list'>Loading...</div>)}

            {restaurants.isError && (<div className='absolute-list'>{restaurants.error}</div>)}

            {!restaurants.isLoading && restaurants.data && (
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
