import { Router } from "express";
import * as PasswordResetController from "./password-reset.controller";

const PasswordResetRoutes = Router();

PasswordResetRoutes.post("/", PasswordResetController.create);
PasswordResetRoutes.post("/reset/:id", PasswordResetController.resetPassword);
PasswordResetRoutes.post("/verify/:id", PasswordResetController.verifyCode);

export default PasswordResetRoutes;