import {Schema, model} from "mongoose";
import {DefaultSchema, DefaultSchemaOptions} from "../../base/repositories/mongoose/default.schema";

const EmailSchema = new Schema({
	...DefaultSchema,
	name: {
		type: String,
		required: true,
	}
}, DefaultSchemaOptions);

EmailSchema.index({"name": "text"});

const EmailModel = model("Email", EmailSchema);

export default EmailModel;