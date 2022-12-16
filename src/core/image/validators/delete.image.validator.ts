import BaseValidator from "../../../base/base.validator";
import { ImageInterface } from "../image.interface";

export default class DeleteImageValidator extends BaseValidator<ImageInterface> {
	constructor(data: any) {
		super(data, {
			id: ["required", "exists:image"],
		});
	}
}