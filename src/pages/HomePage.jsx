import { GoogleMap, useJsApiLoader} from '@react-google-maps/api'
import GMapAPI from '../services/GMapAPI'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import '../assets/scss/mapStyling.scss'
import SearchForm from '../components/SearchForm'

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

    // Get value from SearchForm and execute new coords
    const handleSubmit = async (address) => {

        // no value? Return
        if(!address) {
            return
        }

        // Get coordinates
        const newCoords = await GMapAPI.getLatLng(address)
        console.log(newCoords)

        // Center to new coordinates
        setPosition(newCoords)

    }

    const getMyPos = async () => {

        const getUserCoords = await GMapAPI.getUserLatLng()
        console.log("this", getUserCoords)

        setPosition(getUserCoords)

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

                    </GoogleMap>
                    <Button onClick={getMyPos} variant="outline-primary">Get my location</Button>
                </>
            )}
        </>
   )
}

export default HomePage