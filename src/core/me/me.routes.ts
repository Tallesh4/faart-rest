import { Router } from "express";
import * as MeController from "./me.controller";

const MeRoutes = Router();

MeRoutes.get("/", MeController.me);

MeRoutes.get("/permissions/:permissionTag", MeController.permission);

export default MeRoutes;