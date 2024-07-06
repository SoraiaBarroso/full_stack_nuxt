// we use this function so important information its not visible in the http request (psw)
export const userTransformer = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage,
        handle: '@' + user.username,
        createdAt: user.createdAt,
    }
}