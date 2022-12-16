import { model } from "mongoose";
import AssociationSchema from "./association.schema";

const AssociationModel = model("Association", AssociationSchema, "associations");

export default AssociationModel;