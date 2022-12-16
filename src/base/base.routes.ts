import express, { Router } from "express";
import ApiSiteRoutes from "../core/api-site/api-site.routes";
import ApiRoutes from "../core/api/api.routes";
import { ErrorResponseHandler } from "./utils/error.response.handler";

const BaseRoutes = Router();

BaseRoutes.use("/public", express.static(__dirname + "/public"));


BaseRoutes.use("/api", ApiRoutes);
BaseRoutes.use("/api-site", ApiSiteRoutes);

BaseRoutes.use(ErrorResponseHandler);

export default BaseRoutes;