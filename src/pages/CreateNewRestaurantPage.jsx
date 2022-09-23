import {collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import RestaurantForm from '../components/RestaurantForm'

const CreateNewRestaurantPage = () => {

    return (
        <RestaurantForm addOrUpdate={addDoc} col={collection} db={db} />
    )
}

export default CreateNewRestaurantPage
