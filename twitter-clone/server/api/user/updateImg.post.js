import { updateProfileImg } from "~/server/db/users";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { userId, imgUrl } = body;

        if (!userId || !imgUrl) {
            return sendError(event, createError({
                statusCode: 400,
                statusMessage: 'Bad Request: userId and imgUrl are required'
            }));
        }

        const updatedImg = await updateProfileImg(userId, imgUrl);

        return {
            statusCode: 200,
            body: { userImage: updatedImg }
        };
    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error'
        }));
    }
});