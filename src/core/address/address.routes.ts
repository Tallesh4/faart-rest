import { Router } from "express";
import * as AddressController from "./address.controller";

const AddressRoutes = Router();

AddressRoutes.get("/search/:zipCode", AddressController.searchAddressByZipCode);

export default AddressRoutes;