import useStreamCollection from "./useStreamCollection"

const useUsers = () => {
    return useStreamCollection('users')
}

export default useUsers