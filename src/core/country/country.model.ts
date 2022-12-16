import {Schema, model } from "mongoose";
import { DefaultSchema, DefaultSchemaOptions } from "../../base/repositories/mongoose/default.schema";

const CountrySchema = new Schema({
	...DefaultSchema,
	name: String,
	code: String,
	phoneCode: String,
	currency: String,
	lat: {
		type: String,
		default: undefined
	},
	long: {
		type: String,
		default: undefined
	}
}, DefaultSchemaOptions);

const CountryModel = model("Country", CountrySchema);

export default CountryModel;