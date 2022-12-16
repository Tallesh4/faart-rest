import { Request, Response } from "express";
import { id } from "../../base/base.repository";
import HomeService from "./home.service";

export const findById = async (req: Request, res: Response) => {
	const homeService = new HomeService();
	const { id } = req.params;
	const data = await homeService.findById(id);

	return res.send(data);
};

export const dailyIndicators = async (req: Request, res: Response) => {
	const homeService = new HomeService();
	const listUsersIds = <id[]> req.session?.allowedUsers;
	const data = await homeService.dailyIndicators(listUsersIds);
	return res.send(data);
};

export const monthlyIndicators = async (req: Request, res: Response) => {
	const homeService = new HomeService();
	const listUsersIds = <id[]> req.session?.allowedUsers;
	const data = await homeService.monthlyIndicators(listUsersIds);
	return res.send(data);
};