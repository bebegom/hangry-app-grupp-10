import { GoogleMap, useJsApiLoader, Autocomplete,  } from '@react-google-maps/api'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import '../assets/scss/mapStyling.scss'

const libraries = ['places']

const GoogleMapsApi = () => {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries
    })

    const [latitude, setLatitude] = useState(55.60) // Default visar Malmö
    const [longitude, setLongitude] = useState(13) // Default visar Malmö
    const [inputAddress, setInputAddress] = useState("")


    if(isLoaded) {
        const handleSelect = async (e , address) => {
            e.preventDefault()
            console.log("hi", inputAddress)
          
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
                   <Autocomplete> 
                    <Form onSubmit={handleSelect} className="formStyle">
                        <Form.Group className="">
                            <Form.Control
                                placeholder="Ex: Malmö"
                                type="text"
                                onChange={(e) => setInputAddress(e.target.value)}
                            />
                            </Form.Group>
                    </Form>
                   </Autocomplete>
                </div>
            </>
        )
    }

    const handleSelect = () => {
        
    }

    if(isLoaded) {
        return (
          <div></div>
        )
    }

}


export default GoogleMapsApi