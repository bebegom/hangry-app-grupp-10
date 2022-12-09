import {useState} from 'react'
import {ListGroup, Button} from 'react-bootstrap'
import useUsers from '../hooks/useUsers'
import UpdateRestaurantForm from './UpdateRestaurantForm'
import { useAuthContext } from '../contexts/AuthContext'

const ListOfNearbyRestaurants = ({clickedOnMarker, setClickedOnMarker, setNewCenter, restaurants, town, chosenRestaurant}) => {
    
    const nearByRestaurants = restaurants.filter(i => i.ort == town)
    
    const seeDetails = (thisRestaurant) => {
        if (clickedOnMarker === null) {
            setClickedOnMarker(thisRestaurant)
            setNewCenter({lat: thisRestaurant.lat, lng: thisRestaurant.lng})
        } else if(clickedOnMarker === thisRestaurant) {
            setClickedOnMarker(null)

        } else {
            setClickedOnMarker(thisRestaurant)
            setNewCenter({lat: thisRestaurant.lat, lng: thisRestaurant.lng})
        }
    }

    return (
        <>
            {nearByRestaurants && nearByRestaurants.length == 0 && (
                <div className='absolute-list p-2'>
                    No matches
                </div>
            )}

            {nearByRestaurants && nearByRestaurants.length > 0 && (
                <>
                    <div className='absolute-list p-2 d-flex'>
                        <div className='d-md-inline-block'>
                            <ListGroup>
                                {nearByRestaurants.map(restaurant => (
                                    <ListGroup.Item onClick={() => seeDetails(restaurant)} key={restaurant.id}>{restaurant.namn}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ListOfNearbyRestaurants
