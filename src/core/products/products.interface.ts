import { BaseInterface } from "../../base/base.interface";

export interface ProductsInterface extends BaseInterface {
    name: string,
    type: string,
    unity: string,
    productSku: string,
    linkUrl: string,
    linkImage: string,
    images?: {url: string, type: "default" | "front" | "back" | "left" | "right"}[],
    description?: string,
    brandName?: string,
    categoryName?: string,
}
