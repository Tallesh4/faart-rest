import BaseValidator from "../../../base/base.validator";
import { HierarchyInterface } from "../hierarchy.interface";

export default class DeleteHierarchyValidator extends BaseValidator<HierarchyInterface> {
	constructor(data: HierarchyInterface) {
		super(data, {
			id: ["required", "exists:hierarchy", "not_exists:user,hierarchyId", "not_exists:routine,hierarchyId"]
		});
	} 
}