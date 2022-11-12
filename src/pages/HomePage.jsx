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

/* a library of data for maps api */
const libraries = ['places']

/* Fetch data from Firebase and store inside of places */
const places = [{

}]

const HomePage = () => {
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
    const [weHaveReadableTown, setWeHaveReadableTown] = useState(null)
    const [searched, setSearched] = useState(false)
    const [searchedLocation, setSearchedLocation] = useState(null)
    const [showList, setShowList] = useState(false)
    
    // states for filtering
    const [filteredListByTyp, setFilteredListByTyp] = useState(null)
    const [filteredListByUtbud, setFilteredListByUtbud] = useState(null)

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

    const handleWaypoint = async (origin, destination) => {
        const google = window.google
        const directionsService = new google.maps.DirectionsService()

        const results = await new directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            }
        )

        // update renderDirection state
        setRenderDirection(results)
    }

    // removes direction from map
    const removeDirection = () => {
        setRenderDirection(null)
    }

    useEffect(() => {
        getMyPos()
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
                        center={position}
                        mapContainerClassName="mapContainer"
                    >
                        {userMarker && <Marker position={userMarker} label="You" />}
                        {renderDirection && <DirectionsRenderer directions={renderDirection} />}

                        {allRestaurants.data && !searched && (
                            <>
                                {!filteredListByTyp && (
                                    <MarkersComponent restaurants={allRestaurants.data} town={weHaveReadableTown} />
                                )}

                                {filteredListByTyp && !filteredListByUtbud && (
                                    <MarkersComponent restaurants={filteredListByTyp} town={weHaveReadableTown} />
                                )}

                                {filteredListByUtbud && (
                                    <MarkersComponent restaurants={filteredListByUtbud} town={weHaveReadableTown} />
                                )}
                            </>
                        )}

                        {searched && (
                            <>
                                {!filteredListByTyp && (
                                    <MarkersComponent restaurants={allRestaurants.data} town={searchedLocation} />
                                )}

                                {filteredListByTyp && !filteredListByUtbud && (
                                    <MarkersComponent restaurants={filteredListByTyp} town={searchedLocation} />
                                )}

                                {filteredListByUtbud && (
                                    <MarkersComponent restaurants={filteredListByUtbud} town={searchedLocation} />
                                )}
                            </>
                        )}
                    </GoogleMap>

                    {allRestaurants.data && !searched && (
                            <>
                                {showList && (
                                    <>
                                        {!filteredListByTyp && (
                                            <ListOfNearbyRestaurants restaurants={allRestaurants.data} town={weHaveReadableTown} />
                                        )}

                                        {filteredListByTyp && !filteredListByUtbud && (
                                            <ListOfNearbyRestaurants restaurants={filteredListByTyp} town={weHaveReadableTown} />
                                        )}

                                        {filteredListByUtbud && (
                                            <ListOfNearbyRestaurants restaurants={filteredListByUtbud} town={weHaveReadableTown} />
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
                                            <ListOfNearbyRestaurants restaurants={allRestaurants.data} town={searchedLocation} />
                                        )}

                                        {filteredListByTyp && !filteredListByUtbud && (
                                            <ListOfNearbyRestaurants restaurants={filteredListByTyp} town={searchedLocation} />
                                        )}

                                        {filteredListByUtbud && (
                                            <ListOfNearbyRestaurants restaurants={filteredListByUtbud} town={searchedLocation} />
                                        )}
                                    </>
                                )}
                            </>
                        )}

                    <div className="mapButtonLayout">

                        <div className='mt-3'>
                            <Button onClick={() => toGetOnlyByTyp('restaurang')} variant='outline-primary'>Restaurang</Button>
                            <Button onClick={() => toGetOnlyByTyp('snabbmat')} variant='outline-primary'>Snabbmat</Button>
                            <Button onClick={() => toGetOnlyByTyp('cafe')} variant='outline-primary'>Café</Button>
                        </div>

                        <div className={`mt-3 ${filteredListByTyp ? '' : 'd-none'}`}>
                            <Button disabled={!filteredListByTyp} onClick={() => toGetOnlyByUtbud('lunch')} variant='outline-primary'>Lunch</Button>
                            <Button disabled={!filteredListByTyp} onClick={() => toGetOnlyByUtbud('middag')} variant='outline-primary'>Middag</Button>
                        </div>

                        <Button disabled={allRestaurants.data.length == 0} className="mt-3 btnBlack" onClick={() => setShowList(!showList)}>
                            {showList ? 'Hide list' : 'Show list'}
                        </Button>

                        <SearchForm onSubmit={searchSubmit} />

                        {renderDirection && <Button onClick={removeDirection}>Remove Direction</Button>}

                        {!userMarker && <Button className="btnBlack mb-2" onClick={getMyPos}>Get my location</Button>}
                    </div>
                </>
            )}
        </>
   )
}

export default HomePage