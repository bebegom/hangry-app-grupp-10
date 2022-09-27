import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api'
import GMapAPI from '../services/GMapAPI'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import '../assets/scss/mapStyling.scss'
import SearchForm from '../components/SearchForm'
// import useStreamCollection from '../hooks/useStreamCollection'
// import { where } from 'firebase/firestore'
import ListOfNearbyRestaurants from '../components/ListOfNearbyRestaurants'

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

    // Default Position(Malmö)
    const [position, setPosition] = useState({lat: 55.604981, lng: 13.003822})
    const [userMarker, setUserMarker] = useState(null)

    const [searched, setSearched] = useState(false)
    const [searchedLocation, setSearchedLocation] = useState(null)

    // Get value from SearchForm and execute new coords
    const handleSubmit = async (address) => {
        // console.log(address)

        // no value? Return
        if(!address) {
            return
        }

        // Get coordinates
        const [newCoords, city] = await GMapAPI.getLatLng(address)

        

        // Center to new coordinates
        setPosition(newCoords)
        setSearched(true)
        setSearchedLocation(city)
    }

    const getMyPos = async () => {

        // call on api 
        const getUserCoords = await GMapAPI.getUserLatLng()

        // update state to user location
        setPosition(getUserCoords)

        setUserMarker(getUserCoords)

    }

   return (
        <>
            {!isLoaded && ( 
                <p>Loading maps...</p>
            )}

            {/* if true, render map and searchform */}
            {isLoaded && (
                <>
                    <SearchForm onSubmit={handleSubmit} />

                    <GoogleMap
                        zoom={12}
                        center={position}
                        mapContainerClassName="mapContainer"
                    >
                        {userMarker && <Marker position={userMarker} label="You" />}

                        {/* Get list of places/restaurants nearby the searched city */}
                        {searched && <ListOfNearbyRestaurants searchedLocation={searchedLocation} />}

                    </GoogleMap>
                    <Button onClick={getMyPos} variant="outline-primary">Get my location</Button>
                </>
            )}
        </>
   )
}

export default HomePage