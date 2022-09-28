import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer} from '@react-google-maps/api'
import GMapAPI from '../services/GMapAPI'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import '../assets/scss/mapStyling.scss'
import SearchForm from '../components/SearchForm'
import DirectionForm from '../components/DirectionForm'

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

    // Default Position(Malmö) om getMyPos failar
    const [position, setPosition] = useState({lat: 55.604981, lng: 13.003822})
    const [userMarker, setUserMarker] = useState(null)
    const [renderDirection, setRenderDirection] = useState(null)

    // Get value from SearchForm and execute new coords
    const searchSubmit = async (address) => {
        // no value? Return
        if(!address) {
            return
        }

        // Get coordinates
        const newCoords = await GMapAPI.getLatLng(address)

        // Center to new coordinates
        setPosition(newCoords)
    }

    // When clicked "get my position" run this
    const getMyPos = async () => {
        // call on api 
        const getUserCoords = await GMapAPI.getUserLatLng()

        // update state to user location
        setPosition(getUserCoords)

        setUserMarker(getUserCoords)

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
    })

   return (
        <>
            {!isLoaded && ( 
                <p>Loading maps...</p>
            )}

            {/* if true, render map and searchform */}
            {isLoaded && (
                <>
                    <SearchForm onSubmit={searchSubmit} />

                    <div>
                        <DirectionForm onSubmit={directionSubmit} />
                        {renderDirection && <Button onClick={removeDirection}>Remove Direction</Button>}
                    </div>


                    <GoogleMap
                        zoom={12}
                        center={position}
                        mapContainerClassName="mapContainer"
                    >
                        {userMarker && <Marker position={userMarker} label="You" />}
                        {renderDirection && <DirectionsRenderer directions={renderDirection} />}

                    </GoogleMap>
                    {!userMarker && <Button onClick={getMyPos} variant="outline-primary">Get my location</Button>}
                </>
            )}
        </>
   )
}

export default HomePage