import { Request, Response } from "express";
import SlideShowService from "./slide-show.service";

export const index = async (req: Request, res: Response) => {
	const slideShowService = new SlideShowService();
	const { page, perPage, sortBy, sort, search, ...query } = req.query;

	if(page) {
		if(search) {
			query.$text = {$search: "\"" + search + "\""};
		}

		const data = await slideShowService.paginate(
			+(page as string) || 1, 
			+(perPage as string) || 10, 
			sortBy as string, 
			sort as string,
			query
		);

		return res.send(data);
	}

	if(query && Object.keys(query).length){
		const data = await slideShowService.find(query);
		return res.send(data);
	}

	return res.send([]);
};

export const create = async (req: Request, res: Response) => {
	const slideShowService = new SlideShowService();

	const props = req.body;
	const data = await slideShowService.create(props);
	
	return res.send(data);
};

export const findById = async (req: Request, res: Response) => {
	const slideShowService = new SlideShowService();

	const { id } = req.params;
	const data = await slideShowService.findById(id);

	return res.send(data);
};

export const updateById = async (req: Request, res: Response) => {
	const slideShowService = new SlideShowService();

	const props = req.body;
	const { id } = req.params;
	const data = await slideShowService.updateById(id, props);

	return res.send(data);
};

export const deleteById = async (req: Request, res: Response) => {
	const slideShowService = new SlideShowService();
	
	const { id } = req.params;
	const data = await slideShowService.deleteById(id);

	return res.send(data);
};
