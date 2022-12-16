import { Router } from "express";
import { AllowedUsersMiddleware } from "../user/middlewares/allowed-user.middleware";
import * as HomeController from "./home.controller";

const HomeRoutes = Router();

HomeRoutes.use(AllowedUsersMiddleware);
HomeRoutes.get("/daily-indicators", HomeController.dailyIndicators);
HomeRoutes.get("/monthly-indicators", HomeController.monthlyIndicators);
    
export default HomeRoutes;