import {useState} from 'react'
import {ListGroup, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useGetCollection from '../hooks/useGetCollection'
import MarkersComponent from './MarkersComponent'
import useUsers from '../hooks/useUsers'
import UpdateRestaurantForm from './UpdateRestaurantForm'
import { useAuthContext } from '../contexts/AuthContext'

const ListOfNearbyRestaurants = ({restaurants, town}) => {
    let thisUser
    const { currentUser } = useAuthContext()
    const allUsers = useUsers()
    // console.log(allUsers)
    if (currentUser) {
        const user = allUsers.data.filter(user => user.email == currentUser.email)
        thisUser = user
    }
    // console.log(thisUser)
    const [showDetails, setShowDetails] = useState(false)
    const [clickedRestaurant, setClickedRestaurant] = useState(null)

    const [showUpdateForm, setShowUpdateForm] = useState(false) 

    // console.log('restaurants', restaurants)
    const nearByRestaurants = restaurants.filter(i => i.ort == town)
    // console.log('nearbyrestaurants', nearByRestaurants)
    
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
                                {thisUser.length === 1 && thisUser[0].admin && (
                                    <Button className="mt-2"
                                        onClick={() => setShowUpdateForm(!showUpdateForm)}
                                    >Update info</Button>
                                )}

                                {showUpdateForm && (
                                    <UpdateRestaurantForm thisRestaurant={clickedRestaurant} />
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default ListOfNearbyRestaurants
