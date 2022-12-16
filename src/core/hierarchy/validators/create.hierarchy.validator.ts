import BaseValidator from "../../../base/base.validator";
import { HierarchyInterface } from "../hierarchy.interface";

export default class CreateHierarchyValidator extends BaseValidator<HierarchyInterface> {
	constructor(data: HierarchyInterface) {
		super(data, {
			tag: ["required", "string", "unique:hierarchy"],
			name: ["required", "string"],
			level: ["required", "integer", "min:0"],
			permissions: ["array", "exists:permission"]
		});
	}
}