import { Request, Response } from "express";
import FederationService from "./federation.service";

export const index = async (req: Request, res: Response) => {
	const federationService = new FederationService();
	const { page, perPage, sortBy, sort, search, ...query } = req.query;

	if(page) {
		if(search) {
			query.$text = {$search: "\"" + search + "\""};
		}

		const data = await federationService.paginate(
			+(page as string) || 1, 
			+(perPage as string) || 10, 
			sortBy as string, 
			sort as string,
			query
		);

		return res.send(data);
	}

	if(query && Object.keys(query).length){
		const data = await federationService.find(query);
		return res.send(data);
	}

	return res.send([]);
};

export const create = async (req: Request, res: Response) => {
	const federationService = new FederationService();

	const props = req.body;
	const data = await federationService.create(props);
	
	return res.send(data);
};

export const findById = async (req: Request, res: Response) => {
	const federationService = new FederationService();

	const { id } = req.params;
	const data = await federationService.findById(id);

	return res.send(data);
};

export const updateById = async (req: Request, res: Response) => {
	const federationService = new FederationService();

	const props = req.body;
	const { id } = req.params;
	const data = await federationService.updateById(id, props);

	return res.send(data);
};

export const deleteById = async (req: Request, res: Response) => {
	const federationService = new FederationService();
	
	const { id } = req.params;
	const data = await federationService.deleteById(id);

	return res.send(data);
};
