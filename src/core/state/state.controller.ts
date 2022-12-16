import { Request, Response } from "express";
import StateService from "./state.service";

export const index = async (req: Request, res: Response) => {
	const stateService = new StateService();
	
	const { page, perPage, sortBy, sort, search, ...queries } = req.query;
	const query: Record<string, any> = {
	};
	
	if(search) {
		query.$text = {$search: "\"" + search + "\""}; //FIXME: Editar para pesquisa não depender do mongo
	}

	if(page) {
		const paginate = await stateService.paginate(
			+(page as string) || 1,
			+(perPage as string) || 10,
				sortBy as string,
				sort as string,
				query
		);
		res.send(paginate);
	} else {
		const data = await stateService.search(query);
		res.send(data);
	}
};