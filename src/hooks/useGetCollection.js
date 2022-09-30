import { db } from '../firebase'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'

const useGetCollection = (coll, searchedLocation) => {
    // create ref to the collection
    const restaurantsCollectionRef = collection(db, 'restaurants')

    // create queryKey
    const queryKey = ['reastaurants', {searchedLocation}]

    // get the restaurants in the searched city
    const queryRef = query(restaurantsCollectionRef, where('ort', '==', searchedLocation), orderBy('namn'))

    // run query
    const restaurantsQuery = useFirestoreQueryData(queryKey, queryRef, {
        idField: 'id',
    })

    return restaurantsQuery
}

export default useGetCollection
