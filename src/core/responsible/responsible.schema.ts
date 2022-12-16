import { Schema } from "mongoose";
import { DefaultSchema, DefaultSchemaOptions } from "../../base/repositories/mongoose/default.schema";
import AddressModel from "../address/address.model";
import AssociationModel from "../association/association.model";
import FederationModel from "../federation/federation.model";

const ResponsibleSchema = new Schema({
	...DefaultSchema,
	associationId: {
		type: Schema.Types.ObjectId,
		ref: AssociationModel,
		default: null
	},
	name: {
		type: String,
		required: true,
	},
	job: {
		type: String,
		default: null
	},
	addressId: {
		type: Schema.Types.ObjectId,
		ref: AddressModel,
		default: null
	},
	cpf: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		default: null
	},
	phone: {
		type: String,
		default: null
	},
	dateFiliation: {
		type: Date,
		default: null
	},
	rg: {
		type: String,
		required: true,
	},
	bodyExpeditor: {
		type: String,
		required: true,
	},
	maritalStatus: {
		type: String,
		default: null
	},
	naturalness: {
		type: String,
		default: null
	},
	nationality: {
		type: String,
		default: null
	},
	nArtisanWallet: {
		type: String,
		required: true,
	},
	dueDateArtisanWallet:  {
		type: Date,
		default: null
	},
}, DefaultSchemaOptions);




ResponsibleSchema.virtual("associations", {
	ref: AssociationModel,
	localField: "associationId",
	foreignField: "_id",
	justOne: true
});

ResponsibleSchema.virtual("addresses", {
	ref: AddressModel,
	localField: "addressId",
	foreignField: "_id",
	justOne: true
});


ResponsibleSchema.index({
	entityName: "text"
});

export default ResponsibleSchema;