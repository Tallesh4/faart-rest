import BaseService from "../../base/base.service";
import { PermissionInterface } from "./permission.interface";
import PermissionRepository from "./permission.repository";
import CreatePermissionValidator from "./validators/create.permission.validator";
import DeletePermissionValidator from "./validators/delete.permission.validator";
import UpdatePermissionValidator from "./validators/update.permission.validator";

export default class PermissionService extends BaseService<PermissionInterface> {
	constructor() {
		super(PermissionRepository, CreatePermissionValidator, UpdatePermissionValidator, DeletePermissionValidator);
	}
}