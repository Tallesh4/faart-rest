import { Request, Response } from "express";
import { ErrorResponse } from "../../base/utils/error.response.handler";
import ExcelManager from "../../utils/ExcelManager";
import { ProductsInterface } from "./products.interface";
import ProductsRepository from "./products.repository";
import ProductsService from "./products.service";

export const index = async (req: Request, res: Response) => {
	const productService = new ProductsService();
	const { page, perPage, sortBy, sort, search, ...query } = req.query;

	const queries: Record<string, unknown> = {
		enabled: (<string>query.enabled) == "false" ? false : true,
	};

	if (page) {
		if (search) {
			queries.$text = { $search: "\"" + search + "\"" };
		}

		const paginate = await productService.paginate(
			+(page as string) || 1,
			+(perPage as string) || 10,
			sortBy as string,
			sort as string,
			queries
		);

		return res.send(paginate);

	} else {
		const data = await productService.search(query);

		return res.send(data);
	}
};


export const create = async (req: Request, res: Response) => {
	const productsService = new ProductsService();

	const props = req.body;
	const data = await productsService.create(props);
	
	return res.send(data);
};

export const findById = async (req: Request, res: Response) => {
	const productsService = new ProductsService();

	const { id } = req.params;
	const data = await productsService.findById(id);

	return res.send(data);
};

export const updateById = async (req: Request, res: Response) => {
	const productsService = new ProductsService();

	const props = req.body;
	const { id } = req.params;
	const data = await productsService.updateById(id, props);

	return res.send(data);
};

export const deleteById = async (req: Request, res: Response) => {
	const productsService = new ProductsService();
	
	const { id } = req.params;
	console.log(id)
	const data = await productsService.deleteById(id);

	return res.send(data);
};

export const exportExcel = async (req: Request, res: Response) => {
	const productRepository = new ProductsRepository();

	const { search, ...query } = req.query;
	if (search) {
		query.$text = { $search: "\"" + search + "\"" };
	}

	const productSearch = <ProductsInterface[]>await productRepository.find(query)
		.with("brand")
		.with("category")
		.select({
			name: true,
			productSku: true,
			description: true,
			type: true,
			unity: true,
			brandName: true,
			categoryName:  true,
		})
		.exec();


	return await ExcelManager.getExcelTemplate().createNewExcelFile({
		sheet_name: "Produtos",
		headers: [
			{ header: "Marca", key: "brandName", width: 35 },
			{ header: "Categoria", key: "categoryName", width: 35 },
			{ header: "Codigo SKU", key: "productSku", width: 35 },
			{ header: "Produto", key: "name", width: 35 },
			{ header: "Descricao", key: "description", width: 80 },
			{ header: "Tipo", key: "type", width: 35 },
			{ header: "Unidade de medida", key: "unity", width: 35 },
		],
		data: productSearch
	}, res);
};

export const archiveManyById = async (req: Request, res: Response) => {
	const productsService = new ProductsService();

	const { ids, enabled } = req.body;

	const data = await productsService.archiveManyById(ids, enabled);

	return res.send(data);
};

export const importImagesApp = async (req: Request, res: Response) => {
	const productsService = new ProductsService();

	const files = req.files;

	if (files) {
		const data = await productsService.importImagesApp(Array.isArray(files) ? files : files.images);

		return res.send(data);
	} else {
		throw new ErrorResponse("no images", 400);
	}
};

export const updateImageById = async (req: Request, res: Response) => {
	const productsService = new ProductsService();
	const { id } = req.params;

	const file = req.file;

	setTimeout(async () => {
		const data = await productsService.updateImageById(id, { file });
		return res.send(data);
	}, 2000)
};