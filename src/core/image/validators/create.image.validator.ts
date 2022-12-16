import BaseValidator from "../../../base/base.validator";
import { ImageInterface } from "../image.interface";

export default class CreateImageValidator extends BaseValidator<ImageInterface> {
	constructor(data: any) {
		super(data, {
			name: ["required", "unique:image"],
		});
	}
}