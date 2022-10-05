import { Marker} from '@react-google-maps/api'

const MarkersComponent = ({restaurants, town = null}) => {
    const array = restaurants.filter(i => i.ort == town)

    return (
        <>
            {array && (
                <>
                    {array.map(restaurant => (
                        <Marker key={restaurant.id} position={{lat: restaurant.lat, lng: restaurant.lng}} label={restaurant.namn} />
                    ))}
                </>
            )}
        </>
    )
}

export default MarkersComponent
