import BaseValidator from "../../../base/base.validator";
import { ProductsInterface } from "../products.interface";

export default class CreateProductsValidator extends BaseValidator<ProductsInterface> {
	constructor(data: any) {
		const productFolder = "products";

		super(data, {
			name: ["required", `unique:${productFolder}`],
			productSku: ["required", "string", `unique:${productFolder}`]
		});
	}
}