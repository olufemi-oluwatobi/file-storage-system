import express from "express"
import { FilesController } from "../controllers"
import FileController from "../controllers/filesController";

const filesRouter = express.Router({ mergeParams: true })

filesRouter.route("/").post(FilesController.storeFile)

filesRouter.route("/:id").delete(FileController.deleteFile)
export default filesRouter