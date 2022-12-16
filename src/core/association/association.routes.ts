import { Router } from "express";
import * as AssociationController from "./association.controller";

const AssociationRoutes = Router();

AssociationRoutes.get("/", AssociationController.index);
AssociationRoutes.post("/", AssociationController.create);
AssociationRoutes.get("/:id", AssociationController.findById);
AssociationRoutes.put("/:id", AssociationController.updateById);
AssociationRoutes.delete("/:id", AssociationController.deleteById);

export default AssociationRoutes;