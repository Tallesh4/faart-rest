import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../../base/utils/error.response.handler";
import { UserInterface } from "../../user/user.interface";
import { HierarchyInterface } from "../hierarchy.interface";
import HierarchyService from "../hierarchy.service";

export const HierarchyByLevelMiddleware = (level: number) => (
	async (req: Request, res: Response, next: NextFunction) => {
		const hierarchyService = new HierarchyService();

		const user = <UserInterface> res.locals["user"];
		const hierarchy = <HierarchyInterface> await hierarchyService.findById(user.hierarchyId);
	
		if(hierarchy && hierarchy.level == level) {
			next();
		} else {
			const error = new ErrorResponse("Permission Denied", 403);
			throw error;
		}
	}
);
export const HierarchyByTagMiddleware = (tag: string) => (
	async (req: Request, res: Response, next: NextFunction) => {
		const hierarchyService = new HierarchyService();

		const user = <UserInterface> res.locals["user"];
		const hierarchy = <HierarchyInterface> await hierarchyService.findById(user.hierarchyId);
	
		if(hierarchy && hierarchy.tag == tag) {
			next();
		} else {
			const error = new ErrorResponse("Permission Denied", 403);
			throw error;
		}
	}
);