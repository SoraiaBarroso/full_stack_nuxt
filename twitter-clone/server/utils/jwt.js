import jwt from "jsonwebtoken"

// generates access token
const generateAccessToken = (user) => {
    const config = useRuntimeConfig()

    return jwt.sign({userId: user.id}, config.jwtAccessSecret, {
        expiresIn: '10m'
    })
}

// generates refresh token
const generateRefreshToken = (user) => {
    const config = useRuntimeConfig()

    return jwt.sign({userId: user.id}, config.jwtRefreshSecret, {
        expiresIn: '4h'
    })
}

export const generateTokens = (user) => {
    const accesToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    return {
        accesToken: accesToken,
        refreshToken: refreshToken
    }
}