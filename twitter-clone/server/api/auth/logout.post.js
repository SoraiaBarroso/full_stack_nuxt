import { parseCookies } from 'h3'
import { removeRefreshToken } from '~/server/db/refreshTokens'
import { sendRefreshToken } from '../../utils/jwt'

export default defineEventHandler(async (event) => {
    try {
        const cookies = parseCookies(event)
        const refreshToken = cookies.refresh_token

        // remove refresh token
        const response = await removeRefreshToken(refreshToken)
    } catch(error) {}

     // Ensure event.node and event.node.res are defined before calling sendRefreshToken
     if (event.node && event.node.res) {
        sendRefreshToken(event, null)
    } else {
        console.error('event.node or event.node.res is undefined')
    }

    return {
        message: 'Done'
    }
})