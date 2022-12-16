import {Schema, model} from "mongoose";
import {DefaultSchema, DefaultSchemaOptions} from "../../base/repositories/mongoose/default.schema";

const HomeSchema = new Schema({
	...DefaultSchema,
	name: {
		type: String,
		required: true,
	}
}, DefaultSchemaOptions);

HomeSchema.index({"name": "text"});

const HomeModel = model("Home", HomeSchema);

export default HomeModel;