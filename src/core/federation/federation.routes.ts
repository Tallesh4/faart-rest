import { Router } from "express";
import * as FederationController from "./federation.controller";

const FederationRoutes = Router();

FederationRoutes.get("/", FederationController.index);
FederationRoutes.post("/", FederationController.create);
FederationRoutes.get("/:id", FederationController.findById);
FederationRoutes.put("/:id", FederationController.updateById);
FederationRoutes.delete("/:id", FederationController.deleteById);

export default FederationRoutes;