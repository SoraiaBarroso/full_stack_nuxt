import { deleteReplies, deleteTweets } from "~/server/db/tweets"

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const { tweetId } = body
    
    if (!tweetId) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Bad Request: tweetId is required'
        }));
    }

    try {
        const deletedReplies = await deleteReplies(tweetId)
        const deletedTweet = await deleteTweets(tweetId);

        return {
            statusCode: 200,
            tweet: { 
                deletedTweet, 
                deletedReplies
            }
        };
    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error'
        }));
    }
})