import BaseRepository from "../../base/base.repository";
import { ImageInterface } from "./image.interface";
import ImageModel from "./image.model";

export default class ImageRepository extends BaseRepository<ImageInterface> {
	constructor() {
		super(ImageModel);
	}
}