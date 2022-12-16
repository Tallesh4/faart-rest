import { Router } from "express";
import * as AuthController from "./auth.controller";
import * as VerifyController from "./verify/verify.controller";
import PasswordResetRoutes from "./password-reset/password-reset.routes";

const AuthRoutes = Router();

AuthRoutes.post("/login", AuthController.login);
AuthRoutes.post("/verify/:id", VerifyController.verifyCode);
AuthRoutes.post("/token", AuthController.token);
AuthRoutes.post("/logout", AuthController.logout);

AuthRoutes.use("/password-resets", PasswordResetRoutes);

export default AuthRoutes;