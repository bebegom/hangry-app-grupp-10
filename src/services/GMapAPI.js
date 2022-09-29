import axios from 'axios'

/* store key inside of variable */
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY


const getLatLng = async (address) => {

    // Request to api with address and apiKey
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
    // console.log('res: ', res)
    
    // Get the location(latitude and longitude) of the address from response data
    const coordinates = res.data.results[0].geometry.location

    // Get the city of address user searched for
    const addressComponents = res.data.results[0].address_components
    const cityObj = addressComponents.find(i => i.types[0] === "locality")
    // console.log(cityObj)

    /* return the coordinates to whatever called the function */
    return [coordinates, cityObj]

}

const getAdressFromLatLng = async (lat, lng) => {
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`)
    // console.log('getAdressFrom.. res', res)

    const addressComponents = res.data.results[0].address_components
    const cityObj = addressComponents.find(i => i.types[0] === "postal_town")
    // console.log('cityObj', cityObj.long_name)
    return cityObj.long_name
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
    getAdressFromLatLng,
}

export default exports