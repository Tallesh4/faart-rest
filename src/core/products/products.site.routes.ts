import { Router } from "express";
import * as ProductsController from "./products.controller";

const ProductsSiteRoutes = Router();

ProductsSiteRoutes.get("/",  ProductsController.index);

export default ProductsSiteRoutes;