import { Marker} from '@react-google-maps/api'

const MarkersComponent = ({setNewCenter, clickedOnMarker, changeShowUpdateForm, changeClickedOnMarker, restaurants, town = null}) => {
    const array = restaurants.filter(i => i.ort == town)

    const showDetails = (restaurant) => {
        if (clickedOnMarker == restaurant) {
            changeClickedOnMarker(null)
            changeShowUpdateForm(false)
            return
        }
        changeClickedOnMarker(restaurant)
        setNewCenter({lat: restaurant.lat, lng: restaurant.lng})
        changeShowUpdateForm(false)
    }

    return (
        <>
            {array && (
                <>
                    {array.map(restaurant => (
                        <Marker onClick={() => showDetails(restaurant)} key={restaurant.id} position={{lat: restaurant.lat, lng: restaurant.lng}} label={restaurant.namn} />
                    ))}
                </>
            )}
        </>
    )
}

export default MarkersComponent
