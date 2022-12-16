import { Request, Response } from "express";
import RegistrationFormService from "./registration-form.service";

export const index = async (req: Request, res: Response) => {
	const registrationFormService = new RegistrationFormService();
	const { page, perPage, sortBy, sort, search, ...query } = req.query;

	if(page) {
		if(search) {
			query.$text = {$search: "\"" + search + "\""};
		}

		const data = await registrationFormService.paginate(
			+(page as string) || 1, 
			+(perPage as string) || 10, 
			sortBy as string, 
			sort as string,
			query
		);

		return res.send(data);
	}

	if(query && Object.keys(query).length){
		const data = await registrationFormService.find(query);
		return res.send(data);
	}

	return res.send([]);
};

export const create = async (req: Request, res: Response) => {
	const registrationFormService = new RegistrationFormService();

	const props = req.body;
	console.log('cheguei', props)
	const data = await registrationFormService.create(props);
	
	return res.send(data);
};

export const findById = async (req: Request, res: Response) => {
	const registrationFormService = new RegistrationFormService();

	const { id } = req.params;
	const data = await registrationFormService.findById(id);

	return res.send(data);
};

export const updateById = async (req: Request, res: Response) => {
	const registrationFormService = new RegistrationFormService();

	const props = req.body;
	const { id } = req.params;
	const data = await registrationFormService.updateById(id, props);

	return res.send(data);
};

export const deleteById = async (req: Request, res: Response) => {
	const registrationFormService = new RegistrationFormService();
	
	const { id } = req.params;
	const data = await registrationFormService.deleteById(id);

	return res.send(data);
};
