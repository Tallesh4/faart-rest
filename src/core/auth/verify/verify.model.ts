import {Schema, SchemaTypes, connection} from "mongoose";
import { DefaultSchema, DefaultSchemaOptions } from "../../../base/repositories/mongoose/default.schema";
import PasswordModel from "../password/password.model";
import crypto from "crypto";
import UserModel from "../../user/user.model";

const VerifySchema = new Schema({
	...DefaultSchema,
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
	remainingAttempts: {
		type: Schema.Types.Number,
		default: 3
	},
	token: {
		type: String,
		default: () => {
			return crypto.randomBytes(64).toString("hex");
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
		ref: PasswordModel,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: UserModel,
		default: null
	}
}, DefaultSchemaOptions);

VerifySchema.virtual("password", {
	ref: PasswordModel,
	localField: "passwordId",
	foreignField: "_id",
	justOne: true
});

const database = connection.useDb(process.env.MONGODB_DATABASE + "-auth");

const VerifyModel = database.model("Verify", VerifySchema);

export default VerifyModel;