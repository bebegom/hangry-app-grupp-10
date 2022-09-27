import axios from 'axios'

/* store key inside of variable */
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY


const getLatLng = async (address) => {

    // Request to api with address and apiKey
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
    
    // Get the location(latitude and longitude) of the address from response data
    const coordinates = res.data.results[0].geometry.location

    /* return the coordinates to whatever called the function */
    return coordinates

}

const getUserLatLng = async () => {

    // request to URL
    const res = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`)

    // Get the location(latitude and longitude) of the address from response data
    const coordinates = res.data.location

     /* return the coordinates to whatever called the function */
    return coordinates
}

const exports = {
    getLatLng,
    getUserLatLng,
}

export default exports