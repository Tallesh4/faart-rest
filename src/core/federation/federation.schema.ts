import { Schema } from "mongoose";
import {DefaultSchema, DefaultSchemaOptions} from "../../base/repositories/mongoose/default.schema";

const FederationSchema = new Schema({
	...DefaultSchema,
	name: {
		type: String,
		required: true,
	}
}, DefaultSchemaOptions);

FederationSchema.index({
	name: "text"
});

export default FederationSchema;