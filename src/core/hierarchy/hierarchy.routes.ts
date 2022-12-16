import { Router } from "express";
import { PermissionByTagMiddleware } from "../permission/middlewares/permission.middleware";
import * as HierarchyController from "./hierarchy.controller";

const HierarchyRoutes = Router();

HierarchyRoutes.get("/", PermissionByTagMiddleware("readHierarchies"), HierarchyController.index);
HierarchyRoutes.post("/", PermissionByTagMiddleware("createHierarchies"), HierarchyController.create);
HierarchyRoutes.get("/:id", PermissionByTagMiddleware("readHierarchies"), HierarchyController.findById);
HierarchyRoutes.put("/:id", PermissionByTagMiddleware("updateHierarchies"), HierarchyController.updateById);
HierarchyRoutes.delete("/:id", PermissionByTagMiddleware("deleteHierarchies"), HierarchyController.deleteById);

export default HierarchyRoutes;