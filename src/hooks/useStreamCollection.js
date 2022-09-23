import { useState, useEffect } from 'react'
import {db} from '../firebase'
import {collection, onSnapshot} from 'firebase/firestore'

const useStreamCollection = (coll, ...queryConstraints) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        // get ref to collection
        const ref = collection(db, coll)

        // get list of tips
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default useStreamCollection
