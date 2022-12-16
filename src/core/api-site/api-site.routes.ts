import express, { Router } from "express";
import cors from "cors";
import ProductsSiteRoutes from "../products/products.site.routes";
import ApiSiteTokenMiddleware from "./middlewares/api-site-token.middleware";
import DecryptMiddleware from "./middlewares/decrypt.middleware";
import EncryptMiddleware from "./middlewares/encrypt.middleware";
import RegistrationFormSiteRoutes from "../registration-form/registration-form.site.routes";


const ApiSiteRoutes = Router();

ApiSiteRoutes.use(cors({origin: true, credentials: true}));
ApiSiteRoutes.use(express.urlencoded({extended: true}));

ApiSiteRoutes.use(DecryptMiddleware);
ApiSiteRoutes.use(express.json({limit: "1024kb"}));
ApiSiteRoutes.use(EncryptMiddleware);
ApiSiteRoutes.use(ApiSiteTokenMiddleware);

ApiSiteRoutes.use("/products", ProductsSiteRoutes);
ApiSiteRoutes.use("/registration-form", RegistrationFormSiteRoutes);


export default ApiSiteRoutes;