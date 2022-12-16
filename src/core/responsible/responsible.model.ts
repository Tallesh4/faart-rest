import { model } from "mongoose";
import ResponsibleSchema from "./responsible.schema";

const ResponsibleModel = model("Responsible", ResponsibleSchema, "responsibles");

export default ResponsibleModel;