import BaseValidator from "../../../base/base.validator";
import { PermissionInterface } from "../permission.interface";

export default class CreatePermissionValidator extends BaseValidator<PermissionInterface> {
	constructor(data: PermissionInterface) {
		super(data, {
			tag: ["required", "string", "unique:permission"],
			collectionName: ["string"],
			type: ["required", "string"],
			name: ["required", "string"],
			description: ["string"]
		});
	} 
}