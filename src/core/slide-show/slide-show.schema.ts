import { Schema } from "mongoose";
import {DefaultSchema, DefaultSchemaOptions} from "../../base/repositories/mongoose/default.schema";

const SlideShowSchema = new Schema({
	...DefaultSchema,
	name: {
		type: String,
		required: true,
	}
}, DefaultSchemaOptions);

SlideShowSchema.index({
	name: "text"
});

export default SlideShowSchema;