import BaseRepository from "../../base/base.repository";
import { HierarchyInterface } from "./hierarchy.interface";
import HierarchyModel from "./hierarchy.model";

export default class HierarchyRepository extends BaseRepository<HierarchyInterface> {
	constructor() {
		super(HierarchyModel);

		this.relations["permissions"] = {
			lookup: {
				from: "permissions",
				localField: "permissionIds",
				foreignField: "_id",
				as: "permissions"
			}
		};

		this.relations["users"] = {
			lookup: {
				from: "users",
				localField: "_id",
				foreignField: "hierarchyId",
				as: "users"
			}
		};
	}
}