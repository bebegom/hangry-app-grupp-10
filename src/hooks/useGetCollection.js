import { db } from '../firebase'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'

const useGetCollection = (coll, searchedLocation, orderByName) => {
    // create ref to the collection
    const restaurantsCollectionRef = collection(db, 'restaurants')

    // create queryKey
    const queryKey = ['restaurants', {searchedLocation}]

    // get the restaurants in the searched city
    const queryRef = query(restaurantsCollectionRef, orderBy('namn'), where('ort', '==', searchedLocation))
  
    // run query
    const restaurantsQuery = useFirestoreQueryData(queryKey, queryRef, {
        idField: 'id',
    })

    return restaurantsQuery
}

export default useGetCollection
