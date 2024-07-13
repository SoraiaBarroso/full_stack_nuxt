import useFetchApi from "./useFetchApi"

export default () => { 
    const getUserMediaFiles = async (params = {}) => {
        try {
            return await useFetchApi('/api/mediaFiles', {
                method: 'GET',
                params
            })
        } catch(error) {
            throw new Error(error.message)
        }
    }

    return {
        getUserMediaFiles
    }
}