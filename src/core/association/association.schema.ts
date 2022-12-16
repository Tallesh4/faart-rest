import { Schema } from "mongoose";
import {DefaultSchema, DefaultSchemaOptions} from "../../base/repositories/mongoose/default.schema";
import AddressModel from "../address/address.model";
import FederationModel from "../federation/federation.model";

const AssociationSchema = new Schema({
	...DefaultSchema,
	federationId:{
		type: Schema.Types.ObjectId,
		ref: FederationModel,
		default: null
	},
    entityName:{
		type: String,
		required: true,
	},
    fantasyName:{
		type: String,
		required: true,
	},
    legalForm:{
		type: String,
		required: true,
	},
	addressId: {
		type: Schema.Types.ObjectId,
		ref: AddressModel,
		default: null
	},
    phone:{
		type: String,
		required: true,
	},
    email:{
		type: String,
		required: true,
	},
    cnpj:{
		type: String,
		required: true,
	}

}, DefaultSchemaOptions);


AssociationSchema.virtual("federation", {
	ref: FederationModel,
	localField: "federationId",
	foreignField: "_id",
	justOne: true
});

AssociationSchema.virtual("addresses", {
	ref: AddressModel,
	localField: "addressId",
	foreignField: "_id",
	justOne: true
});

AssociationSchema.index({
	entityName: "text"
});

export default AssociationSchema;