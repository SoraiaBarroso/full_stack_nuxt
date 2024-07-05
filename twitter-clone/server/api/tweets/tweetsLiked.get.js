import { getTweetsLiked } from "~/server/db/tweets"
import { tweetTransformer } from "~/server/transformers/tweet"
import { getQuery } from 'h3'

export default defineEventHandler(async (event) => {
    const { query } = getQuery(event)
    
    let primsaQuery = {
        include: {
            author: true,
            mediaFiles: true,
            replies: {
                include: {
                    author: true
                }
            },
            replyTo: {
                include: {
                    author: true
                }
            }
        },
        orderBy: [
            {
                createdAt: 'desc'
            }
        ]
    }

    if (!!query) {
        primsaQuery = {
            ...primsaQuery,
            where: {
                likedBy: {
                    has: query
                }
            }
        }
    }

    const tweets = await getTweetsLiked(primsaQuery)

    return {  
        tweets: tweets.map(tweetTransformer)
    }
})