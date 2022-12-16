import {Schema, model} from "mongoose";
import {DefaultSchema, DefaultSchemaOptions} from "../../base/repositories/mongoose/default.schema";

const ImageSchema = new Schema({
	...DefaultSchema,
	name: {
		type: String,
		required: true,
	}
}, DefaultSchemaOptions);

ImageSchema.index({"name": "text"});

const ImageModel = model("Image", ImageSchema);

export default ImageModel;