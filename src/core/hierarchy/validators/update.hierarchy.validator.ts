import BaseValidator from "../../../base/base.validator";
import { HierarchyInterface } from "../hierarchy.interface";

export default class UpdateHierarchyValidator extends BaseValidator<HierarchyInterface> {
	constructor(data: HierarchyInterface) {
		super(data, {
			id: ["required", "exists:hierarchy"],
			tag: ["string", "unique:hierarchy"],
			name: ["string"],
			level: ["integer", "min:0"],
			permissions: ["array"]
		});
	}
}