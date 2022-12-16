/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";
import { id } from "../../base/base.repository";
import { QueriesResolve } from "../../utils/queries-resolve.utils";
import { UserInterface } from "../user/user.interface";
import HierarchyService from "../hierarchy/hierarchy.service";
import UserService from "../user/user.service";
import MeService from "./me.service";

export const me = async (req: Request, res: Response) => {
	const userService = new UserService();

	const { id } = res.locals["user"];

	const user = await userService.getMe(id);

	res.send(user);
};

export const permission = async (req: Request, res: Response) => {
	const hierarchyService = new HierarchyService();

	const { permissionTag } = req.params;

	const user = <UserInterface>res.locals["user"];
	const hierarchy = await hierarchyService.findByIdWithPermissions(user.hierarchyId);

	if (hierarchy) {
		if (hierarchy.level == -1 || hierarchy.permissions?.find(permission => permission.tag == permissionTag)) {
			return res.send(true);
		}
	}

	return res.send(false);
};

export const profile = async (req: Request, res: Response) => {
	const meService = new MeService();

	const user: UserInterface = res.locals.user;

	const data = await meService.getMyProfile(user.id);

	res.send(data);
};

export const avatar = async (req: Request, res: Response) => {
	const userService = new UserService();

	const avatarFile = req.file;

	const user: UserInterface = res.locals.user;

	const data = await userService.updateById(user.id, { avatarFile });

	return res.send(data);
};
