import { Schema } from "mongoose";
import {DefaultSchema, DefaultSchemaOptions} from "../../base/repositories/mongoose/default.schema";


const ImageProductSchema = new Schema({
	url: String,
	type: String
}, {_id: false});

const ProductsSchema = new Schema({
	...DefaultSchema,
	name: {
		type: String,
		required: true,
	},
	linkUrl: {
		type: String,
		default: null
	},
    linkImage: {
		type: String,
		default: null
	},
	images: {
		type: [ImageProductSchema],
		default: []
	},
	productSku: {
		type: String,
	},
	type: {
		type: String,
		default: null
	},
	unity: {
		type: String,
		default: null
	},
	description: {
		type: String,
		default: null
	},
	brandName: {
		type: String,
		default: null
	},
	categoryName: {
		type: String,
		default: null
	},
}, DefaultSchemaOptions);

ProductsSchema.index({
	name: "text"
});

export default ProductsSchema;