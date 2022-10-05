import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer} from '@react-google-maps/api'
import GMapAPI from '../services/GMapAPI'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import '../assets/scss/mapStyling.scss'
import SearchForm from '../components/SearchForm'
import DirectionForm from '../components/DirectionForm'
import MarkersComponent from '../components/MarkersComponent'
import useGetCollection from '../hooks/useGetCollection'
import useStreamCollection from '../hooks/useStreamCollection'
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
    const allRestaurants = useStreamCollection('restaurants')
    // console.log('allRestaurants', allRestaurants)

    // Default Position(Malmö) om getMyPos failar
    const [position, setPosition] = useState({lat: 55.604981, lng: 13.003822})
    const [userMarker, setUserMarker] = useState(null)
    const [renderDirection, setRenderDirection] = useState(null)
    const [weHaveReadableTown, setWeHaveReadableTown] = useState(null)

    const [searched, setSearched] = useState(false)
    const [searchedLocation, setSearchedLocation] = useState(null)
    const [showList, setShowList] = useState(false)

    const [filteredListByTyp, setFilteredListByTyp] = useState(null)

    const toGetOnlyByTyp = (typ) => {
        console.log('typ:' , typ)

        if(searched) {
            if(filteredListByTyp != null && filteredListByTyp.length > 0 && filteredListByTyp[0].typ == typ) {
                setFilteredListByTyp(null)
                console.log('typ is the same')
                return
            }

            const filteredByTyp = allRestaurants.data.filter(i => i.typ == typ)
            const filteredList = filteredByTyp.filter(i => i.ort == searchedLocation)
            // console.log(filteredList)
            setFilteredListByTyp(filteredList)
            return
        }

        if(filteredListByTyp != null && filteredListByTyp.length > 0 && filteredListByTyp[0].typ == typ) {
            setFilteredListByTyp(null)
            console.log('typ is the same')
            return
        }

        const filteredByTyp = allRestaurants.data.filter(i => i.typ == typ)
        const filteredList = filteredByTyp.filter(i => i.ort == weHaveReadableTown)
        // console.log(filteredList)
        setFilteredListByTyp(filteredList)
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
    }

    // When clicked "get my position" run this
    const getMyPos = async () => {
        // call on api 
        const getUserCoords = await GMapAPI.getUserLatLng()

        const weHaveReadable = await GMapAPI.getAdressFromLatLng(getUserCoords.lat, getUserCoords.lng)
        // console.log('weHaveReadable: ', weHaveReadable)

        // update state to user location
        setPosition(getUserCoords)
        setUserMarker(getUserCoords)
        setWeHaveReadableTown(weHaveReadable)
    }

    const directionSubmit = async (origin, destination) => {
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

                                {filteredListByTyp && (
                                    <MarkersComponent restaurants={filteredListByTyp} town={weHaveReadableTown} />
                                )}

                                {showList && (
                                    <>
                                        {!filteredListByTyp && (
                                            <ListOfNearbyRestaurants restaurants={allRestaurants.data} town={weHaveReadableTown} />
                                        )}

                                        {filteredListByTyp && (
                                            <ListOfNearbyRestaurants restaurants={filteredListByTyp} town={weHaveReadableTown} />
                                        )}
                                    </>
                                )}
                            </>
                        )}

                        {searched && (
                            <>
                                {!filteredListByTyp && (
                                    <MarkersComponent restaurants={allRestaurants.data} town={searchedLocation} />
                                )}

                                {filteredListByTyp && (
                                    <MarkersComponent restaurants={filteredListByTyp} town={searchedLocation} />
                                )}

                                {showList && (
                                    <>
                                        {!filteredListByTyp && (
                                            <ListOfNearbyRestaurants restaurants={allRestaurants.data} town={searchedLocation} />
                                        )}

                                        {filteredListByTyp && (
                                            <ListOfNearbyRestaurants restaurants={filteredListByTyp} town={searchedLocation} />
                                        )}
                                    </>
                                )}
                            </>
                        )}

                    </GoogleMap>
                    <div className="mapButtonLayout">

                        <div className='d-flex mt-3'>
                            <Button onClick={() => toGetOnlyByTyp('restaurang')} variant='outline-primary'>Restaurang</Button>
                            <Button onClick={() => toGetOnlyByTyp('snabbmat')} variant='outline-primary'>Snabbmat</Button>
                            <Button onClick={() => toGetOnlyByTyp('cafe')} variant='outline-primary'>Café</Button>
                            <Button onClick={() => toGetOnlyByTyp('kiosk/grill')} variant='outline-primary'>Kiosk/grill</Button>
                            <Button onClick={() => toGetOnlyByTyp('foodtruck')} variant='outline-primary'>Foodtruck</Button>

                        </div>
                        <div className='mt-3'>
                            <Button variant='outline-primary'>Lunch</Button>
                            <Button variant='outline-primary'>After Work</Button>
                            <Button variant='outline-primary'>Middag/Á la carte</Button>
                        </div>

                        <Button disabled={allRestaurants.data.length == 0} className="mt-3 btnBlack" onClick={() => setShowList(!showList)}>
                            {showList ? 'Hide list' : 'Show list'}
                        </Button>

                        <SearchForm onSubmit={searchSubmit} />

                        <DirectionForm onSubmit={directionSubmit} />

                        {renderDirection && <Button onClick={removeDirection}>Remove Direction</Button>}

                        {!userMarker && <Button className="btnBlack mb-2" onClick={getMyPos}>Get my location</Button>}
                    </div>
                </>
            )}
        </>
   )
}

export default HomePage