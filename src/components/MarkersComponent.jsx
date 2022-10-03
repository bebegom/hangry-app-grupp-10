import { Marker} from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import useGetCollection from '../hooks/useGetCollection'

const MarkersComponent = ({restaurants, town, filteredList}) => {
    // const listOfNearByPlaces = useGetCollection('restaurants', town)
    // console.log(listOfNearByPlaces)
    // const [filteredList, setFilteredList] = useState(null)

    console.log('restaurants: ', restaurants)
    console.log('filteredList: ', filteredList)

    return (
        <>
            {/* {listOfNearByPlaces.data && !filteredList && (
                <>
                    {listOfNearByPlaces.data.map(restaurant => (
                        <Marker key={restaurant.id} position={{lat: restaurant.lat, lng: restaurant.lng}} label={restaurant.namn} />
                    ))}
                </>
            )} */}

            {restaurants && !filteredList && (
                <>
                    {restaurants.data.map(restaurant => (
                        <Marker key={restaurant.id} position={{lat: restaurant.lat, lng: restaurant.lng}} label={restaurant.namn} />
                    ))}
                </>
            )}

            {filteredList && (
                <>
                    {filteredList.map(restaurant => (
                        <Marker key={restaurant.id} position={{lat: restaurant.lat, lng: restaurant.lng}} label={restaurant.namn} />
                    ))}
                </>
            )}
        </>
    )
}

export default MarkersComponent
