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

        // disable the other 'typ'-buttons
        if(e.target.classList.contains("btn-filter-typ") ) {

            const allFilterBtns = document.getElementsByClassName("btn-filter-typ")

            if(allFilterBtns[0].classList.contains('disabled') || allFilterBtns[1].classList.contains('disabled') || allFilterBtns[2].classList.contains('disabled') || localStorage.getItem('activeFilterTyp')) {

                localStorage.removeItem('activeFilterTyp')

                allFilterBtns[0].classList.remove("disabled")
                allFilterBtns[1].classList.remove("disabled")
                allFilterBtns[2].classList.remove("disabled")

                e.target.classList.remove("disabled")

                const allFilterUtbudBtns = document.getElementsByClassName("btn-filter-utbud")
                allFilterUtbudBtns[0].classList.remove("disabled")
                allFilterUtbudBtns[1].classList.remove("disabled")

                localStorage.clear()
                
            } else {
                // if they do not contain disabled
                localStorage.setItem('activeFilterTyp', e.target.innerText)
                
                allFilterBtns[0].classList.add("disabled")
                allFilterBtns[1].classList.add("disabled")
                allFilterBtns[2].classList.add("disabled")

                e.target.classList.remove("disabled")

            }
        } 
        
        // disable the other 'utbud'-buttons
        if(e.target.classList.contains("btn-filter-utbud")) {

            const allFilterBtns = document.getElementsByClassName("btn-filter-utbud")

            if(allFilterBtns[0].classList.contains('disabled') || allFilterBtns[1].classList.contains('disabled') || localStorage.getItem('activeFilterUtbud')) {
                

                allFilterBtns[0].classList.remove("disabled")
                allFilterBtns[1].classList.remove("disabled")

                localStorage.removeItem('activeFilterUtbud')
                localStorage.removeItem('byUtbud')

            } else {
                allFilterBtns[0].classList.add("disabled")
                allFilterBtns[1].classList.add("disabled")

                e.target.classList.remove("disabled")

                localStorage.setItem('activeFilterUtbud', e.target.innerText)
            }
        }
    }

    const toGetOnlyByTyp = (typ) => {
        if(filteredListByUtbud) {
            setFilteredListByUtbud(null)
            localStorage.removeItem('byUtbud')
            setFilteredListByTyp(null)
            localStorage.removeItem('byTyp')
            return
        }

        if(searched) {
            if(filteredListByTyp != null && filteredListByTyp.length > 0 && filteredListByTyp[0].typ == typ) {
                setFilteredListByTyp(null)
                setFilteredListByUtbud(null)

                localStorage.clear()
                return
            }

            const filteredByTyp = allRestaurants.data.filter(i => i.typ == typ)
            const filteredList = filteredByTyp.filter(i => i.ort == searchedLocation)
            setFilteredListByTyp(filteredList)
            localStorage.setItem('byTyp', JSON.stringify(filteredList))
            return
        }

        if(filteredListByTyp != null && filteredListByTyp.length > 0 && filteredListByTyp[0].typ == typ || filteredListByTyp != null && filteredListByTyp.length == 0) {
            setFilteredListByTyp(null)
            setFilteredListByUtbud(null)
            localStorage.removeItem('byTyp')
            localStorage.removeItem('byUtbud')

            localStorage.clear()
            return
        }

        const filteredByTyp = allRestaurants.data.filter(i => i.typ == typ)
        const filteredList = filteredByTyp.filter(i => i.ort == weHaveReadableTown)
        setFilteredListByTyp(filteredList)

        localStorage.setItem('byTyp', JSON.stringify(filteredList))
    }

    const toGetOnlyByUtbud = (utbud) => {
        if(filteredListByUtbud != null) {
            setFilteredListByUtbud(null)
            localStorage.removeItem('byUtbud')

            const filteredByTyp = allRestaurants.data.filter(i => i.typ == localStorage.getItem('activeFilterTyp').toLowerCase())
            setFilteredListByTyp(filteredByTyp)
            return
        }

        const newList = filteredListByTyp.filter(i => i.utbud == utbud)
        setFilteredListByUtbud(newList)
        localStorage.setItem('byUtbud', JSON.stringify(newList))
    }

    // Get value from SearchForm and execute new coords
    const searchSubmit = async (address) => {
        // no value? Return
        if(!address) {
            return
        }

        localStorage.clear()
        setFilteredListByTyp(null)
        setFilteredListByUtbud(null)

        const allFilterTypBtns = document.getElementsByClassName("btn-filter-typ")
        allFilterTypBtns[0].classList.remove('disabled')
        allFilterTypBtns[1].classList.remove('disabled')
        allFilterTypBtns[2].classList.remove('disabled')

        const allFilterUtbudBtns = document.getElementsByClassName("btn-filter-utbud")
        allFilterUtbudBtns[0].classList.remove('disabled')
        allFilterUtbudBtns[1].classList.remove('disabled')

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

        setNewCenter(null)
        setSearched(false)

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
    //  const removeDirection = () => {
    //     setRenderDirection(null)
    // }

    useEffect(() => {
        getMyPos()
        handleDirection()
    }, [restaurantDestination])

    useEffect(() => {

        let listByTyp = localStorage.getItem('byTyp')
        let listByUtbud = localStorage.getItem('byUtbud')

        if(listByTyp != null) {
            listByTyp = JSON.parse(localStorage.getItem('byTyp'))
            setFilteredListByTyp(listByTyp)
        } 

        if(listByUtbud != null) {
            listByUtbud = JSON.parse(localStorage.getItem('byUtbud'))
            setFilteredListByUtbud(listByUtbud)
        }
        
    }, [])

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
                                            <ListOfNearbyRestaurants clickedOnMarker={clickedOnMarker} setClickedOnMarker={setClickedOnMarker} setNewCenter={setNewCenter} restaurants={allRestaurants.data} town={weHaveReadableTown} />
                                        )}

                                        {filteredListByTyp && !filteredListByUtbud && (
                                            <ListOfNearbyRestaurants clickedOnMarker={clickedOnMarker} setClickedOnMarker={setClickedOnMarker} setNewCenter={setNewCenter} restaurants={filteredListByTyp} town={weHaveReadableTown} />
                                        )}

                                        {filteredListByUtbud && (
                                            <ListOfNearbyRestaurants clickedOnMarker={clickedOnMarker} setClickedOnMarker={setClickedOnMarker} setNewCenter={setNewCenter} restaurants={filteredListByUtbud} town={weHaveReadableTown} />
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
                                            <ListOfNearbyRestaurants clickedOnMarker={clickedOnMarker} setClickedOnMarker={setClickedOnMarker} setNewCenter={setNewCenter} restaurants={allRestaurants.data} town={searchedLocation} chosenRestaurant={chosenRestaurant} />
                                        )}

                                        {filteredListByTyp && !filteredListByUtbud && (
                                            <ListOfNearbyRestaurants clickedOnMarker={clickedOnMarker} setClickedOnMarker={setClickedOnMarker} setNewCenter={setNewCenter} restaurants={filteredListByTyp} town={searchedLocation} 
                                            chosenRestaurant={chosenRestaurant} />
                                        )}

                                        {filteredListByUtbud && (
                                            <ListOfNearbyRestaurants clickedOnMarker={clickedOnMarker} setClickedOnMarker={setClickedOnMarker} setNewCenter={setNewCenter} restaurants={filteredListByUtbud} town={searchedLocation} chosenRestaurant={chosenRestaurant} />
                                        )}
                                    </>
                                )}
                            </>
                        )}

                    <div className="mapButtonLayout">
                        
                        <div className='mt-3'>
                            <Button 
                                disabled={localStorage.getItem('activeFilterTyp') && localStorage.getItem('activeFilterTyp') != 'Restaurang'}
                                className='btn-filter btn-filter-typ' 
                                onClick={(e) => {
                                    filterActive(e)
                                    toGetOnlyByTyp('restaurang')
                                }} 
                                variant={localStorage.getItem('activeFilterTyp') == "Restaurang" ? 'primary' : 'outline-primary'}
                            >
                                Restaurang
                            </Button>

                            <Button 
                                disabled={localStorage.getItem('activeFilterTyp') && localStorage.getItem('activeFilterTyp') != 'Snabbmat'}
                                className='btn-filter btn-filter-typ' 
                                onClick={(e) => {
                                    filterActive(e)
                                    toGetOnlyByTyp('snabbmat')
                                }} 
                                variant={localStorage.getItem('activeFilterTyp') == "Snabbmat" ? 'primary' : 'outline-primary'}
                                >
                                    Snabbmat
                                </Button>

                            <Button
                                disabled={localStorage.getItem('activeFilterTyp') && localStorage.getItem('activeFilterTyp') != 'Café'}
                                className='btn-filter btn-filter-typ' 
                                onClick={(e) => {
                                    filterActive(e)
                                    toGetOnlyByTyp('cafe')
                                }} 
                                variant={localStorage.getItem('activeFilterTyp') == "Café" ? 'primary' : 'outline-primary'}
                            >
                                Café
                            </Button>
                        </div>

                        <div className={`mt-3 ${filteredListByTyp ? '' : 'd-none'}`}>
                            <Button
                                disabled={localStorage.getItem('activeFilterUtbud') && localStorage.getItem('activeFilterUtbud') != 'Lunch'}
                                className='btn-filter btn-filter-utbud'  
                                onClick={(e) => {
                                    filterActive(e)
                                    toGetOnlyByUtbud('lunch')
                                }} 
                                variant={localStorage.getItem('activeFilterUtbud') == "Lunch" ? 'primary' : 'outline-primary'}
                            >
                                Lunch
                            </Button>

                            <Button 
                            disabled={localStorage.getItem('activeFilterUtbud') && localStorage.getItem('activeFilterUtbud') != 'Middag'}
                                className='btn-filter btn-filter-utbud' 
                                onClick={(e) => {
                                    filterActive(e)
                                    toGetOnlyByUtbud('middag')
                                }} 
                                variant={localStorage.getItem('activeFilterUtbud') == "Middag" ? 'primary' : 'outline-primary'}
                                >
                                    Middag
                                </Button>
                        </div>

                        <Button disabled={allRestaurants.data.length == 0} className="mt-3 btnBlack" onClick={() => setShowList(!showList)}>
                            {showList ? 'Hide list' : 'Show list'}
                        </Button>

                        <SearchForm onSubmit={searchSubmit} />

                        {/* {renderDirection && <Button onClick={removeDirection}>Remove Direction</Button>} */}

                        {<Button className="btn my-2" onClick={() => {
                            getMyPos()
                            setFilteredListByTyp(null)
                            setFilteredListByUtbud(null)
                            localStorage.clear()

                            const allFilterTypBtns = document.getElementsByClassName("btn-filter-typ")
                            allFilterTypBtns[0].classList.remove('disabled')
                            allFilterTypBtns[1].classList.remove('disabled')
                            allFilterTypBtns[2].classList.remove('disabled')

                            const allFilterUtbudBtns = document.getElementsByClassName("btn-filter-utbud")
                            allFilterUtbudBtns[0].classList.remove('disabled')
                            allFilterUtbudBtns[1].classList.remove('disabled')

                        }}>Get my location</Button>}
                    </div>
                </>
            )}
        </>
   )
}

export default HomePage