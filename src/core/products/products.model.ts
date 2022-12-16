import { model } from "mongoose";
import ProductsSchema from "./products.schema";

const ProductsModel = model("Products", ProductsSchema, "products");

export default ProductsModel;