import {useState} from 'react'
import { where } from 'firebase/firestore'
import {Card, ListGroup, Button} from 'react-bootstrap'
import useGetCollection from '../hooks/useGetCollection'

import { Form } from 'react-bootstrap'

const ListOfNearbyRestaurants = ({searchedLocation}) => {
    // const [listOfRestaurants, setListOfRestaurants] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [clickedRestaurant, setClickedRestaurant] = useState(null)
    // const [filteredByTypList, setFilteredByTypList] = useState(null)
    const [getOnlyRestaurants, setGetOnlyRestaurants] = useState(false)
    const [getOnlySnabbmat, setGetOnlySnabbmat] = useState(false)
    const [onlyRestaurants, setOnlyRestaurants] = useState(null)

    const restaurants = useGetCollection('restaurants', searchedLocation)

    const toGetOnlyRestaurants = () => {
        if(onlyRestaurants) {
            setOnlyRestaurants(null)
            setGetOnlyRestaurants(false)
            return
        }

        setGetOnlyRestaurants(true)
        setGetOnlySnabbmat(false)
        const list = restaurants.data.filter(i => i.typ === 'restaurang')
        setOnlyRestaurants(list)
    }
    
    const onlySnabbmat = () => {
        setGetOnlySnabbmat(!getOnlySnabbmat)
        setGetOnlyRestaurants(false)
    }
    
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
                        <div>
                            Filter:
                            <Button onClick={toGetOnlyRestaurants} variant={getOnlyRestaurants ? 'primary' : 'outline-primary'}>Restaurang</Button>
                            <Button onClick={onlySnabbmat} variant={getOnlySnabbmat ? 'primary' : 'outline-primary'}>Snabbmat</Button>
                        </div>
                        {!onlyRestaurants && (
                            <div className='d-md-inline-block'>
                            <ListGroup>
                                {restaurants.data.map(restaurant => (
                                    <ListGroup.Item onClick={() => seeDetails(restaurant)} key={restaurant.id}>{restaurant.namn}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                        )}
                        {onlyRestaurants && (
                            <div className='d-md-inline-block'>
                            <ListGroup>
                                {onlyRestaurants.map(restaurant => (
                                    <ListGroup.Item onClick={() => seeDetails(restaurant)} key={restaurant.id}>{restaurant.namn}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                        )}
                        
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
