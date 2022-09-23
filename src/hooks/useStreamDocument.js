import {useEffect, useState} from 'react'
import {doc, onSnapshot} from 'firebase/firestore'
import {db} from '../firebase'

const useStreamDocument = (col, id) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // get ref to the doc
        const ref = doc(db, col, id)

        // listen to the document
        const snap = onSnapshot(ref, snapshot => {
            setData({
                id: snapshot.id,
                ...snapshot.data(),
            })
            setLoading(false)
        })
        return snap
    }, [])

    return {
        data, 
        loading,
    }
}

export default useStreamDocument
