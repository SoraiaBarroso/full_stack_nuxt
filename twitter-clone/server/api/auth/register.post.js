import { sendError } from "h3"
import { createUser } from "~/server/db/users"
import { userTransformer } from "~/server/transformers/user"
import { createRefreshToken } from "~/server/db/refreshTokens"


export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { username, email, password, repeatPassword, name } = body

    if (!username || !email || !password || !repeatPassword) {
        return sendError(event, createError({ 
            statusCode: 400, 
            statusMessage: 'Invalid params' 
        }))
    }

    if (password !== repeatPassword) {
        return sendError(event, createError({
            statusCode: 400, 
            statusMessage: 'Passwords do not match' 
        }))
    }

    const userData = {
        username,
        email,
        password,
        name,
        profileImage: 'https://picsum.photos/200/200'
    }

    const user = await createUser(userData)

    const { accessToken, refreshToken } = generateTokens(user)

    console.log("tokens: ", accessToken + "refresh: ",  refreshToken)

    // Save it inside db
    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    // add http only cookie for refresh token
    sendRefreshToken(event, refreshToken)

    console.log("user register: ", user)
    
    return {
        body: userTransformer(user),
        access_token: accessToken
    }
})