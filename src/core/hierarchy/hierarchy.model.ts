import { DefaultSchema, DefaultSchemaOptions } from "../../base/repositories/mongoose/default.schema";
import { Schema, SchemaTypes, model } from "mongoose";
import PermissionModel from "../permission/permission.model";
import { HierarchyInterface } from "./hierarchy.interface";

const HierarchySchema = new Schema({
	...DefaultSchema,
	tag: String,
	name: String,
	level: Number,
	permissionIds: [{
		type: SchemaTypes.ObjectId,
		ref: PermissionModel
	}],
}, DefaultSchemaOptions);

HierarchySchema.virtual("permissions", {
	ref: PermissionModel,
	localField: "permissionIds",
	foreignField: "_id"
});

HierarchySchema.index({
	tag: "text",
	name: "text",
	level: "text"
});

const HierarchyModel = model("Hierarchy", HierarchySchema);

HierarchyModel.createIndexes();

export default HierarchyModel;