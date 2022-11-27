import { Button, Container, ListGroup} from 'react-bootstrap'
import { useState } from 'react'
import useRestaurants from '../hooks/useRestaurants'
import UpdateRestaurantForm from '../components/UpdateRestaurantForm'

const RestaurantsListPage = () => {
    const { data: restaurants, error, isError, isLoading } = useRestaurants('restaurants')
    
    const [showDetails, setShowDetails] = useState(false)
    const [clickedRestaurant, setClickedRestaurant] = useState(null)
    const [showUpdateForm, setShowUpdateForm] = useState(false) 

    const seeDetails = (thisRestaurant) => {
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
            <Container>
                <h1>Alla restauranger</h1>

                {isLoading && (<p>Loading...</p>)}

                {isError && (<p>{error.message}</p>)}

                {restaurants && (
                    <>
                        <ListGroup>
                            {restaurants.map(restaurant => (
                                <ListGroup.Item onClick={() => seeDetails(restaurant)} key={restaurant.id}>{restaurant.namn}</ListGroup.Item>
                            ))}
                        </ListGroup>
                        
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
                                    onClick={() => setShowUpdateForm(!showUpdateForm)}
                                >{showUpdateForm ? 'Close Form' : 'Update info'}</Button>
                                

                                {showUpdateForm && (
                                    <UpdateRestaurantForm thisRestaurant={clickedRestaurant} />
                                )}
                            </div>
                        )}
                    </>
                )}
            </Container>
        </>
    )
}

export default RestaurantsListPage