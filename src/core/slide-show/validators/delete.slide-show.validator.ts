import BaseValidator from "../../../base/base.validator";
import { SlideShowInterface } from "../slide-show.interface";

export default class DeleteSlideShowValidator extends BaseValidator<SlideShowInterface> {
	constructor(data: any) {
		super(data, {
			id: ["required", "exists:slideShowValidator"],
		});
	}
}