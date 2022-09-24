import { useState, useEffect } from 'react'
import {db} from '../firebase'
import {collection, onSnapshot, query} from 'firebase/firestore'

const useStreamCollection = (coll, ...queryConstraints) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        // get ref to collection
        const ref = collection(db, coll)

        // get list of tips
        const orderedList = query(ref, ...queryConstraints)

        // listen to changes in collection
        const snap = onSnapshot(orderedList, (snapshot) => {
            const docs = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })

            setData(docs)
            setLoading(false)
        })
    }, [])

    return {
        data, loading,
    }
}

export default useStreamCollection
