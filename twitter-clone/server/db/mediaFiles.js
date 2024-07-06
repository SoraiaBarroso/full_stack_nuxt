import { prisma } from ".";

export const createMediaFile = (mediaFile) => {
    return prisma.mediaFile.create({
        data: mediaFile
    })
}

export const getMediaFilesUser = (params = {}) => {
    return prisma.mediaFile.findMany({
        ...params
    })
}