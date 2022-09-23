import { GoogleMap, useJsApiLoader} from '@react-google-maps/api'
import GooglePlacesAutocomplete, 
{
    geocodeByAddress, getLatLng
} 
from 'react-google-places-autocomplete'
import { useState } from 'react'
import '../assets/scss/mapStyling.scss'

const libraries = ['places']

const GoogleMapsApi = () => {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries
    })

    const [latitude, setLatitude] = useState(55.60) // Default visar Malmö
    const [longitude, setLongitude] = useState(13) // Default visar Malmö
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    })
    const [address, setAddress] = useState('')

    if(isLoaded) {

        if(address) {
            setAddress(address.label)
            
            if(typeof address === 'string') {
                geocodeByAddress(address)
                    .then(results => getLatLng(results[0]))
                    .then(({ lat, lng }) =>
                    console.log('Successfully got latitude and longitude', { lat, lng })
                )
            }
        }

        return (
            <>
                <GoogleMap
                    zoom={12}
                    center={{
                      lat: latitude,
                      lng: longitude
                    }}
                    mapContainerClassName="mapContainer"
                >
                
                </GoogleMap>
    
                <div className="inputStyling">
                    <GooglePlacesAutocomplete
                        selectProps={{ 
                            address,
                            onChange: setAddress,
                            placeholder: "Enter an address",
                        }}
                    >
                    </GooglePlacesAutocomplete>
                </div>
            </>
        )
    }
}


export default GoogleMapsApi