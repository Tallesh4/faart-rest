import {Schema, SchemaTypes, model } from "mongoose";
import { DefaultSchema, DefaultSchemaOptions } from "../../base/repositories/mongoose/default.schema";
import CountryModel from "../country/country.model";

const StateSchema = new Schema({
	...DefaultSchema,
	name: String,
	code: String,
	phoneCode: {
		type: Number,
		default: undefined
	},
	lat: {
		type: String,
		default: undefined
	},
	long: {
		type: String,
		default: undefined
	},
	countryId: {
		type: SchemaTypes.ObjectId,
		ref: CountryModel
	},
}, DefaultSchemaOptions);

const StateModel = model("State", StateSchema);

export default StateModel;