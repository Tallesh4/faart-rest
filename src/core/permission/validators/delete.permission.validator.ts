import BaseValidator from "../../../base/base.validator";
import { PermissionInterface } from "../permission.interface";

export default class DeletePermissionValidator extends BaseValidator<PermissionInterface> {
	constructor(data: PermissionInterface) {
		super(data, {
			id: ["required", "exists:permission", "not_exists:hierarchy,permissionIds"]
		});
	} 
}