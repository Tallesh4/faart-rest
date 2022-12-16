import { Router } from "express";
import { PermissionByTagMiddleware } from "./middlewares/permission.middleware";
import * as PermissionController from "./permission.controller";

const PermissionRoutes = Router();

PermissionRoutes.get("/", PermissionByTagMiddleware("readPermissions"), PermissionController.index);
PermissionRoutes.post("/", PermissionByTagMiddleware("createPermissions"), PermissionController.create);
PermissionRoutes.get("/:id", PermissionByTagMiddleware("readPermissions"), PermissionController.findById);
PermissionRoutes.put("/:id", PermissionByTagMiddleware("updatePermissions"), PermissionController.updateById);
PermissionRoutes.delete("/:id", PermissionByTagMiddleware("deletePermissions"), PermissionController.deleteById);
PermissionRoutes.patch("/", PermissionByTagMiddleware("archivePermissions"), PermissionController.archiveManyById);

export default PermissionRoutes;