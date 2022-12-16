import { DefaultSchema, DefaultSchemaOptions } from "../../base/repositories/mongoose/default.schema";
import { Schema, model } from "mongoose";

const PermissionSchema = new Schema({
	...DefaultSchema,
	tag: String,
	collectionName: {
		type: String,
		default: undefined
	},
	type: String,
	name: String,
	description: {
		type: String,
		default: undefined
	},
}, DefaultSchemaOptions);

PermissionSchema.index({"$**": "text"}, {default_language: (process.env.LANGAUGE || "en_US").split("_")[0]});

const PermissionModel = model("Permission", PermissionSchema);

PermissionModel.diffIndexes();

export default PermissionModel;