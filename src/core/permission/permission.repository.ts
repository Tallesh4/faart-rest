import BaseRepository from "../../base/base.repository";
import { PermissionInterface } from "./permission.interface";
import PermissionModel from "./permission.model";

export default class PermissionRepository extends BaseRepository<PermissionInterface> {
	constructor() {
		super(PermissionModel);
	}
}