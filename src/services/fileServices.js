import { files as Files } from "../db/models"
import fs from "fs";
import path from "path";
const bucketDirectory = path.resolve(__dirname, "../../buckets")

export const findFile = (id) => {
    return Files.findOne({ where: { id } }).then(file => file)
}

const createDirectory = (link) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(link, (err) => {
            if (err) reject(err)
            resolve("success")
        })
    })
}

const createFileInFolder = (link) => {
    return new Promise((resolve, reject) => {
        fs.open(link, "w", (err) => {
            if (err) reject(err)
            resolve("success")
        })
    })
}
const writeFile = (link, base64, options) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(link, base64, options, (err) => {
            if (err) reject(err)
            resolve("success")
        })
    })
}
export const storeFile = async (base64, filename, subfolder, fileType, bucketName) => {
    try {
        const subPath = subfolder && subfolder
        const link = `${bucketDirectory}/${bucketName}/${subPath}/${filename}.${fileType}`
        const [client, folder] = subPath.split("/")
        const clientPath = `${bucketDirectory}/${bucketName}/${client}`
        const subFolder = `${clientPath}/${folder}`
        const clientDirectory = fs.existsSync(clientPath) ? clientPath : await createDirectory(clientPath)
        if (clientDirectory) {
            const folderDirectory = fs.existsSync(subFolder) ? subFolder : await createDirectory(subFolder)
            if (folderDirectory) {
                const file = await createFileInFolder(`${subFolder}/${filename}.${fileType}`, 'w')
                if (file) {
                    const fileSuccess = await writeFile(link, base64, { encoding: 'base64' })
                    if (fileSuccess) {
                        return link
                    }
                }
            }

        }

    } catch (error) {
        console.log(error)
    }

}

export const createFile = (params) => Files.create(params).then(file => file) 