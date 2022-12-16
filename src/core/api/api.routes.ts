import express, { Router } from "express";
import cors from "cors";
import ApiTokenMiddleware from "./middlewares/api-token.middleware";
import AccessTokenMiddleware from "./middlewares/access-token.middleware";
import HierarchyRoutes from "../hierarchy/hierarchy.routes";
import PermissionRoutes from "../permission/permission.routes";
import UserRoutes from "../user/user.routes";
import AuthRoutes from "../auth/auth.routes";
import EncryptMiddleware from "./middlewares/encrypt.middleware";
import DecryptMiddleware from "./middlewares/decrypt.middleware";
import MeRoutes from "../me/me.routes";
import AddressRoutes from "../address/address.routes";
import StateRoutes from "../state/state.routes";
import CityRoutes from "../city/city.routes";
import EmailRoutes from "../email/email.routes";
import VerifyRoutes from "../auth/verify/verify.routes";
import FederationRoutes from "../federation/federation.routes";
import ResponsibleRoutes from "../responsible/responsible.routes";
import AssociationRoutes from "../association/association.routes";
import ProductsRoutes from "../products/products.routes";
import RegistrationFormRoutes from "../registration-form/registration-form.routes";
import HomeRoutes from "../home/home.routes";


const ApiRoutes = Router();

ApiRoutes.use(cors({origin: true, credentials: true}));
ApiRoutes.use(express.urlencoded({extended: true}));

ApiRoutes.use(DecryptMiddleware);
ApiRoutes.use(express.json({limit: "1024kb"}));
ApiRoutes.use(EncryptMiddleware);
ApiRoutes.use("/addresses", AddressRoutes);
ApiRoutes.use(ApiTokenMiddleware);

ApiRoutes.use(AuthRoutes);

ApiRoutes.use(AccessTokenMiddleware);

ApiRoutes.use("/permissions", PermissionRoutes);
ApiRoutes.use("/hierarchies", HierarchyRoutes);
ApiRoutes.use("/users", UserRoutes);
ApiRoutes.use("/home", HomeRoutes);
ApiRoutes.use("/me", MeRoutes);
ApiRoutes.use("/states", StateRoutes);
ApiRoutes.use("/cities", CityRoutes);
ApiRoutes.use("/emails", EmailRoutes);
ApiRoutes.use("/codes-security", VerifyRoutes);
ApiRoutes.use("/products", ProductsRoutes);
ApiRoutes.use("/federation", FederationRoutes);
ApiRoutes.use("/association", AssociationRoutes);
ApiRoutes.use("/responsible", ResponsibleRoutes);
ApiRoutes.use("/registration-form", RegistrationFormRoutes);

export default ApiRoutes;