import { prisma } from "."

export const createTweet = (tweetData) => {
    return prisma.tweet.create({
        data: tweetData
    })
}

export const getTweets = (params = {}) => {
    return prisma.tweet.findMany({
        ...params
    })
}

export const deleteReplies = (tweetId) => {
    return prisma.tweet.deleteMany({
        where: {
            replyToId: tweetId
        } 
    })
}
export const deleteTweets = (tweetId) => {
    return prisma.tweet.delete({
        where: {
            id: tweetId,
        } 
    })
}

export const updateLikeCount = (tweetId, newLikesCount, likedBy) => {

    return prisma.tweet.update({
        where: {
            id: tweetId
        },
        data: {
            likesCount: newLikesCount,
            likedBy: {
                set: likedBy 
            }
        }
    })
}

export const getTweetById = (tweetId, params = {}) => {
    return prisma.tweet.findUnique({
        ...params,
        where: {
            ...params.where,
            id: tweetId
        }
    })
}