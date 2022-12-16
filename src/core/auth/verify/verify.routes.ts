import { Router } from "express";
import { PermissionByTagMiddleware } from "../../permission/middlewares/permission.middleware";
import * as VerifyController from "./verify.controller";

const VerifyRoutes = Router();

VerifyRoutes.get("/", PermissionByTagMiddleware("readSecurityCode"), VerifyController.index);

export default VerifyRoutes;