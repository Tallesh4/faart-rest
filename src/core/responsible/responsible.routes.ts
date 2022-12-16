import { Router } from "express";
import * as ResponsibleController from "./responsible.controller";

const ResponsibleRoutes = Router();

ResponsibleRoutes.get("/", ResponsibleController.index);
ResponsibleRoutes.post("/", ResponsibleController.create);
ResponsibleRoutes.get("/:id", ResponsibleController.findById);
ResponsibleRoutes.put("/:id", ResponsibleController.updateById);
ResponsibleRoutes.delete("/:id", ResponsibleController.deleteById);

export default ResponsibleRoutes;