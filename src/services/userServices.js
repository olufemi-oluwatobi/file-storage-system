import { buckets as Bucket } from "../db/models";

export const findBucket = (name) => {
    return Bucket.findOne({ where: { name } }).then(bucket => bucket)
}

export const findBucketById = (id) => {
    return Bucket.findOne({ where: { id }, attributes: ['name', 'id'] }).then(bucket => bucket)
}
export const createBucket = (params) => Bucket.create(params)

export const getBuckets = () => Bucket.findAll({
    attributes: ['name', 'id']
}).then(bucket => bucket)