import BaseValidator from "../../../base/base.validator";
import { ProductsInterface } from "../products.interface";

export default class UpdateProductsValidator extends BaseValidator<ProductsInterface> {
	constructor(data: any) {
		super(data, {
			name: ["unique:productsValidator"],
		});
	}
}