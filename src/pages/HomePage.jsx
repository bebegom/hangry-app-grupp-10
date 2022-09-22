import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import '../assets/scss/mapStyling.scss'
import Navigation from '../components/Navigation'

function HomePage() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    })

    if(isLoaded) {
        
        return (
            <GoogleMap
                    zoom={12}
                    center={{
                      lat: 55.60,
                      lng: 13
                    }}
                    mapContainerClassName="mapContainer"
                >
            </GoogleMap>
          )
    }
}

export default HomePage