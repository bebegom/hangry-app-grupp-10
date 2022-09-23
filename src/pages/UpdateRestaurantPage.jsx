import React from 'react'
import {doc, updateDoc} from 'firebase/firestore'
import {db} from '../firebase'
import UpdateRestaurantForm from '../components/UpdateRestaurantForm'
import useStreamDocument from '../hooks/useStreamDocument'

const UpdateRestaurantPage = () => {
    const {data, loading} = useStreamDocument('restaurants', 'vNb1wtA2bv0pc9mgjiHg')
    return (
        <>
			{loading && <p>Loading restaurant...</p>}

            <UpdateRestaurantForm thisRestaurant={data} />

			{!loading && !data && <p>Restaurant not found</p>}
        </>

    )
}

export default UpdateRestaurantPage
