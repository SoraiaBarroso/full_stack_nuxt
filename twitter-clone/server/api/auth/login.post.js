import { getUserByUsername } from "~/server/db/users"
import bcrypt from "bcrypt"
import { generateTokens } from "~/server/utils/jwt"

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
            statusMessage: 'IUsername or password is invalid' 
        }))
    }

    // Compare password 
    const passwordMatch = await bcrypt.compare(password, user.password)
   
    // Generate Tokens
    // Acces token
    // Refresh token
    const {accesToken, refreshToken} = generateTokens(user)


    return {
        user: user,
        passwordMatch,
        accesToken, 
        refreshToken
    }
})