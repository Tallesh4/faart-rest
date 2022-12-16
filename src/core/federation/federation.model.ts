import { model } from "mongoose";
import FederationSchema from "./federation.schema";

const FederationModel = model("Federation", FederationSchema, "federations");

export default FederationModel;