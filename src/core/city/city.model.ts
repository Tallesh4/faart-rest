import {Schema, SchemaTypes, model } from "mongoose";
import { DefaultSchema, DefaultSchemaOptions } from "../../base/repositories/mongoose/default.schema";
import StateModel from "../state/state.model";

const CitySchema = new Schema({
	...DefaultSchema,
	name: String,
	code: String,
	phoneCode: String,
	lat: {
		type: String,
		default: undefined
	},
	long: {
		type: String,
		default: undefined
	},
	stateId: {
		type: SchemaTypes.ObjectId,
		ref: StateModel
	},
}, DefaultSchemaOptions);

const CityModel = model("City", CitySchema);

export default CityModel;