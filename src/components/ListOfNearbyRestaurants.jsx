import {useState} from 'react'
import { where, orderBy } from 'firebase/firestore'
import {ListGroup} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import useGetCollection from '../hooks/useGetCollection'

const ListOfNearbyRestaurants = ({searchedLocation}) => {
    /* const [listOfRestaurants, setListOfRestaurants] = useState([]) */
    const [orderByName, setOrderByName] = useState(false)

    const restaurants = useGetCollection('restaurants', searchedLocation, orderByName)
    
    console.log(restaurants)

    return (
        <>
            {restaurants.isLoading && (<div className='absolute-list'>Loading...</div>)}

            {restaurants.isError && (<div className='absolute-list'>{restaurants.error}</div>)}

            {!restaurants.isLoading && restaurants.data && (
                <div className='absolute-list'>
                    Location: {searchedLocation}
                    <ListGroup>
                        {restaurants.data.map(restaurant => (
                            <ListGroup.Item key={restaurant.id}>{restaurant.namn}</ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Button className="my-2" onClick={getOrderByName}>Sort by name</Button>
                </div>
            )}
        </>
    )
}

export default ListOfNearbyRestaurants
