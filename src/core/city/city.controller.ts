import { Request, Response } from "express";
import { parseId } from "../../base/base.repository";
import CityService from "./city.service";

export const index = async (req: Request, res: Response) => {
	const cityService = new CityService();
	
	const { page, perPage, sortBy, sort, search, ...queries } = req.query;
	const query: Record<string, any> = {
		stateId: parseId(<string>queries.stateId)
	};
	
	if(search) {
		query.$text = {$search: "\"" + search + "\""}; //FIXME: Editar para pesquisa não depender do mongo
	}

	if(page) {
		const paginate = await cityService.paginate(
			+(page as string) || 1,
			+(perPage as string) || 10,
				sortBy as string,
				sort as string,
				query
		);
		res.send(paginate);
	} else {
		const data = await cityService.search(query);
		res.send(data);
	}
};