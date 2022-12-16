import { Request, Response } from "express";
import PermissionService from "./permission.service";

export const index = async (req: Request, res: Response) => {
	const permissionService = new PermissionService();
	
	const { page, perPage, sortBy, sort, search, ...queries } = req.query;
	const query: Record<string, any> = {
		name: <string> (queries.name || undefined),
		type: <string> (queries.type || undefined),
		status: +<string>queries.status || undefined,
		enabled: (<string>queries.enabled) == "false" ? false : true,
	};
	
	if(search) {
		query.$text = {$search: "\"" + search + "\""}; //FIXME: Editar para pesquisa não depender do mongo
	}

	if(page) {
		const paginate = await permissionService.paginate(
			+(page as string) || 1,
			+(perPage as string) || 10,
				sortBy as string,
				sort as string,
				query
		);
		return res.send(paginate);
	} else {
		const data = await permissionService.search(query);
		return res.send(data);
	}
};

export const create = async (req: Request, res: Response) => {
	const permissionService = new PermissionService();

	const props = req.body;
	const data = await permissionService.create(props);
		
	return res.send(data);
};

export const findById = async (req: Request, res: Response) => {
	const permissionService = new PermissionService();
	
	const { id } = req.params;
	const data = await permissionService.findById(id);

	return res.send(data);
};

export const updateById = async (req: Request, res: Response) => {
	const permissionService = new PermissionService();
	
	const props = req.body;
	const { id } = req.params;
	const data = await permissionService.updateById(id, props);

	return res.send(data);
};

export const deleteById = async (req: Request, res: Response) => {
	const permissionService = new PermissionService();
	
	const { id } = req.params;
	const data = await permissionService.deleteById(id);

	return res.send(data);
};

export const archiveManyById = async (req: Request, res: Response) => {
	const permissionService = new PermissionService();

	const { ids, enabled } = req.body;

	const data = await permissionService.archiveManyById(ids, enabled);

	return res.send(data);
};