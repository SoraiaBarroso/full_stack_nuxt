import { prisma } from ".";
import bcrypt from "bcrypt"

export const createUser = (userData) => {
    const finalUserData = {
        ...userData,
        password: bcrypt.hashSync(userData.password, 10)
    }

    return prisma.user.create({
        data: finalUserData
    })
}

export const updateProfileImg = (userId, imgUrl) => {
    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            profileImage: imgUrl
        }
    })
}

export const getUserByUsername = (username) => {
    return prisma.user.findUnique({
        where: {
            username
        }
    })
}

export const getUserById = (userId) => {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}