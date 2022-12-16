import { Router } from "express";
import * as EmailController from "./email.controller";

const EmailRoutes = Router();

EmailRoutes.post("/send/code_security", EmailController.sendCodeSecurityLoginEmail);

export default EmailRoutes;