import {Schema, SchemaTypes, connection} from "mongoose";
import { DefaultSchemaOptions, DefaultSchema } from "../../../base/repositories/mongoose/default.schema";
import UserModel from "../../user/user.model";

const PasswordSchema = new Schema({
	...DefaultSchema,
	hash: String,
	refreshTokens: [String],
	userId: {
		type: SchemaTypes.ObjectId,
		ref: UserModel
	},
}, DefaultSchemaOptions);

const database = connection.useDb(process.env.MONGODB_DATABASE + "-auth");
const PasswordModel = database.model("Password", PasswordSchema);

export default PasswordModel;