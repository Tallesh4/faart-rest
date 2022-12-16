import { Router } from "express";
import * as RegistrationFormController from "./registration-form.controller";

const RegistrationFormRoutes = Router();

RegistrationFormRoutes.get("/", RegistrationFormController.index);
RegistrationFormRoutes.post("/", RegistrationFormController.create);
RegistrationFormRoutes.get("/:id", RegistrationFormController.findById);
RegistrationFormRoutes.put("/:id", RegistrationFormController.updateById);
RegistrationFormRoutes.delete("/:id", RegistrationFormController.deleteById);

export default RegistrationFormRoutes;