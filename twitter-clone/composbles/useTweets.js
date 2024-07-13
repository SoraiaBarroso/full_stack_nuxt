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

    const postTweet = async (formData) => {
        const form = new FormData()

        form.append('text', formData.text)
        form.append('replyTo', formData.replyTo)

        formData.mediaFiles.forEach((mediaFile, index) => {
            form.append('media_file_' + index, mediaFile)
        })

        try {
            return await useFetchApi('/api/user/tweets', {
                method: 'POST',
                body: form
            })
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
    const getHomeTweets = async (params = {}) => {
        try {
            return await useFetchApi('/api/tweets', {
                method: 'GET',
                params
            })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const getUserTweets = async (params = {}) => {
        try {
            return await useFetchApi('/api/tweets/userTweets', {
                method: 'GET',
                params
            })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const getTweetsLiked = async (params = {}) => {
        try {
            return await useFetchApi('/api/tweets/tweetsLiked', {
                method: 'GET',
                params
            })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const getUserReplies = async (params = {}) => {
        try {
            return await useFetchApi('/api/tweets/userReplies', {
                method: 'GET',
                params
            })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const deleteTweet = async (tweetId) => {
        try {
            const token = useAuthToken().value;

            if (!token) {
                return reject(new Error('No auth token found'));
            }

            return await fetch(`/api/tweets/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ tweetId }) 
            });
        } catch (error) {
            throw new Error(error.message);
        }
    };
    
    const updateLikeCount = async (tweetId, likesCount, likedBy) => {
        try {
            const token = useAuthToken().value;

            if (!token) {
                return reject(new Error('No auth token found'));
            }

            return await fetch(`/api/tweets/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ tweetId, likesCount, likedBy }) 
            });
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const getTweetById = async (tweetId) => {
        try {
            return await useFetchApi(`/api/tweets/${tweetId}`)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    return {
        postTweet,
        getHomeTweets,
        getTweetById,
        closePostTweetModal,
        usePostTweetModal,
        openPostTweetModal,
        useReplyTweet,
        deleteTweet,
        updateLikeCount,
        getUserTweets,
        getTweetsLiked,
        getUserReplies
    }
}