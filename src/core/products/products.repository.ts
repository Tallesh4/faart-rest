import { ProductsInterface } from "./products.interface";
import BaseRepository from "../../base/base.repository";
import ProductsModel from "./products.model";

export default class ProductsRepository extends BaseRepository<ProductsInterface> {
	constructor() {
		super(ProductsModel);
	}
}