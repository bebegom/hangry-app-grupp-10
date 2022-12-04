import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer} from '@react-google-maps/api'
import GMapAPI from '../services/GMapAPI'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import '../assets/scss/mapStyling.scss'
import SearchForm from '../components/SearchForm'
import MarkersComponent from '../components/MarkersComponent'
import useRestaurants from '../hooks/useRestaurants'
import ListOfNearbyRestaurants from '../components/ListOfNearbyRestaurants'
import '../assets/scss/HomePage.scss'
import { useAuthContext } from '../contexts/AuthContext'
import UpdateRestaurantForm from '../components/UpdateRestaurantForm'
import useUsers from '../hooks/useUsers'
import { useSearchParams } from 'react-router-dom'


/* a library of data for maps api */
const libraries = ['places']

/* Fetch data from Firebase and store inside of places */
const places = [{

}]

const HomePage = () => {
    const { currentUser } = useAuthContext()
    let thisUser
    const allUsers = useUsers()
    if (currentUser) {
        const user = allUsers.data.filter(user => user.email == currentUser.email)
        thisUser = user
    }

    /* Call on maps api, give apikey and libraries */
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries
    })

    // get all reastaurants from firestore
    // const allRestaurants = useStreamCollection('restaurants')
    const allRestaurants = useRestaurants()

    // Default Position(Malmö) om getMyPos failar
    const [position, setPosition] = useState({lat: 55.604981, lng: 13.003822})

    const [userMarker, setUserMarker] = useState(null)
    const [renderDirection, setRenderDirection] = useState(null)
    const [restaurantDestination, setRestaurantDestination] = useState(null)
    const [weHaveReadableTown, setWeHaveReadableTown] = useState(null)
    const [searched, setSearched] = useState(false)
    const [searchedLocation, setSearchedLocation] = useState(null)
    const [showList, setShowList] = useState(false)
    const [clickedOnMarker, setClickedOnMarker] = useState(null)
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get('query')

    const [newCenter, setNewCenter] = useState(null)
    
    // states for filtering
    const [filteredListByTyp, setFilteredListByTyp] = useState(null)
    const [filteredListByUtbud, setFilteredListByUtbud] = useState(null)

    const filterActive = (e) => {
        console.log(e.target)

        // disable the other 'typ'-buttons
        if(e.target.classList.contains("btn-filter-typ")) {
            const allFilterBtns = document.getElementsByClassName("btn-filter-typ")

            allFilterBtns[0].classList.toggle("disabled")
            allFilterBtns[1].classList.toggle("disabled")
            allFilterBtns[2].classList.toggle("disabled")

            e.target.classList.remove("disabled")
        } 
        
        // disable the other 'utbud'-buttons
        if(e.target.classList.contains("btn-filter-utbud")) {
            const allFilterBtns = document.getElementsByClassName("btn-filter-utbud")

            allFilterBtns[0].classList.toggle("disabled")
            allFilterBtns[1].classList.toggle("disabled")

            e.target.classList.remove("disabled")
        }

        // show if filtering is active of not
        if(e.target.classList.contains('btn-outline-primary')) {
            e.target.classList.remove('btn-outline-primary')
            e.target.classList.add('btn-primary')
        } else {
            e.target.classList.remove('btn-primary')
            e.target.classList.add('btn-outline-primary')
        }
    }

    const toGetOnlyByTyp = (typ) => {
        if(filteredListByUtbud) {
            setFilteredListByUtbud(null)
        }

        if(searched) {
            if(filteredListByTyp != null && filteredListByTyp.length > 0 && filteredListByTyp[0].typ == typ) {
                setFilteredListByTyp(null)
                return
            }

            const filteredByTyp = allRestaurants.data.filter(i => i.typ == typ)
            const filteredList = filteredByTyp.filter(i => i.ort == searchedLocation)
            setFilteredListByTyp(filteredList)
            return
        }

        if(filteredListByTyp != null && filteredListByTyp.length > 0 && filteredListByTyp[0].typ == typ) {
            setFilteredListByTyp(null)
            return
        }

        const filteredByTyp = allRestaurants.data.filter(i => i.typ == typ)
        const filteredList = filteredByTyp.filter(i => i.ort == weHaveReadableTown)
        setFilteredListByTyp(filteredList)
    }

    const toGetOnlyByUtbud = (utbud) => {
        if(filteredListByUtbud != null && filteredListByUtbud.length > 0 && filteredListByUtbud[0].utbud == utbud) {
            setFilteredListByUtbud(null)
            return
        }

        const newList = filteredListByTyp.filter(i => i.utbud == utbud)
        setFilteredListByUtbud(newList)

    }

    // Get value from SearchForm and execute new coords
    const searchSubmit = async (address) => {
        // no value? Return
        if(!address) {
            return
        }

        // Get coordinates
        const [newCoords, city] = await GMapAPI.getLatLng(address)

        // Center to new coordinates
        setPosition(newCoords)

        setSearched(true)
        setSearchedLocation(city.long_name)
        setWeHaveReadableTown(null)
        setShowList(false)
    }

    const showLocation = (position) => {
        let userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
       /*  console.log("Latitude : " + userCoords.lat + " Longitude: " + userCoords.lng) */
        setPosition(userCoords)
        setUserMarker(userCoords)
    }

    const errorHandler = (err) => {
        if(err.code == 1) {
           console.log("Error: Access is denied!");
        } else if( err.code == 2) {
           console.log("Error: Position is unavailable!");
        }
    }

    // When clicked "get my position" run this
    const getMyPos = async () => {

        const getUserCoords = await GMapAPI.getUserLatLng()

        const weHaveReadable = await GMapAPI.getAdressFromLatLng(getUserCoords.lat, getUserCoords.lng)
        // update state to user location
        setWeHaveReadableTown(weHaveReadable)
        
        if(navigator.geolocation) {
            // timeout at 60000 milliseconds (60 seconds)
            let options = {timeout:60000};
            navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options)
        } else {
            alert("Sorry, browser does not support geolocation!");
        }

    }

    const chosenRestaurant = (address) => {
        setRestaurantDestination(address)
    }

    const handleDirection = async () => {
        if(userMarker) {
            const google = window.google
            const directionsService = new google.maps.DirectionsService()

            const results = await new directionsService.route(
                {
                    origin: userMarker,
                    destination: restaurantDestination,
                    travelMode: google.maps.TravelMode.DRIVING
                }
            )
            // update renderDirection state
            setRenderDirection(results)
        }  
    }

    // removes direction from map
    /* const removeDirection = () => {
        setRenderDirection(null)
    } */

    useEffect(() => {
        getMyPos()
        handleDirection()
    }, [restaurantDestination])

    useEffect(() => {
        let listByTyp = localStorage.getItem('byTyp') || []
        let listByUtbud = localStorage.getItem('byUtbud') || []

        if(listByTyp != null) {
            listByTyp = JSON.parse(localStorage.getItem('byTyp')) || []
            setFilteredListByTyp(listByTyp)
        } 

        if(listByUtbud != null) {
            listByUtbud = JSON.parse(localStorage.getItem('byUtbud')) || []
            setFilteredListByUtbud(listByUtbud)
        }

    }, [])

    useEffect(() => {
        if(filteredListByTyp != null) {
            localStorage.setItem('byTyp', JSON.stringify(filteredListByTyp)) || []
        }
        if(filteredListByUtbud != null) {    
            localStorage.setItem('byUtbud', JSON.stringify(filteredListByUtbud)) || []
        }
        
    }, [filteredListByTyp, filteredListByUtbud])


   return (
        <>
            {!isLoaded && (
                <p>Loading maps...</p>
            )}

            {/* if true, render map and searchform */}
            {isLoaded && (
                <>
                    <GoogleMap
                        zoom={12}
                        // center={clickedOnMarker ? {lat: clickedOnMarker.lat, lng: clickedOnMarker.lng} : position}
                        center={newCenter ? {lat: newCenter.lat, lng: newCenter.lng} : position}
                        mapContainerClassName="mapContainer"
                    >
                        {userMarker && <Marker onClick={() => setNewCenter(position)} position={userMarker} label="You" />}
                        {renderDirection && (<DirectionsRenderer directions={renderDirection} />)}

                        {allRestaurants.data && !searched && (
                            <>
                                {!filteredListByTyp && (
                                    <MarkersComponent setNewCenter={setNewCenter} clickedOnMarker={clickedOnMarker} showUpdateForm={showUpdateForm} changeShowUpdateForm={setShowUpdateForm} changeClickedOnMarker={setClickedOnMarker} restaurants={allRestaurants.data} town={weHaveReadableTown} />
                                )}

                                {filteredListByTyp && !filteredListByUtbud && (
                                    <MarkersComponent setNewCenter={setNewCenter} clickedOnMarker={clickedOnMarker} showUpdateForm={showUpdateForm} changeShowUpdateForm={setShowUpdateForm} changeClickedOnMarker={setClickedOnMarker} restaurants={filteredListByTyp} town={weHaveReadableTown} />
                                )}

                                {filteredListByUtbud && (
                                    <MarkersComponent setNewCenter={setNewCenter} clickedOnMarker={clickedOnMarker} showUpdateForm={showUpdateForm} changeShowUpdateForm={setShowUpdateForm} changeClickedOnMarker={setClickedOnMarker} restaurants={filteredListByUtbud} town={weHaveReadableTown} />
                                )}
                            </>
                        )}

                        {searched && (
                            <>
                                {!filteredListByTyp && (
                                    <MarkersComponent setNewCenter={setNewCenter} clickedOnMarker={clickedOnMarker} showUpdateForm={showUpdateForm} changeShowUpdateForm={setShowUpdateForm} changeClickedOnMarker={setClickedOnMarker} restaurants={allRestaurants.data} town={searchedLocation} />
                                )}

                                {filteredListByTyp && !filteredListByUtbud && (
                                    <MarkersComponent setNewCenter={setNewCenter} clickedOnMarker={clickedOnMarker} showUpdateForm={showUpdateForm} changeShowUpdateForm={setShowUpdateForm} changeClickedOnMarker={setClickedOnMarker} restaurants={filteredListByTyp} town={searchedLocation} />
                                )}

                                {filteredListByUtbud && (
                                    <MarkersComponent onSetNewCenter={setNewCenter} clickedOnMarker={clickedOnMarker} changeShowUpdateForm={setShowUpdateForm} changeClickedOnMarker={setClickedOnMarker} restaurants={filteredListByUtbud} town={searchedLocation} />
                                )}
                            </>
                        )}
                    </GoogleMap>

                    {clickedOnMarker && (
                        <div className='d-md-inline-block border rounded p-2'>
                            <div className='d-flex flex-column'>
                                <h5>
                                    {clickedOnMarker.namn}
                                </h5>
                                <span>
                                    {clickedOnMarker.beskrivning}
                                </span>
                                <span>
                                    Adress: {clickedOnMarker.adress}
                                </span>
                                <span>
                                    Ort: {clickedOnMarker.ort}
                                </span>
                                <span>
                                    Cuisine: {clickedOnMarker.cuisine}
                                </span>
                                <span>
                                    Typ: {clickedOnMarker.typ}
                                </span>
                                <span>
                                    Utbud: {clickedOnMarker.utbud}
                                </span>

                                    {clickedOnMarker.telefon && (
                                        <span>
                                            Telefon: {clickedOnMarker.telefon}
                                        </span>
                                    )}

                                    {clickedOnMarker.facebook && (
                                        <span>
                                            Facebook: {clickedOnMarker.facebook}
                                        </span>
                                    )}

                                    {clickedOnMarker.email && (
                                        <span>
                                            Email: {clickedOnMarker.email}
                                        </span>
                                    )}

                                    {clickedOnMarker.hemsida && (
                                        <span>
                                            Hemsida: {clickedOnMarker.hemsida}
                                        </span>
                                    )}

                                {clickedOnMarker.instagram && (
                                    <span>
                                        Instagram: {clickedOnMarker.instagram}
                                    </span>
                                )}
                            </div>
                            {currentUser && thisUser.length === 1 && thisUser[0].admin && (
                                <Button className="mt-2"
                                    onClick={() => setShowUpdateForm(!showUpdateForm)}
                                >{showUpdateForm ? 'Close Form' : 'Update info'}</Button>
                            )}

                            {showUpdateForm && (
                                <UpdateRestaurantForm thisRestaurant={clickedOnMarker} />
                            )}
                        </div>
                    )}

                    {allRestaurants.data && !searched && (
                            <>
                                {showList && (
                                    <>
                                        {!filteredListByTyp && (
                                            <ListOfNearbyRestaurants setNewCenter={setNewCenter} restaurants={allRestaurants.data} town={weHaveReadableTown} />
                                        )}

                                        {filteredListByTyp && !filteredListByUtbud && (
                                            <ListOfNearbyRestaurants setNewCenter={setNewCenter} restaurants={filteredListByTyp} town={weHaveReadableTown} />
                                        )}

                                        {filteredListByUtbud && (
                                            <ListOfNearbyRestaurants setNewCenter={setNewCenter} restaurants={filteredListByUtbud} town={weHaveReadableTown} />
                                        )}
                                    </>
                                )}
                            </>
                        )}

                        {searched && (
                            <>
                                {showList && (
                                    <>
                                        {!filteredListByTyp && (
                                            <ListOfNearbyRestaurants setNewCenter={setNewCenter} restaurants={allRestaurants.data} town={searchedLocation} chosenRestaurant={chosenRestaurant} />
                                        )}

                                        {filteredListByTyp && !filteredListByUtbud && (
                                            <ListOfNearbyRestaurants setNewCenter={setNewCenter} restaurants={filteredListByTyp} town={searchedLocation} 
                                            chosenRestaurant={chosenRestaurant} />
                                        )}

                                        {filteredListByUtbud && (
                                            <ListOfNearbyRestaurants setNewCenter={setNewCenter} restaurants={filteredListByUtbud} town={searchedLocation} chosenRestaurant={chosenRestaurant} />
                                        )}
                                    </>
                                )}
                            </>
                        )}

                    <div className="mapButtonLayout">
                        
                        <div className='mt-3'>
                            <Button className='btn-filter btn-filter-typ' onClick={(e) => {
                                toGetOnlyByTyp('restaurang')
                                filterActive(e)
                                }} variant='outline-primary'>Restaurang</Button>
                            <Button className='btn-filter btn-filter-typ' onClick={(e) => {
                                toGetOnlyByTyp('snabbmat')
                                filterActive(e)
                                }} variant='outline-primary'>Snabbmat</Button>
                            <Button className='btn-filter btn-filter-typ' onClick={(e) => {
                                toGetOnlyByTyp('cafe')
                                filterActive(e)
                                }} variant='outline-primary'>Café</Button>
                        </div>

                        <div className={`mt-3 ${filteredListByTyp ? '' : 'd-none'}`}>
                            <Button className='btn-filter btn-filter-utbud' disabled={!filteredListByTyp} onClick={(e) => {
                                toGetOnlyByUtbud('lunch')
                                filterActive(e)
                                }} variant='outline-primary'>Lunch</Button>
                            <Button className='btn-filter btn-filter-utbud' disabled={!filteredListByTyp} onClick={(e) => {
                                toGetOnlyByUtbud('middag')
                                filterActive(e)
                                }} variant='outline-primary'>Middag</Button>
                        </div>

                        <Button disabled={allRestaurants.data.length == 0} className="mt-3 btnBlack" onClick={() => setShowList(!showList)}>
                            {showList ? 'Hide list' : 'Show list'}
                        </Button>

                        <SearchForm onSubmit={searchSubmit} />

                        {/* {renderDirection && <Button onClick={removeDirection}>Remove Direction</Button>} */}

                        {<Button className="btn my-2" onClick={getMyPos}>Get my location</Button>}
                    </div>
                </>
            )}
        </>
   )
}

export default HomePage