import { Marker} from '@react-google-maps/api'

const MarkersComponent = ({restaurants}) => {
    console.log(restaurants)
    return (
        <>
            {restaurants && (
                <>
                    {restaurants.map(restaurant => (
                        <Marker key={restaurant.id} position={{lat: restaurant.lat, lng: restaurant.lng}} label={restaurant.namn} />
                    ))}
                </>
            )}
        </>
    )
}

export default MarkersComponent
