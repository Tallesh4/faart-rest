import {Schema, SchemaTypes, connection} from "mongoose";
import { DefaultSchemaOptions, DefaultSchema } from "../../../base/repositories/mongoose/default.schema";
import crypto from "crypto";
import PasswordModel from "../password/password.model";

const PasswordResetSchema = new Schema({
	...DefaultSchema,
	token: {
		type: String,
		default: () => {
			return crypto.randomBytes(64).toString("hex");
		}
	},
	code: {
		type: String,
		default: () => {
			let code = "";
			for(let i = 0; i < 6; i++) {
				code += Math.floor(Math.random() * 10);
			}
			return code;
		}
	},
	expireAt: {
		type: Date,
		default: () => {
			const now = new Date();
			now.setHours(now.getHours() + 1);

			return now;
		}
	},
	passwordId: {
		type: SchemaTypes.ObjectId,
		ref: PasswordModel
	}
}, DefaultSchemaOptions);

const database = connection.useDb(process.env.MONGODB_DATABASE + "-auth");
const PasswordResetModel = database.model("PasswordReset", PasswordResetSchema, "password_resets");

export default PasswordResetModel;