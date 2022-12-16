import { Router } from "express";
import * as SlideShowController from "./slide-show.controller";

const SlideShowRoutes = Router();

SlideShowRoutes.get("/", SlideShowController.index);
SlideShowRoutes.post("/", SlideShowController.create);
SlideShowRoutes.get("/:id", SlideShowController.findById);
SlideShowRoutes.put("/:id", SlideShowController.updateById);
SlideShowRoutes.delete("/:id", SlideShowController.deleteById);

export default SlideShowRoutes;