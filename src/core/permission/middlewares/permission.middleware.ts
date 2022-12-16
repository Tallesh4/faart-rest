import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../../base/utils/error.response.handler";
import HierarchyService from "../../hierarchy/hierarchy.service";
import { UserInterface } from "../../user/user.interface";

export const PermissionByTagMiddleware = (tag: string) => (
	async(req: Request, res: Response, next: NextFunction) => {
		const hierarchyService = new HierarchyService();
		const permissionDeniedError = new ErrorResponse("Permission Denied", 403);

		const user = <UserInterface> res.locals["user"];
		const hierarchy = await hierarchyService.findByIdWithPermissions(user.hierarchyId);

		if(hierarchy) {
			if(hierarchy.level == -1 || hierarchy.permissions?.find(permission => permission.tag == tag)) {
				next();
			} else {
				throw permissionDeniedError;
			}
		} else {
			throw permissionDeniedError;
		}
	}
);