import BaseController from "./baseController"
import uuid from "uuid"
import fs from "fs"
import path from "path"
import { findBucket, findBucketById, createBucket, getBuckets } from "../../services/userServices"

const bucketDirectory = path.resolve(__dirname, "../../../buckets")
console.log("bucket", bucketDirectory)
class BucketController extends BaseController {

    static async createBucket(req, res) {
        try {
            const { name } = req.body
            if (name) {
                const nameExist = await findBucket(name)
                if (nameExist) {
                    BucketController.failureResponse(400, "bucket already exists", res)
                } else {
                    const bucketData = {
                        name,
                        accessKey: uuid()
                    }
                    const addBucket = await createBucket(bucketData)
                    if (!addBucket) {
                        BucketController.failureResponse(400, "failed to create bucket", res)
                    }
                    BucketController.successResponse(200, addBucket, res)
                    fs.mkdirSync(`${bucketDirectory}/${name}`)
                }
            } else {
                BucketController.failureResponse(400, "please enter enter the name of the bucket", res)
            }
        }
        catch (error) {
            BucketController.errorResponse(error, res)
        }
    }

    static async getBuckets(req, res) {
        try {
            const buckets = await getBuckets()
            BucketController.successResponse(201, buckets, res)
        } catch (error) {
            BucketController.errorResponse(error, res)
        }
    }

    static async show(req, res) {
        try {
            const { id } = req.params
            const bucket = await findBucketById(id)
            if (!bucket) {
                BucketController.failureResponse(404, "this bucket doesn't exist", res)
            } else {
                BucketController.successResponse(201, bucket, res)
            }
        } catch (error) {
            BucketController.errorResponse(error, res)
        }
    }
}

export default BucketController