import { updateLikeCount } from "~/server/db/tweets";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { tweetId, likesCount, likedBy } = body;

        if (!tweetId || !likedBy) {
            return sendError(event, createError({
                statusCode: 400,
                statusMessage: 'Bad Request: tweetId and likedBy are required'
            }));
        }

        const updatedTweet = await updateLikeCount(tweetId, likesCount, likedBy);

        return {
            statusCode: 200,
            body: { tweet: updatedTweet }
        };
    } catch (error) {
        console.error('Error handling like:', error);
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error'
        }));
    }
});