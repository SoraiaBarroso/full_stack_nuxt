import { getMediaFilesUser } from "~/server/db/mediaFiles";


export default defineEventHandler(async (event) => {
    const { query } = getQuery(event)
    
    let primsaQuery = {
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
                userId: query
            }
        }
    }
    
    const files = await getMediaFilesUser(primsaQuery)

    return {  
        mediaFiles: files
    }
})