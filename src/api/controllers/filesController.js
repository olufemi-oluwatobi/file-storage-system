import BaseController from "./baseController"
import uuid from "uuid"
import fs from "fs"
const mimeType = require('file-type')
import path from "path"
import { findBucket, findBucketById, createBucket, getBuckets } from "../../services/userServices"
import { findFile, createFile, storeFile } from "../../services/fileServices"
const bucketDirectory = path.resolve(__dirname, "../../../buckets")

const httpString = "http://"
class FileController extends BaseController {

    static async storeFile(req, res) {
        try {
            const { base64, filename, accessKey, client, bucketName } = req.body;
            if (!base64 || !client) {
                FileController.failureResponse(400, "please upload the right file", res)
            } else {
                if (!bucketName) {
                    FileController.failureResponse(400, "no bucket was selected", res)
                }
                const bucket = await findBucket(bucketName)
                if (!bucket) {
                    FileController.failureResponse(400, "this bucket doesnt exist", res)
                } else {
                    if (bucket.accessKey !== accessKey) {
                        FileController.failureResponse(400, "incorrect access key", res)
                    }
                    else {

                        const fileInfo = mimeType(Buffer.from(base64, 'base64'))
                        const mimeArray = fileInfo.mime.split("/")
                        const mime = mimeArray[0] === "application" ? mimeArray[1] : mimeArray[0]
                        const bucketId = bucket.id
                        const name = `${filename}-${Date.now()}file`
                        const createAndStoreFile = (base64, name, subfolder, fileType, bucketName) => storeFile(base64, name, subfolder, fileType, bucketName)
                        const link = await createAndStoreFile(base64, name, `${client}/${mime}`, fileInfo.ext, bucketName)
                        if (link) {
                            const fileLink = link.split("/")
                            fileLink.splice(0, 7)
                            const userLink = "localhost:8080/".split("/")
                            fileLink.forEach(path => {
                                userLink.push(`/${path}`)
                            })
                            const file = await createFile({ bucketId, link: `${httpString}${userLink.join("")}` })
                            if (!file) {
                                FileController.failureResponse(400, "failed to store file", res)
                            }
                            else {
                                FileController.successResponse(200, file, res)
                            }
                        }
                        else {
                            FileController.failureResponse(400, "failed to store file", res)
                        }
                    }
                }

            }
        }
        catch (error) {
            FileController.errorResponse(error, res)
        }
    }
    static async deleteFile(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                FileController.failureResponse(400, "incorrect parameters. Input an id", res)
            }
            else {
                const file = await findFile(id)
                if (!file) {
                    FileController.failureResponse(400, "file doesnt exist", res)
                }
                const fileArray = file.split("/")
                fileArray.splice(0, 2)
                const userLink = `${bucketDirectory}/${fileArray.join("")}`
                console.log(userLink)

            }

        } catch (error) {
            console.log(error)
        }


    }



}

export default FileController