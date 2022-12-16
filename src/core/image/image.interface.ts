import { BaseInterface } from "../../base/base.interface";

export interface ImageInterface extends BaseInterface {
    file: Express.Multer.File,
    bucket?: string
}