import { Router } from "express";
import multer from "multer";
import * as ImageController from "./image.controller";
const multerUpload = multer({ storage: multer.memoryStorage() });
const ImageRoutes = Router();

ImageRoutes.post("/upload", multerUpload.single("file"), ImageController.upload);

export default ImageRoutes;