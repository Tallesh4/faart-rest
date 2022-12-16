import BaseValidator from "../../../base/base.validator";
import { ProductsInterface } from "../products.interface";

export default class DeleteProductsValidator extends BaseValidator<ProductsInterface> {
	constructor(data: any) {
		super(data, {
		});
	}
}