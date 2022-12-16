import { Request, Response } from "express";
import AssociationService from "./association.service";

export const index = async (req: Request, res: Response) => {
	const associationService = new AssociationService();
	const { page, perPage, sortBy, sort, search, ...query } = req.query;

	if(page) {
		if(search) {
			query.$text = {$search: "\"" + search + "\""};
		}

		const data = await associationService.paginate(
			+(page as string) || 1, 
			+(perPage as string) || 10, 
			sortBy as string, 
			sort as string,
			query
		);

		return res.send(data);
	}	else {
		const data = await associationService.getAll();
		console.log(data)

		return res.send(data);
	}
};

export const create = async (req: Request, res: Response) => {
	const associationService = new AssociationService();

	const props = req.body;
	const data = await associationService.create(props);
	
	return res.send(data);
};

export const findById = async (req: Request, res: Response) => {
	const associationService = new AssociationService();

	const { id } = req.params;
	const data = await associationService.findById(id);

	return res.send(data);
};

export const updateById = async (req: Request, res: Response) => {
	const associationService = new AssociationService();

	const props = req.body;
	const { id } = req.params;
	const data = await associationService.updateById(id, props);

	return res.send(data);
};

export const deleteById = async (req: Request, res: Response) => {
	const associationService = new AssociationService();
	
	const { id } = req.params;
	const data = await associationService.deleteById(id);

	return res.send(data);
};
