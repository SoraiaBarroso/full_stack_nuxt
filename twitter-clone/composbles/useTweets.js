import useFetchApi from "./useFetchApi"
import useAuth from "./useAuth"

export default () => {
    const { useAuthToken } = useAuth()

    const usePostTweetModal = () => useState('post_tweet_modal', () => false)

    const useReplyTweet = () => useState('reply_tweet', () => null)

    const closePostTweetModal = () => {
        const postTweetModal = usePostTweetModal()
        postTweetModal.value = false
    }

    const setReplyTo = (tweet) => {
        const replyTweet = useReplyTweet()
        replyTweet.value = tweet
    }

    const openPostTweetModal = (tweet = null) => {
        const postTweetModal = usePostTweetModal()
        postTweetModal.value = true

        setReplyTo(tweet)
    }

    const postTweet = (formData) => {
        const form = new FormData()

        form.append('text', formData.text)
        form.append('replyTo', formData.replyTo)

        formData.mediaFiles.forEach((mediaFile, index) => {
            form.append('media_file_' + index, mediaFile)
        })

        return useFetchApi('/api/user/tweets', {
            method: 'POST',
            body: form
        }) 
    }

    const getHomeTweets = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi('/api/tweets', {
                    method: 'GET'
                })

                resolve(response)
            } catch(error) {
                reject(error)
            }
        })
    }

    const deleteTweet = (tweetId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const token = useAuthToken().value;

                if (!token) {
                    return reject(new Error('No auth token found'));
                }

                const response = await fetch(`/api/tweets/delete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ tweetId }) 
                });
    
                
                if (response.ok) {
                    const data = await response.json();
                    resolve(data);
                } else {
                    const errorData = await response.json();
                    reject(new Error(errorData.error || 'Failed to delete tweet'));
                }
            } catch (error) {
                reject(error); // Reject with error if request fails
            }
        });
    };
    

    const getTweetById = (tweetId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi(`/api/tweets/${tweetId}`)

                resolve(response)
            } catch(error) {
                reject(error)
            }
        })
    }

    return {
        postTweet,
        getHomeTweets,
        getTweetById,
        closePostTweetModal,
        usePostTweetModal,
        openPostTweetModal,
        useReplyTweet,
        deleteTweet
    }
}