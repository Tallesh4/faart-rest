import { Router } from "express";
import * as StateController from "./state.controller";

const StateRoutes = Router();

StateRoutes.get("/", StateController.index);

export default StateRoutes;