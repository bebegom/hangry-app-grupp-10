import axios from 'axios'

/* store key inside of variable */
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const getLatLng = async (address) => {
    // Request to api with address and apiKey
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
    const resStatus = res.data.status;

    // Get the location(latitude and longitude) of the address from response data
    const coordinates = res.data.results[0].geometry.location

    // Get the city of address user searched for
    const addressComponents = res.data.results[0].address_components
    let cityObj = addressComponents.find(i => i.types[0] === "locality")

    if(cityObj === undefined) {
        cityObj = addressComponents.find(i => i.types[0] === "postal_town")
    }

    /* return the coordinates to whatever called the function */
    return [coordinates, cityObj, resStatus]

}

const getLatLngCreateNewRestaurant = async (address) => {
    // Request to api with address and apiKey
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
    const resStatus = res.data.status;
    console.log(res.data)

    if(res.data.status != "OK" || res.data.results[0].geometry.location_type == "APPROXIMATE" || res.data.results[0].partial_match == true){
        return [null, null, null]   
    }
    
    // Get the location(latitude and longitude) of the address from response data
    const coordinates = res.data.results[0].geometry.location

    // Get the city of address user searched for
    const addressComponents = res.data.results[0].address_components
    let cityObj = addressComponents.find(i => i.types[0] === "locality")

    if(cityObj === undefined) {
        cityObj = addressComponents.find(i => i.types[0] === "postal_town")
    }
    console.log(coordinates, cityObj, resStatus)
    /* return the coordinates to whatever called the function */
    return [coordinates, cityObj, resStatus]

}

const getUserLatLng = async () => {

    // request to URL
    const res = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`)
    // Get the location(latitude and longitude) of the address from response data
    const coordinates = res.data.location

     /* return the coordinates to whatever called the function */
    return coordinates
}

const getAdressFromLatLng = async (lat, lng) => {
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`)

    const addressComponents = res.data.results[0].address_components
    const cityObj = addressComponents.find(i => i.types[0] === "postal_town")
    return cityObj.long_name
}

const exports = {
    getUserLatLng,
    getLatLng,
    getLatLngCreateNewRestaurant,
    getAdressFromLatLng,
}

export default exports