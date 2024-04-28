import { getUserByUsername } from "~/server/db/users"
import bcrypt from "bcrypt"
import { generateTokens, sendRefreshToken } from "~/server/utils/jwt"
import { userTransformer } from "~/server/transformers/user"
import { createRefreshToken } from "~/server/db/refreshTokens"

export default defineEventHandler(async (event) => {
    // get acces to body request
    const body = await readBody(event)

    const {username, password} = body

    if (!username || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid params' 
        }))
    }

    // Check if the user is registered
    const user = await getUserByUsername(username)

    if (!user) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid' 
        }))
    }

    // Compare password 
    const passwordMatch = await bcrypt.compare(password, user.password)
    
    if (!passwordMatch) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid' 
        }))
    }

    // Generate Tokens
    // Acces token
    // Refresh token
    const {accesToken, refreshToken} = generateTokens(user)

    // Save it inside db
    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    // add http only cookie for refresh token
    sendRefreshToken(event, refreshToken)

    return {
        user: userTransformer(user),
        access_token: accesToken
    }
})