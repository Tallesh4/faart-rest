import BaseValidator from "../../../base/base.validator";
import { PermissionInterface } from "../permission.interface";

export default class UpdatePermissionValidator extends BaseValidator<PermissionInterface> {
	constructor(data: PermissionInterface) {
		super(data, {
			id: ["required", "exists:permission"],
			tag: ["string", "unique:permission"],
			collectionName: ["string"],
			type: ["string"],
			name: ["string"],
			description: ["string"]
		});
	} 
}