import { Router } from "express";
import { PermissionByTagMiddleware } from "../permission/middlewares/permission.middleware";
import * as ProductsController from "./products.controller";
import multer from "multer";

const multerUpload = multer({ storage: multer.memoryStorage() });


const ProductsRoutes = Router();

ProductsRoutes.get("/",  ProductsController.index);
ProductsRoutes.post("/", PermissionByTagMiddleware("createProducts"), ProductsController.create);
ProductsRoutes.get("/:id",  ProductsController.findById);
ProductsRoutes.put("/:id", PermissionByTagMiddleware("updateProducts"), ProductsController.updateById);
ProductsRoutes.delete("/:id", PermissionByTagMiddleware("deleteProducts"), ProductsController.deleteById);
ProductsRoutes.post("/excel",  ProductsController.exportExcel);
ProductsRoutes.patch("/", PermissionByTagMiddleware("archiveProducts"), ProductsController.archiveManyById);
ProductsRoutes.post("/image/:id",  PermissionByTagMiddleware("updateProducts"), multerUpload.single("file"), ProductsController.updateImageById);
ProductsRoutes.patch("/import-images", PermissionByTagMiddleware("updateProducts"), multerUpload.array("images"), ProductsController.importImagesApp);


export default ProductsRoutes;