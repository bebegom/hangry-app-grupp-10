import { orderBy } from "firebase/firestore"
import useStreamCollection from "./useStreamCollection"

const useRestaurants = () => {
    return useStreamCollection('restaurants', orderBy("namn"))
}

export default useRestaurants