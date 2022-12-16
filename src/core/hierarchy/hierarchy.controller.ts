import { Request, Response } from "express";
import HierarchyService from "./hierarchy.service";

export const index = async (req: Request, res: Response) => {
	const hierarchyService = new HierarchyService();

	const { page, perPage, sortBy, sort, search, ...query } = req.query;
		
	if(search) {
		query.$text = {$search: "\"" + search + "\""}; //FIXME: Editar para pesquisa não depender do mongo
	}

	if(page) {
		const paginate = await hierarchyService.paginate(
			+(page as string) || 1, 
			+(perPage as string) || 10, 
				sortBy as string, 
				sort as string,
				query
		);
		res.send(paginate);
	} else {
		const data = await hierarchyService.search(query);
		res.send(data);
	}
};

export const create = async (req: Request, res: Response) => {
	const hierarchyService = new HierarchyService();
	const props = req.body;
	const data = await hierarchyService.create(props);
		
	res.send(data);
};

export const findById = async (req: Request, res: Response) => {
	const hierarchyService = new HierarchyService();
	
	const { id } = req.params;
	const data = await hierarchyService.findById(id);

	res.send(data);
};

export const updateById = async (req: Request, res: Response) => {
	const hierarchyService = new HierarchyService();
	
	const props = req.body;
	const { id } = req.params;
	const data = await hierarchyService.updateById(id, props);

	res.send(data);
};

export const deleteById = async (req: Request, res: Response) => {
	const hierarchyService = new HierarchyService();
	
	const { id } = req.params;
	const data = await hierarchyService.deleteById(id);

	res.send(data);
};