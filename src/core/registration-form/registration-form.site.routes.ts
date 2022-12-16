import { Router } from "express";
import * as RegistrationFormController from "./registration-form.controller";

const RegistrationFormSiteRoutes = Router();

RegistrationFormSiteRoutes.post("/", RegistrationFormController.create);

export default RegistrationFormSiteRoutes;