import { Marker} from '@react-google-maps/api'

const MarkersComponent = ({restaurants, town, filteredList}) => {

    return (
        <>
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
