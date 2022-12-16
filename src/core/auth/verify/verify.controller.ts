import { Request, Response } from "express";
import VerifyService from "./verify.service";

export const index = async (req: Request, res: Response) => {
	const verifyService = new VerifyService();
	const { page, perPage, sortBy, sort, search, ...query } = req.query;

	if(page) {
		if(search) {
			query.$text = {$search: "\"" + search + "\""};
		}
		const data = await verifyService.paginate(
			+(page as string) || 1, 
			+(perPage as string) || 10, 
			sortBy as string, 
			sort as string,
			query
		);

		return res.send(data);
	} else {
		const data = await verifyService.getAll();
		return res.send(data);
	}
};

export const verifyCode = async (req: Request, res: Response) => {
	const verifyService = new VerifyService();

	const { id } = req.params;
	const { token, code } = req.body;

	const tokens = await verifyService.verifyCode(id, token, code);
	res.send(tokens);
};

