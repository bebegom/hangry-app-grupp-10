import { Marker} from '@react-google-maps/api'
import useGetCollection from '../hooks/useGetCollection'

const MarkersComponent = ({town}) => {
    const listOfNearByPlaces = useGetCollection('restaurants', town)
    console.log(listOfNearByPlaces)

    return (
        <>
            {listOfNearByPlaces.data && (
                <>
                    {listOfNearByPlaces.data.map(restaurant => (
                        <Marker key={restaurant.id} position={{lat: restaurant.lat, lng: restaurant.lng}} label={restaurant.namn} />
                    ))}
                </>
                
            )}
        </>
    )
}

export default MarkersComponent
