import { GoogleMap, LoadScript } from '@react-google-maps/api'
import '../assets/scss/mapStyling.scss'

function HomePage() {

  return (
    <LoadScript googleMapsApiKey= {`${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`} >
        <GoogleMap
            zoom={10}
            center={{
              lat: -3.745,
              lng: -38.523
            }}
            mapContainerClassName="mapContainer"
        >
        </GoogleMap>
    </LoadScript>
  )
}

export default HomePage