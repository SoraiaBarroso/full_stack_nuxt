import useFetchApi from "./useFetchApi"

export default () => { 
    const getUserMediaFiles = async (params = {}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi('/api/mediaFiles', {
                    method: 'GET',
                    params
                })
                
                resolve(response)
            } catch(error) {
                reject(error)
            }
        })
    }

    return {
        getUserMediaFiles
    }
}