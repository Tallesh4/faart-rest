import {Schema, SchemaTypes, model } from "mongoose";
import { DefaultSchema, DefaultSchemaOptions } from "../../base/repositories/mongoose/default.schema";
import CityModel from "../city/city.model";

const AddressSchema = new Schema({
	...DefaultSchema,
	number: String,
	street: String,
	zipCode: String,
	complement: {
		type: String,
		default: null
	},
	lat: {
		type: Number,
		default: null
	},
	lng: {
		type: Number,
		default: null
	},
	cityId: {
		type: SchemaTypes.ObjectId,
		ref: CityModel
	},
}, DefaultSchemaOptions);

const AddressModel = model("Address", AddressSchema);

export default AddressModel;