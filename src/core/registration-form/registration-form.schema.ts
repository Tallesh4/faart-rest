import { Schema } from "mongoose";
import {DefaultSchema, DefaultSchemaOptions} from "../../base/repositories/mongoose/default.schema";
import AddressModel from "../address/address.model";

const RegistrationFormSchema = new Schema({
	...DefaultSchema,
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
	addressAssociationId: {
		type: Schema.Types.ObjectId,
		ref: AddressModel,
		default: null
	},
    phoneAssociation:{
		type: String,
		required: true,
	},
    emailAssociation:{
		type: String,
		required: true,
	},
    cnpjAssociation:{
		type: String,
		required: true,
	},


	name: {
		type: String,
		required: true,
	},
	job: {
		type: String,
		default: null
	},
	addressResponsibleId: {
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


RegistrationFormSchema.virtual("addresses", {
	ref: AddressModel,
	localField: "addressAssociationId",
	foreignField: "_id",
	justOne: true
});
 
RegistrationFormSchema.virtual("addresses", {
	ref: AddressModel,
	localField: "addressResponsibleId",
	foreignField: "_id",
	justOne: true
});


RegistrationFormSchema.index({
	name: "text"
});

export default RegistrationFormSchema;