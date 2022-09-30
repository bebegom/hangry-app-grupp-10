import useStreamCollection from "./useStreamCollection"

const useRestaurants = () => {
    return useStreamCollection('restaurants')
}

export default useRestaurants