import {useState} from 'react'
import { where } from 'firebase/firestore'
import {Card, ListGroup} from 'react-bootstrap'
import useGetCollection from '../hooks/useGetCollection'

const ListOfNearbyRestaurants = ({searchedLocation}) => {
    // const [listOfRestaurants, setListOfRestaurants] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [clickedRestaurant, setClickedRestaurant] = useState(null)

    const restaurants = useGetCollection('restaurants', searchedLocation, orderByName)
    
    // setListOfRestaurants(restaurants)
    // console.log(restaurants)

    const seeDetails = (thisRestaurant) => {
        // console.log('clicked on: ', thisRestaurant)

        if (clickedRestaurant === null) {
            setClickedRestaurant(thisRestaurant)
            setShowDetails(true)
        } else if(clickedRestaurant === thisRestaurant) {
            setShowDetails(!showDetails)
        } else {
            setClickedRestaurant(thisRestaurant)
            setShowDetails(true)
        }
    }

    return (
        <>
            {restaurants.isLoading && (<div className='absolute-list'>Loading...</div>)}

            {restaurants.isError && (<div className='absolute-list'>{restaurants.error}</div>)}

            {!restaurants.isLoading && restaurants.data && (
                <>
                    <div className='absolute-list'>
                        <div className='d-md-inline-block'>
                            <ListGroup>
                                {restaurants.data.map(restaurant => (
                                    <ListGroup.Item onClick={() => seeDetails(restaurant)} key={restaurant.id}>{restaurant.namn}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                        
                        {showDetails && (
                        <div className='d-md-inline-block border rounded p-2'>
                            <div className='d-flex flex-column'>
                                <h5>
                                    {clickedRestaurant.namn}
                                </h5>
                                <span>
                                    {clickedRestaurant.beskrivning}
                                </span>
                                <span>
                                    Adress: {clickedRestaurant.adress}
                                </span>
                                <span>
                                    Ort: {clickedRestaurant.ort}
                                </span>
                                <span>
                                    Cuisine: {clickedRestaurant.cuisine}
                                </span>
                                <span>
                                    Typ: {clickedRestaurant.typ}
                                </span>
                                <span>
                                    Utbud: {clickedRestaurant.utbud}
                                </span>

                                {clickedRestaurant.telefon && (
                                    <span>
                                        Telefon: {clickedRestaurant.telefon}
                                    </span>
                                )}

                                {clickedRestaurant.facebook && (
                                    <span>
                                        Facebook: {clickedRestaurant.facebook}
                                    </span>
                                )}

                                {clickedRestaurant.email && (
                                    <span>
                                        Email: {clickedRestaurant.email}
                                    </span>
                                )}

                                {clickedRestaurant.hemsida && (
                                    <span>
                                        Hemsida: {clickedRestaurant.hemsida}
                                    </span>
                                )}

                                {clickedRestaurant.instagram && (
                                    <span>
                                        Instagram: {clickedRestaurant.instagram}
                                    </span>
                                )}
                            </div>
                        </div>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default ListOfNearbyRestaurants
