import BaseValidator from "../../../base/base.validator";
import { ImageInterface } from "../image.interface";

export default class UpdateImageValidator extends BaseValidator<ImageInterface> {
	constructor(data: any) {
		super(data, {
			name: ["unique:image"],
		});
	}
}