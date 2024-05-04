import { v2 as cloudinary } from "cloudinary"

export const uploadToCloudinary = (image) => {
    const config = useRuntimeConfig()

    cloudinary.config({
        cloud_name: config.cloudinaryCloudName,
        api_key: config.cloudinaryApiKey,
        api_secret: config.cloudinaryApiSecret
    })

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, (error, data) => {
            if (error) {
                reject(error)
            }
            resolve(data)
        })
    })
}