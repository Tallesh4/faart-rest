import { Router } from "express";
import * as CityController from "./city.controller";

const CityRoutes = Router();

CityRoutes.get("/", CityController.index);

export default CityRoutes;