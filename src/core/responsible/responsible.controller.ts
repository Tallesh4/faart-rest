import { Request, Response } from "express";
import ResponsibleService from "./responsible.service";

export const index = async (req: Request, res: Response) => {
	const responsibleService = new ResponsibleService();
	const { page, perPage, sortBy, sort, search, ...query } = req.query;

	if(page) {
		if(search) {
			query.$text = {$search: "\"" + search + "\""};
		}

		const data = await responsibleService.paginate(
			+(page as string) || 1, 
			+(perPage as string) || 10, 
			sortBy as string, 
			sort as string,
			query
		);

		console.log(data)
		return res.send(data);
	}else {
		const data = await responsibleService.getAll();
		console.log(data)

		return res.send(data);
	}

};

export const create = async (req: Request, res: Response) => {
	const responsibleService = new ResponsibleService();

	const props = req.body;
	const data = await responsibleService.create(props);
	
	return res.send(data);
};

export const findById = async (req: Request, res: Response) => {
	const responsibleService = new ResponsibleService();

	const { id } = req.params;
	const data = await responsibleService.findById(id);

	return res.send(data);
};

export const updateById = async (req: Request, res: Response) => {
	const responsibleService = new ResponsibleService();

	const props = req.body;
	const { id } = req.params;
	const data = await responsibleService.updateById(id, props);

	return res.send(data);
};

export const deleteById = async (req: Request, res: Response) => {
	const responsibleService = new ResponsibleService();
	
	const { id } = req.params;
	const data = await responsibleService.deleteById(id);

	return res.send(data);
};
