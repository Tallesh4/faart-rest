import { Request, Response } from "express";
import UserService from "./user.service";

export const index = async (req: Request, res: Response) => {
	const userService = new UserService();

	const { page, perPage, sortBy, sort, search, ...query } = req.query;

	const queries: Record<string, unknown> = {
		enabled: (<string>query.enabled) == "false" ? false : true,
	};

	if (page) {
		if (search) {
			queries.$text = { $search: "\"" + search + "\"" };
		}

		queries._id = req.session?.allowedUsers;

		const paginate = await userService.paginate(
			+(page as string) || 1,
			+(perPage as string) || 10,
			sortBy as string,
			sort as string,
			queries
		);
		res.send(paginate);
	} else {
		const data = await userService.search(query);
		res.send(data);
	}
};


export const create = async (req: Request, res: Response) => {
	const userService = new UserService();

	const props = req.body;
	const data = await userService.create(props);

	res.send(data);
};

export const findById = async (req: Request, res: Response) => {
	const userService = new UserService();

	const { id } = req.params;
	const data = await userService.findById(id);

	res.send(data);
};

export const updateById = async (req: Request, res: Response) => {
	const userService = new UserService();
	const props = req.body;
	const { id } = req.params;
	const data = await userService.updateById(id, props);

	res.send(data);
};

export const avatar = async (req: Request, res: Response) => {
	const userService = new UserService();
	const avatarFile = req.file;
	const { id } = req.params;
	const data = await userService.updateById(id, { avatarFile });

	return res.send(data);
};


export const blockById = async (req: Request, res: Response) => {
	const userService = new UserService();

	const props = req.body;
	const { id } = req.params;
	const data = await userService.blockById(id, props);

	res.send(data);
};

export const deleteById = async (req: Request, res: Response) => {
	const userService = new UserService();

	const { id } = req.params;
	const data = await userService.deleteById(id);

	res.send(data);
};
