import { Router } from "express";
import { PermissionByTagMiddleware } from "../permission/middlewares/permission.middleware";
import { AllowedUsersMiddleware } from "./middlewares/allowed-user.middleware";
import * as UserController from "./user.controller";
import multer from "multer";

const multerUpload = multer({ storage: multer.memoryStorage() });

const UserRoutes = Router();

UserRoutes.use(AllowedUsersMiddleware);
UserRoutes.get("/", PermissionByTagMiddleware("readUsers"), UserController.index);
UserRoutes.post("/", PermissionByTagMiddleware("createUsers"), UserController.create);
UserRoutes.get("/:id", PermissionByTagMiddleware("readUsers"), UserController.findById);
UserRoutes.put("/:id", PermissionByTagMiddleware("updateUsers"), UserController.updateById);
UserRoutes.post("/avatar/:id",PermissionByTagMiddleware("updateUsers"), multerUpload.single("avatarFile"), UserController.avatar);
UserRoutes.put("/:id/block", PermissionByTagMiddleware("updateUsers"), UserController.blockById);
UserRoutes.delete("/:id", PermissionByTagMiddleware("deleteUsers"), UserController.deleteById);

export default UserRoutes;