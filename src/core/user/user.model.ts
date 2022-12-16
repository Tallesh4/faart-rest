import {Schema, model } from "mongoose";
import { DefaultSchema, DefaultSchemaOptions } from "../../base/repositories/mongoose/default.schema";
import AddressModel from "../address/address.model";
import HierarchyModel from "../hierarchy/hierarchy.model";

const UserSchema = new Schema({
	...DefaultSchema,
	avatar: {
		type: String,
		default: null
	},
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique:true
	},
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		default: null
	},
	addressId: {
		type: Schema.Types.ObjectId,
		ref: AddressModel,
		default: null
	},
	hierarchyId: {
		type: Schema.Types.ObjectId,
		ref: HierarchyModel,
		required: true
	},
}, DefaultSchemaOptions);

UserSchema.virtual("hierarchy", {
	ref: HierarchyModel,
	localField: "hierarchyId",
	foreignField: "_id",
	justOne: true
});

UserSchema.virtual("address", {
	ref: AddressModel,
	localField: "addressId",
	foreignField: "_id",
	justOne: true
});


UserSchema.index({
	name: "text",
	username: "text",
	email: "text"
});


const UserModel = model("User", UserSchema);

UserModel.createIndexes();

export default UserModel;