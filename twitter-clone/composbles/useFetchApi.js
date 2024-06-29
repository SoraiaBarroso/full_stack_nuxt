import useAuth from "./useAuth"

export default async (url, options = {}) => {
    const { useAuthToken } = useAuth()

    const authToken = ref(null);

    watchEffect(() => {
        const token = useAuthToken().value;
        if (token !== undefined) {
            authToken.value = token;
        }
    });
            
    return $fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${authToken.value}`
        }
    })
}