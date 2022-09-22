import { GoogleMap, LoadScript } from '@react-google-maps/api'
import '../assets/scss/mapStyling.scss'

function HomePage() {

  return (
    <LoadScript googleMapsApiKey= {`${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`} >
        <GoogleMap
            zoom={12}
            center={{
              lat: 55.60,
              lng: 13
            }}
            mapContainerClassName="mapContainer"
        >
        </GoogleMap>
    </LoadScript>
  )
}

export default HomePage