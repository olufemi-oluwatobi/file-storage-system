import express from "express"
import { BucketController } from "../controllers"
const bucketRouter = express.Router({ mergeParams: true })

bucketRouter.route("/")
    .post(BucketController.createBucket)
    .get(BucketController.getBuckets)

bucketRouter.route("/:id").get(BucketController.show)

export default bucketRouter