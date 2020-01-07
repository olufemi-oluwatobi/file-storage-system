import bucketRouter from "./bucket"
import filesRouter from "./files"
module.exports = app => {
    app.get("/", (req, res) => {
        res.json({
            success: true,
            version: "1.0.0",
            name: "KPMG INNOVATION FILE STORAGE SYSTEM"
        });
    });

    app.use("/buckets", bucketRouter)
    app.use("/files", filesRouter)
};
