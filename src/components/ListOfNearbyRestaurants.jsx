import {useState} from 'react'
import {ListGroup, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import useGetCollection from '../hooks/useGetCollection'
// import MarkersComponent from './MarkersComponent'

const ListOfNearbyRestaurants = ({restaurantsInLocation}) => {
    const [showDetails, setShowDetails] = useState(false)
    const [clickedRestaurant, setClickedRestaurant] = useState(null)
    const [onlyRestaurants, setOnlyRestaurants] = useState(null)
    const [onlySnabbmat, setOnlySnabbmat] = useState(null)
    // const restaurants = useGetCollection('restaurants', searchedLocation)
    const [list, setList] = useState(null)

    const toGetOnlyRestaurants = () => {
        setShowDetails(false)
        setOnlySnabbmat(null)

        if(onlyRestaurants) {
            setOnlyRestaurants(null)
            setList(null)
            return
        }

        const newList = restaurantsInLocation.filter(i => i.typ === 'restaurang')
        setList(newList)
        setOnlyRestaurants(newList)
    }
    
    const toGetOnlySnabbmat = () => {
        setShowDetails(false)
        setOnlyRestaurants(null)

        if(onlySnabbmat) {
            setOnlySnabbmat(null)
            setList(null)
            return
        }

        const newList = restaurantsInLocation.filter(i => i.typ === 'snabbmat')
        setList(newList)
        setOnlySnabbmat(newList)
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
            {/* {restaurants.isLoading && (<div className='absolute-list'>Loading...</div>)} */}

            {/* {restaurants.isError && (<div className='absolute-list'>{restaurants.error}</div>)} */}

            {restaurantsInLocation && (
                <>
                    <div className='absolute-list p-2'>
                        <div className='m-2 '>
                            <span className='mx-2'>
                                Filters:
                            </span>
                            <Button onClick={toGetOnlyRestaurants} variant={onlyRestaurants ? 'primary' : 'outline-primary'}>Restaurang</Button>
                            <Button onClick={toGetOnlySnabbmat} variant={onlySnabbmat ? 'primary' : 'outline-primary'}>Snabbmat</Button>
                        </div>

                        <div className='d-flex'>
                            {!onlyRestaurants && !onlySnabbmat && (
                                <div className='d-md-inline-block'>
                                    <ListGroup>
                                        {restaurantsInLocation.map(restaurant => (
                                            <ListGroup.Item onClick={() => seeDetails(restaurant)} key={restaurant.id}>{restaurant.namn}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>
                            )}
                            {onlyRestaurants && !onlySnabbmat && (
                                <div className='d-md-inline-block'>
                                    <ListGroup>
                                        {onlyRestaurants.map(restaurant => (
                                            <ListGroup.Item onClick={() => seeDetails(restaurant)} key={restaurant.id}>{restaurant.namn}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>
                            )}

                            {onlySnabbmat && !onlyRestaurants && (
                                <div className='d-md-inline-block'>
                                    <ListGroup>
                                        {onlySnabbmat.map(restaurant => (
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
                                <Button className="mt-2"
                                    as={Link}
                                    to="/update-restaurant"
                                >Update info</Button>
                            </div>
                            )}
                        </div>
                    </div>

                    {/* <MarkersComponent restaurants={restaurants} town={searchedLocation} filteredList={list} /> */}
                </>
            )}
        </>
    )
}

export default ListOfNearbyRestaurants
