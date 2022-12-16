import { model } from "mongoose";
import RegistrationFormSchema from "./registration-form.schema";

const RegistrationFormModel = model("RegistrationForm", RegistrationFormSchema, "registration-forms");

export default RegistrationFormModel;