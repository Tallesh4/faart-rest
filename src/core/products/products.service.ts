import { ProductsInterface } from "./products.interface";
import BaseService from "../../base/base.service";
import ProductsRepository from "./products.repository";
import CreateProductsValidator from "./validators/create.products.validator";
import DeleteProductsValidator from "./validators/delete.products.validator";
import UpdateProductsValidator from "./validators/update.products.validator";
import ImageService from "../image/image.service";
import { id } from "../../base/base.repository";

export default class ProductsService extends BaseService<ProductsInterface> {
	constructor() {
		super(ProductsRepository, CreateProductsValidator, UpdateProductsValidator, DeleteProductsValidator);
	}

	async importImagesApp(files: Express.Multer.File[]) {
		const types = ["default", "front", "back", "left", "right"];
		const imageService = new ImageService();
		const result: {
			imported: { productId: string, imageUrls: string[] }[],
			notImported: { name: string, reason: string }[],
			fileNames: string[]
		} = {
			imported: [],
			notImported: [],
			fileNames: [],
		};

		const updates: { id: id | undefined, images: { file: Express.Multer.File, type: string }[] }[] = [];

		for (const file of files) {
			result.fileNames.push(file.originalname);
			const filename = file.originalname.split(".")[0];
			const split = filename.split("_");
			const externalId = split[0];

			let type = "default";

			if (split.length > 1) {
				type = types[+split[1]];
			}

			const product = <ProductsInterface>await this.repository.first({ externalId }).exec();

			if (product) {
				console.log(updates);
				const update = updates.find(update => update.id?.toString() == product.id?.toString());

				console.log(update);
				if (update) {
					update.images.push({ file, type });
					console.log("here");
				} else {
					const update = {
						id: product.id,
						images: [{ file, type }]
					};

					updates.push(update);
				}
			} else {
				result.notImported.push({ name: file.originalname, reason: "product not found" });
			}
		}

		for (const update of updates) {
			const images: { url: string, type: string }[] = [];
			const imageUrls: string[] = [];

			for (const image of update.images) {
				const url = await imageService.upload(image.file, image.file.originalname.split(".")[0], "products");
				images.push({ url, type: image.type });
				imageUrls.push(url);
			}

			await this.repository.updateById(update.id, { images });

			result.imported.push({
				productId: <string>update.id?.toString(),
				imageUrls
			});
		}

		return result;
	}


	async updateImageById(id: string | id | undefined, props: any): Promise<any> {
		const imageService = new ImageService();
		const products = <any> await this.repository.findById(id).exec();

		if(products){
			if(props.file){
				const url = await imageService.upload(props.file, props.file.originalname.split(".")[0], "products");

				let data = {
					url:url,
					type:'default'
				}

				let images:any = []
				if(products.images !== null){
					for(let image of products.images){
						images.push(image)
					}
				}

				images.push(data)

				let propsItem = {
					brandId: products.brandId.toString(),
					categoryId: products.categoryId.toString(),
					images: images
				}

				console.log(propsItem)
				return await super.updateById(id, propsItem);

			}
		}
	}
}