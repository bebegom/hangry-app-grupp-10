import {useState} from 'react'
import {ListGroup, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ListOfNearbyRestaurants = ({restaurants, town}) => {
    const [showDetails, setShowDetails] = useState(false)
    const [clickedRestaurant, setClickedRestaurant] = useState(null)

    console.log('restaurants', restaurants)
    const nearByRestaurants = restaurants.filter(i => i.ort == town)
    console.log('nearbyrestaurants', nearByRestaurants)
    
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
            {nearByRestaurants && (
                <>
                    <div className='absolute-list p-2 d-flex'>
                        <div className='d-md-inline-block'>
                            <ListGroup>
                                {nearByRestaurants.map(restaurant => (
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
                                <Button className="mt-2"
                                    as={Link}
                                    to="/update-restaurant"
                                >Update info</Button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default ListOfNearbyRestaurants
